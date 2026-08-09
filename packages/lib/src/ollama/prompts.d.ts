import type { ReviewMode } from "@apt/types";
export interface ReviewPromptContext {
    mode: ReviewMode;
    chapterText: string;
    chapterId: string;
    chapterTitle?: string;
    chapterNumber?: number;
    priorChapters?: Array<{
        id: string;
        chapterNumber: number;
        title: string;
        content: string;
    }>;
    canonNotes?: Array<{
        category: "character" | "timeline";
        title: string;
        content: string;
    }>;
}
export declare function buildReviewPrompt(mode: ReviewMode, chapterText: string, chapterId: string): string;
export declare function buildReviewPromptWithContext(context: ReviewPromptContext): string;
//# sourceMappingURL=prompts.d.ts.map