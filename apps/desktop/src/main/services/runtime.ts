import { execFile, spawn, type ChildProcess } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { setTimeout as wait } from "node:timers/promises";
import { z } from "zod";
import type { ModelPullStatus, RuntimeStatus } from "@apt/types";

export const REQUIRED_MODEL = "gpt-oss:20b";
const BASE_URL = "http://127.0.0.1:11434";
const shutdownController = new AbortController();
const tagsSchema = z.object({ models: z.array(z.object({ name: z.string() })) });
const progressSchema = z.object({ status: z.string().optional(), error: z.string().optional(), digest: z.string().optional(), completed: z.number().nonnegative().optional(), total: z.number().nonnegative().optional() }).refine(value => value.status !== undefined || value.error !== undefined);
let selectedExecutable: string | undefined;
let ownedProcess: ChildProcess | undefined;
let starting: Promise<RuntimeStatus> | undefined;
let pullController: AbortController | undefined;
let shuttingDown = false;
let pullStatus: ModelPullStatus = { state: "idle", message: "Download not started" };

export function selectOllamaExecutable(filePath: string): void {
  const validated = z.string().min(1).parse(filePath);
  if (!path.isAbsolute(validated) || path.basename(validated).toLowerCase() !== "ollama.exe" || !fs.statSync(validated).isFile()) throw new Error("Select the installed ollama.exe executable.");
  selectedExecutable = validated;
}

export async function findOllamaExecutable(): Promise<string | undefined> {
  const standard = process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, "Programs", "Ollama", "ollama.exe") : undefined;
  for (const candidate of [selectedExecutable, standard]) if (candidate && fs.existsSync(candidate)) return candidate;
  try {
    const stdout = await new Promise<string>((resolve, reject) => {
      execFile(process.platform === "win32" ? "where.exe" : "which", ["ollama"], { timeout: 5000, windowsHide: true }, (error, stdout) => {
        if (error) reject(error); else resolve(stdout);
      });
    });
    return stdout.split(/\r?\n/).map(value => value.trim()).find(value => path.isAbsolute(value) && fs.existsSync(value));
  } catch { return undefined; }
}

async function listModels(timeoutMs = 5000): Promise<string[]> {
  const response = await fetch(`${BASE_URL}/api/tags`, { signal: AbortSignal.any([AbortSignal.timeout(timeoutMs), shutdownController.signal]) });
  if (!response.ok) throw new Error(`Ollama returned HTTP ${response.status}.`);
  return tagsSchema.parse(await response.json()).models.map(model => model.name);
}

export async function detectRuntime(): Promise<RuntimeStatus> {
  try {
    const availableModels = await listModels();
    const modelInstalled = availableModels.includes(REQUIRED_MODEL);
    return { state: modelInstalled ? "ready" : "model_missing", ollamaInstalled: true, ollamaRunning: true, requiredModel: REQUIRED_MODEL, modelInstalled, availableModels, message: modelInstalled ? "Ready for local reviews" : "Download the review model to finish setup." };
  } catch (error) {
    const executable = await findOllamaExecutable();
    const invalidResponse = error instanceof z.ZodError || error instanceof SyntaxError;
    return { state: executable ? "ollama_not_running" : "missing_ollama", ollamaInstalled: Boolean(executable), ollamaRunning: false, requiredModel: REQUIRED_MODEL, modelInstalled: false, availableModels: [], message: invalidResponse
      ? "The local Ollama API returned an invalid response. Restart Ollama or check for another program using port 11434."
      : executable ? `Ollama API unavailable. Start Ollama or retry. ${error instanceof Error ? error.message : ""}` : "Install Ollama, then check again or locate ollama.exe." };
  }
}

export function startOllama(): Promise<RuntimeStatus> {
  if (starting) return starting;
  starting = startRuntime().finally(() => { starting = undefined; });
  return starting;
}

async function startRuntime(): Promise<RuntimeStatus> {
  if (shuttingDown) throw new Error("Application is closing.");
  const current = await detectRuntime();
  if (current.ollamaRunning) return current;
  const executable = await findOllamaExecutable();
  if (!executable) throw new Error("Install Ollama or locate ollama.exe first.");
  if (shuttingDown) throw new Error("Application is closing.");
  let failure: string | undefined;
  if (!ownedProcess) {
    const child = spawn(executable, ["serve"], { windowsHide: true, stdio: "ignore", shell: false });
    ownedProcess = child;
    child.on("error", error => { failure = error.message; if (ownedProcess === child) ownedProcess = undefined; });
    child.on("exit", code => { failure = `Ollama exited (${code}).`; if (ownedProcess === child) ownedProcess = undefined; });
  }
  const deadline = Date.now() + 30000;
  while (Date.now() < deadline && !shuttingDown) {
    try {
      const availableModels = await listModels(Math.max(1, Math.min(5000, deadline - Date.now())));
      const modelInstalled = availableModels.includes(REQUIRED_MODEL);
      return { state: modelInstalled ? "ready" : "model_missing", ollamaInstalled: true, ollamaRunning: true,
        requiredModel: REQUIRED_MODEL, modelInstalled, availableModels,
        message: modelInstalled ? "Ready for local reviews" : "Download the review model to finish setup." };
    } catch { /* Retry until the bounded startup deadline. */ }
    if (failure) throw new Error(`${failure} Try starting Ollama from the Start menu, then check again.`);
    await wait(Math.max(0, Math.min(500, deadline - Date.now())));
  }
  throw new Error("Ollama did not become ready within 30 seconds. Check Ollama's logs, then retry.");
}

export function getPullStatus(): ModelPullStatus { return { ...pullStatus }; }
export function beginModelPull(): ModelPullStatus {
  if (shuttingDown) throw new Error("Application is closing.");
  if (pullController) return getPullStatus();
  const controller = new AbortController();
  pullController = controller;
  pullStatus = { state: "downloading", message: "Connecting to Ollama…" };
  void pullModel(controller);
  return getPullStatus();
}
export function cancelModelPull(): ModelPullStatus {
  if (pullController) {
    pullStatus = { state: "cancelled", message: "Download cancelled. Retry when ready." };
    pullController.abort();
  }
  return getPullStatus();
}

async function pullModel(controller: AbortController): Promise<void> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let stalled = false;
  const resetTimeout = () => {
    clearTimeout(timer);
    timer = setTimeout(() => { stalled = true; controller.abort(); }, 120000);
  };
  resetTimeout();
  try {
    const response = await fetch(`${BASE_URL}/api/pull`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: REQUIRED_MODEL, stream: true }), signal: controller.signal });
    if (!response.ok || !response.body) throw new Error(`Model download failed (HTTP ${response.status}).`);
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let pending = "";
    let succeeded = false;
    const consume = (line: string) => {
      controller.signal.throwIfAborted();
      if (!line.trim()) return;
      const progress = progressSchema.parse(JSON.parse(line));
      if (progress.error) throw new Error(progress.error);
      succeeded = progress.status === "success";
      pullStatus = { state: "downloading", message: progress.status ?? "Downloading…", digest: progress.digest, completed: progress.completed, total: progress.total };
    };
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        resetTimeout();
        pending += decoder.decode(value, { stream: true });
        if (pending.length > 1024 * 1024) throw new Error("Ollama returned an oversized progress message.");
        const lines = pending.split("\n");
        pending = lines.pop() ?? "";
        lines.forEach(consume);
      }
      consume(pending + decoder.decode());
    } finally { await reader.cancel().catch(() => undefined); reader.releaseLock(); }
    if (controller.signal.aborted) throw new Error("Download cancelled.");
    if (!succeeded || !(await listModels()).includes(REQUIRED_MODEL)) throw new Error("Download ended without a verified model. Retry the download.");
    if (!controller.signal.aborted) pullStatus = { state: "complete", message: "Review model downloaded and verified." };
  } catch (error) {
    if (pullStatus.state !== "cancelled") pullStatus = { state: "error", message: stalled ? "Download stalled for two minutes. Check your connection and retry." : `Download failed: ${error instanceof Error ? error.message : String(error)} Check network and available disk space, then retry.` };
  } finally {
    clearTimeout(timer);
    if (pullController === controller) pullController = undefined;
  }
}

export function shutdownRuntime(): void {
  shuttingDown = true;
  shutdownController.abort();
  cancelModelPull();
  ownedProcess?.kill();
  ownedProcess = undefined;
}
