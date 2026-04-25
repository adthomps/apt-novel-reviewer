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
//# sourceMappingURL=runtime.d.ts.map