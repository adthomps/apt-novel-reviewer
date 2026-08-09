import type { ReviewResultParsed } from "../schemas";
declare const FINDING_TYPES: readonly ["continuity", "character", "timeline", "chapter", "pacing", "clarity", "consistency"];
type FindingType = (typeof FINDING_TYPES)[number];
export declare function refineReviewResult(result: ReviewResultParsed, chapterText: string): ReviewResultParsed;
export declare function normalizeFindingType(value: string): FindingType;
export {};
//# sourceMappingURL=quality.d.ts.map