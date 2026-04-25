export interface ParsedChapter {
    chapterNumber: number;
    title: string;
    content: string;
    contentHash: string;
    wordCount: number;
    characterCount: number;
}
export interface ParseDocxResult {
    chapters: ParsedChapter[];
    usedFallback: boolean;
    fullText: string;
}
export declare function parseDocxIntoChapters(filePath: string): Promise<ParseDocxResult>;
export declare function createManualChaptersFromText(fullText: string, delimiter: string): ParsedChapter[];
//# sourceMappingURL=parse.d.ts.map