import { type ReviewResultParsed } from "../schemas";
export interface ParseResult {
    success: boolean;
    data?: ReviewResultParsed;
    errors: string[];
}
export interface ParseDefaults {
    templateId?: string;
    reviewType?: string;
    model?: string;
}
export declare function parseReviewResult(rawText: string, defaults?: ParseDefaults): ParseResult;
//# sourceMappingURL=parser.d.ts.map