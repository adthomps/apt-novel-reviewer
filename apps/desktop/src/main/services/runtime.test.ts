import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { EventEmitter } from "node:events";
const mocks = vi.hoisted(() => ({ exists: vi.fn(), stat: vi.fn(), exec: vi.fn(), spawn: vi.fn() }));
vi.mock("node:fs", () => ({ default: { existsSync: mocks.exists, statSync: mocks.stat } }));
vi.mock("node:child_process", () => ({ execFile: mocks.exec, spawn: mocks.spawn }));
let runtime: typeof import("./runtime");
const fetchMock = vi.fn();
const tags = (models = ["gpt-oss:20b"]) => new Response(JSON.stringify({ models: models.map(name => ({ name })) }));
const stream = (chunks: string[]) => new Response(new ReadableStream({ start(controller) { chunks.forEach(chunk => controller.enqueue(new TextEncoder().encode(chunk))); controller.close(); } }));
async function settlePull() { await vi.waitFor(() => expect(runtime.getPullStatus().state).not.toBe("downloading")); }

beforeEach(async () => {
  vi.resetModules(); vi.clearAllMocks();
  vi.stubGlobal("fetch", fetchMock);
  mocks.exists.mockReturnValue(false);
  mocks.stat.mockReturnValue({ isFile: () => true });
  mocks.exec.mockImplementation((_command, _args, _options, callback) => callback(new Error("Not found")));
  runtime = await import("./runtime");
});
afterEach(() => { runtime.shutdownRuntime(); vi.useRealTimers(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("Ollama onboarding", () => {
  it("accepts an existing API without requiring an executable", async () => {
    const timeoutSpy = vi.spyOn(AbortSignal, "timeout");
    fetchMock.mockResolvedValue(tags());
    expect((await runtime.detectRuntime()).state).toBe("ready");
    expect(mocks.exec).not.toHaveBeenCalled();
    expect(mocks.exists).not.toHaveBeenCalled();
    expect(fetchMock.mock.calls[0][1].signal).toBeInstanceOf(AbortSignal);
    expect(timeoutSpy).toHaveBeenCalledWith(5000);
    timeoutSpy.mockRestore();
  });
  it("discovers a new standard Windows installation without PATH", async () => {
    vi.stubEnv("LOCALAPPDATA", "C:\\Users\\test\\AppData\\Local");
    mocks.exists.mockImplementation((file: string) => file.endsWith("Programs\\Ollama\\ollama.exe"));
    fetchMock.mockRejectedValue(new Error("Offline"));
    expect((await runtime.detectRuntime()).state).toBe("ollama_not_running");
    expect(mocks.exec).not.toHaveBeenCalled();
  });
  it("uses a selected custom executable and rejects unrelated executables", async () => {
    mocks.exists.mockReturnValue(true);
    runtime.selectOllamaExecutable("C:\\Custom\\ollama.exe");
    expect(await runtime.findOllamaExecutable()).toBe("C:\\Custom\\ollama.exe");
    expect(() => runtime.selectOllamaExecutable("C:\\Custom\\other.exe")).toThrow();
  });
  it("finds an absolute executable returned by PATH lookup", async () => {
    mocks.exists.mockImplementation((file: string) => file === "C:\\Custom\\ollama.exe");
    mocks.exec.mockImplementation((_command, _args, _options, callback) => callback(null, "C:\\Custom\\ollama.exe\r\n", ""));
    expect(await runtime.findOllamaExecutable()).toBe("C:\\Custom\\ollama.exe");
  });
  it("reports missing installation and malformed API responses", async () => {
    fetchMock.mockResolvedValue(new Response('{"models":"invalid"}'));
    expect(await runtime.detectRuntime()).toMatchObject({ state: "missing_ollama", message: expect.stringContaining("invalid response") });
  });
  it("does not spawn or terminate an externally running Ollama", async () => {
    fetchMock.mockImplementation(async () => tags());
    await runtime.startOllama(); runtime.shutdownRuntime();
    expect(mocks.spawn).not.toHaveBeenCalled();
  });
  it("deduplicates startup and only kills its own process", async () => {
    mocks.exists.mockReturnValue(true);
    runtime.selectOllamaExecutable("C:\\Custom\\ollama.exe");
    const child = Object.assign(new EventEmitter(), { kill: vi.fn() });
    mocks.spawn.mockReturnValue(child);
    fetchMock.mockRejectedValueOnce(new Error("Not running")).mockImplementation(async () => tags());
    const first = runtime.startOllama();
    expect(runtime.startOllama()).toBe(first);
    await first;
    expect(mocks.spawn).toHaveBeenCalledTimes(1);
    expect(mocks.spawn.mock.calls[0][1]).toEqual(["serve"]);
    runtime.shutdownRuntime(); expect(child.kill).toHaveBeenCalledOnce();
  });
  it("parses split NDJSON chunks and verifies the downloaded model", async () => {
    fetchMock.mockResolvedValueOnce(stream(['{"status":"pulling","completed":5,', '"total":10}\n{"status":"success"}'])).mockResolvedValueOnce(tags());
    runtime.beginModelPull(); runtime.beginModelPull();
    await settlePull();
    expect(runtime.getPullStatus().state).toBe("complete");
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(JSON.parse(fetchMock.mock.calls[0][1].body)).toEqual({ model: "gpt-oss:20b", stream: true });
  });
  it("rejects success when the model cannot be verified", async () => {
    fetchMock.mockResolvedValueOnce(stream(['{"status":"success"}\n'])).mockResolvedValueOnce(tags([]));
    runtime.beginModelPull(); await settlePull();
    expect(runtime.getPullStatus().state).toBe("error");
  });
  it.each(['not json\n', '{"total":"wrong"}\n', '{"error":"disk full"}\n'])("reports invalid progress or server errors: %s", async chunk => {
    fetchMock.mockResolvedValueOnce(stream([chunk]));
    runtime.beginModelPull(); await settlePull();
    expect(runtime.getPullStatus().state).toBe("error");
  });
  it("cancels and allows a fresh retry", async () => {
    fetchMock.mockImplementationOnce((_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(new Error("Aborted")))));
    runtime.beginModelPull();
    expect(runtime.cancelModelPull().state).toBe("cancelled");
    await new Promise(resolve => setTimeout(resolve, 0));
    fetchMock.mockResolvedValueOnce(stream(['{"status":"success"}\n'])).mockResolvedValueOnce(tags());
    runtime.beginModelPull(); await settlePull();
    expect(runtime.getPullStatus().state).toBe("complete");
  });
  it("aborts a stalled pull after two minutes", async () => {
    vi.useFakeTimers();
    fetchMock.mockImplementationOnce((_url, options) => new Promise((_resolve, reject) => options.signal.addEventListener("abort", () => reject(new Error("Aborted")))));
    runtime.beginModelPull();
    await vi.advanceTimersByTimeAsync(120000);
    expect(runtime.getPullStatus()).toMatchObject({ state: "error", message: expect.stringContaining("stalled") });
  });
  it("bounds startup to 30 seconds when the server stays unavailable", async () => {
    vi.useFakeTimers();
    mocks.exists.mockReturnValue(true);
    runtime.selectOllamaExecutable("C:\\Custom\\ollama.exe");
    mocks.spawn.mockReturnValue(Object.assign(new EventEmitter(), { kill: vi.fn() }));
    fetchMock.mockRejectedValue(new Error("Not running"));
    const assertion = expect(runtime.startOllama()).rejects.toThrow("30 seconds");
    await vi.advanceTimersByTimeAsync(30000);
    await assertion;
  });
  it("aborts status requests on shutdown", async () => {
    let signal: AbortSignal | undefined;
    fetchMock.mockImplementationOnce((_url, options) => {
      signal = options.signal;
      return new Promise((_resolve, reject) => signal!.addEventListener("abort", () => reject(new Error("Aborted"))));
    });
    const request = runtime.detectRuntime();
    runtime.shutdownRuntime();
    expect(signal?.aborted).toBe(true);
    await request;
  });
});
