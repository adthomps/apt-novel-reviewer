export type RuntimeState = "ready" | "missing_ollama" | "ollama_not_running" | "model_missing";

export interface RuntimeStatus {
  state: RuntimeState;
  ollamaInstalled: boolean;
  ollamaRunning: boolean;
  requiredModel: string;
  modelInstalled: boolean;
  availableModels: string[];
  message: string;
}

export interface ModelPullStatus {
  state: "idle" | "downloading" | "complete" | "cancelled" | "error";
  message: string;
  digest?: string;
  completed?: number;
  total?: number;
}

export interface RuntimeApi {
  getStatus(): Promise<RuntimeStatus>;
  getModels(): Promise<string[]>;
  openDownloadPage(): Promise<void>;
  selectExecutable(): Promise<boolean>;
  start(): Promise<RuntimeStatus>;
  beginPull(): Promise<ModelPullStatus>;
  cancelPull(): Promise<ModelPullStatus>;
  getPullStatus(): Promise<ModelPullStatus>;
}
