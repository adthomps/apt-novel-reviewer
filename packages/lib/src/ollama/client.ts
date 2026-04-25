import { setTimeout as wait } from "node:timers/promises";

export interface OllamaClientConfig {
  baseUrl: string;
  model: string;
  timeoutMs: number;
  retries: number;
}

export class OllamaClient {
  private readonly config: OllamaClientConfig;

  constructor(config?: Partial<OllamaClientConfig>) {
    this.config = {
      baseUrl: config?.baseUrl ?? "http://127.0.0.1:11434",
      model: config?.model ?? "gpt-oss:20b",
      timeoutMs: config?.timeoutMs ?? 120000,
      retries: config?.retries ?? 2
    };
  }

  async listModels(): Promise<string[]> {
    const response = await fetch(`${this.config.baseUrl}/api/tags`);
    if (!response.ok) {
      throw new Error(`Ollama /api/tags failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { models?: Array<{ name?: string }> };
    return (payload.models ?? []).map((model) => model.name ?? "").filter(Boolean);
  }

  async generate(prompt: string): Promise<string> {
    let attempt = 0;
    while (attempt <= this.config.retries) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.config.timeoutMs);
        const response = await fetch(`${this.config.baseUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ model: this.config.model, prompt, stream: false }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (!response.ok) {
          throw new Error(`Ollama generate failed with status ${response.status}`);
        }

        const body = (await response.json()) as { response?: string };
        return body.response ?? "";
      } catch (error) {
        attempt += 1;
        if (attempt > this.config.retries) {
          throw error;
        }
        await wait(350 * attempt);
      }
    }

    throw new Error("Ollama generate failed");
  }
}
