import { execFile } from "node:child_process";
import { promisify } from "node:util";
import type { RuntimeStatus } from "@apt/types";
import { OllamaClient } from "@apt/lib";

const execFileAsync = promisify(execFile);
const REQUIRED_MODEL = "gpt-oss:20b";

export async function detectRuntime(): Promise<RuntimeStatus> {
  const ollamaInstalled = await isOllamaInstalled();
  if (!ollamaInstalled) {
    return {
      state: "missing_ollama",
      ollamaInstalled,
      ollamaRunning: false,
      requiredModel: REQUIRED_MODEL,
      modelInstalled: false,
      availableModels: [],
      message: "Ollama is not installed. Install from https://ollama.com/download"
    };
  }

  const client = new OllamaClient();
  try {
    const models = await client.listModels();
    const modelInstalled = models.includes(REQUIRED_MODEL);
    if (!modelInstalled) {
      return {
        state: "model_missing",
        ollamaInstalled: true,
        ollamaRunning: true,
        requiredModel: REQUIRED_MODEL,
        modelInstalled,
        availableModels: models,
        message: `Required model missing. Run: ollama pull ${REQUIRED_MODEL}`
      };
    }

    return {
      state: "ready",
      ollamaInstalled: true,
      ollamaRunning: true,
      requiredModel: REQUIRED_MODEL,
      modelInstalled: true,
      availableModels: models,
      message: "Runtime ready"
    };
  } catch {
    return {
      state: "ollama_not_running",
      ollamaInstalled: true,
      ollamaRunning: false,
      requiredModel: REQUIRED_MODEL,
      modelInstalled: false,
      availableModels: [],
      message: "Ollama is installed but not running. Start it with: ollama serve"
    };
  }
}

async function isOllamaInstalled(): Promise<boolean> {
  try {
    await execFileAsync("ollama", ["--version"]);
    return true;
  } catch {
    return false;
  }
}
