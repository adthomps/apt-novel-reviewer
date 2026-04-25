import type { ReviewMode, ReviewResult, ReviewRun } from "@apt/types";
export declare function createReviewRun(input: {
    projectId: string;
    versionId: string;
    reviewType: ReviewMode;
    model: string;
}): ReviewRun;
export declare function completeReviewRun(runId: string, result: ReviewResult): void;
export declare function failReviewRun(runId: string, message: string): void;
export declare function listFindingsByProject(projectId: string): Array<{
    id: string;
    reviewRunId: string;
    reviewType: string;
    chapterId: string;
    findingType: string;
    severity: string;
    confidence: string;
    textAnchor: string;
    issue: string;
    whyItMatters: string;
    evidence: string;
    suggestedFix: string;
    status: string;
}>;
export declare function updateFindingStatus(findingId: string, status: "new" | "still" | "resolved"): void;
export declare function listReviewRunsByVersion(versionId: string): Array<{
    id: string;
    versionId: string;
    reviewType: string;
    model: string;
    status: string;
    startedAt: number;
    completedAt: number | null;
    errorMessage: string | null;
}>;
export declare function deleteReviewRun(runId: string): number;
export declare function deleteReviewRunsByVersionAndStatus(versionId: string, statuses: Array<"success" | "partial" | "error">): number;
//# sourceMappingURL=reviews.d.ts.map