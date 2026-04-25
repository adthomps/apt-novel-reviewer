import { z } from "zod";
export declare const FindingSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodString;
    severity: z.ZodEnum<["low", "medium", "high"]>;
    confidence: z.ZodEnum<["low", "medium", "high"]>;
    location: z.ZodObject<{
        chapterId: z.ZodString;
        textAnchor: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        chapterId: string;
        textAnchor: string;
    }, {
        chapterId: string;
        textAnchor: string;
    }>;
    issue: z.ZodString;
    whyItMatters: z.ZodString;
    evidence: z.ZodArray<z.ZodString, "many">;
    suggestedFix: z.ZodString;
    status: z.ZodOptional<z.ZodEnum<["new", "still", "resolved"]>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    type: string;
    severity: "low" | "medium" | "high";
    confidence: "low" | "medium" | "high";
    location: {
        chapterId: string;
        textAnchor: string;
    };
    issue: string;
    whyItMatters: string;
    evidence: string[];
    suggestedFix: string;
    status?: "new" | "still" | "resolved" | undefined;
}, {
    id: string;
    type: string;
    severity: "low" | "medium" | "high";
    confidence: "low" | "medium" | "high";
    location: {
        chapterId: string;
        textAnchor: string;
    };
    issue: string;
    whyItMatters: string;
    evidence: string[];
    suggestedFix: string;
    status?: "new" | "still" | "resolved" | undefined;
}>;
export declare const ReviewResultSchema: z.ZodObject<{
    templateId: z.ZodString;
    reviewType: z.ZodString;
    status: z.ZodEnum<["success", "partial", "error"]>;
    model: z.ZodString;
    summary: z.ZodObject<{
        overallAssessment: z.ZodString;
        issueCount: z.ZodNumber;
        highSeverityCount: z.ZodNumber;
        mediumSeverityCount: z.ZodNumber;
        lowSeverityCount: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        overallAssessment: string;
        issueCount: number;
        highSeverityCount: number;
        mediumSeverityCount: number;
        lowSeverityCount: number;
    }, {
        overallAssessment: string;
        issueCount: number;
        highSeverityCount: number;
        mediumSeverityCount: number;
        lowSeverityCount: number;
    }>;
    findings: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodString;
        severity: z.ZodEnum<["low", "medium", "high"]>;
        confidence: z.ZodEnum<["low", "medium", "high"]>;
        location: z.ZodObject<{
            chapterId: z.ZodString;
            textAnchor: z.ZodString;
        }, "strip", z.ZodTypeAny, {
            chapterId: string;
            textAnchor: string;
        }, {
            chapterId: string;
            textAnchor: string;
        }>;
        issue: z.ZodString;
        whyItMatters: z.ZodString;
        evidence: z.ZodArray<z.ZodString, "many">;
        suggestedFix: z.ZodString;
        status: z.ZodOptional<z.ZodEnum<["new", "still", "resolved"]>>;
    }, "strip", z.ZodTypeAny, {
        id: string;
        type: string;
        severity: "low" | "medium" | "high";
        confidence: "low" | "medium" | "high";
        location: {
            chapterId: string;
            textAnchor: string;
        };
        issue: string;
        whyItMatters: string;
        evidence: string[];
        suggestedFix: string;
        status?: "new" | "still" | "resolved" | undefined;
    }, {
        id: string;
        type: string;
        severity: "low" | "medium" | "high";
        confidence: "low" | "medium" | "high";
        location: {
            chapterId: string;
            textAnchor: string;
        };
        issue: string;
        whyItMatters: string;
        evidence: string[];
        suggestedFix: string;
        status?: "new" | "still" | "resolved" | undefined;
    }>, "many">;
    notes: z.ZodArray<z.ZodString, "many">;
    warnings: z.ZodArray<z.ZodString, "many">;
    generatedAt: z.ZodString;
}, "strip", z.ZodTypeAny, {
    status: "success" | "partial" | "error";
    templateId: string;
    reviewType: string;
    model: string;
    summary: {
        overallAssessment: string;
        issueCount: number;
        highSeverityCount: number;
        mediumSeverityCount: number;
        lowSeverityCount: number;
    };
    findings: {
        id: string;
        type: string;
        severity: "low" | "medium" | "high";
        confidence: "low" | "medium" | "high";
        location: {
            chapterId: string;
            textAnchor: string;
        };
        issue: string;
        whyItMatters: string;
        evidence: string[];
        suggestedFix: string;
        status?: "new" | "still" | "resolved" | undefined;
    }[];
    notes: string[];
    warnings: string[];
    generatedAt: string;
}, {
    status: "success" | "partial" | "error";
    templateId: string;
    reviewType: string;
    model: string;
    summary: {
        overallAssessment: string;
        issueCount: number;
        highSeverityCount: number;
        mediumSeverityCount: number;
        lowSeverityCount: number;
    };
    findings: {
        id: string;
        type: string;
        severity: "low" | "medium" | "high";
        confidence: "low" | "medium" | "high";
        location: {
            chapterId: string;
            textAnchor: string;
        };
        issue: string;
        whyItMatters: string;
        evidence: string[];
        suggestedFix: string;
        status?: "new" | "still" | "resolved" | undefined;
    }[];
    notes: string[];
    warnings: string[];
    generatedAt: string;
}>;
export declare const RunReviewInputSchema: z.ZodObject<{
    projectId: z.ZodString;
    versionId: z.ZodString;
    reviewType: z.ZodEnum<["chapter_review", "continuity_review", "character_review", "timeline_review"]>;
    chapterId: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    reviewType: "chapter_review" | "continuity_review" | "character_review" | "timeline_review";
    projectId: string;
    versionId: string;
    chapterId?: string | undefined;
}, {
    reviewType: "chapter_review" | "continuity_review" | "character_review" | "timeline_review";
    projectId: string;
    versionId: string;
    chapterId?: string | undefined;
}>;
export type ReviewResultParsed = z.infer<typeof ReviewResultSchema>;
//# sourceMappingURL=schemas.d.ts.map