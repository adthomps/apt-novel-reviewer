export interface OllamaClientConfig {
    baseUrl: string;
    model: string;
    timeoutMs: number;
    retries: number;
}
export declare class OllamaClient {
    private readonly config;
    constructor(config?: Partial<OllamaClientConfig>);
    listModels(): Promise<string[]>;
    generate(prompt: string): Promise<string>;
}
//# sourceMappingURL=client.d.ts.map