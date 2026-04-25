import { z } from "zod";

export const FindingSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  severity: z.enum(["low", "medium", "high"]),
  confidence: z.enum(["low", "medium", "high"]),
  location: z.object({
    chapterId: z.string().min(1),
    textAnchor: z.string().min(1)
  }),
  issue: z.string().min(1),
  whyItMatters: z.string().min(1),
  evidence: z.array(z.string()),
  suggestedFix: z.string().min(1),
  status: z.enum(["new", "still", "resolved"]).optional()
});

export const ReviewResultSchema = z.object({
  templateId: z.string().min(1),
  reviewType: z.string().min(1),
  status: z.enum(["success", "partial", "error"]),
  model: z.string().min(1),
  summary: z.object({
    overallAssessment: z.string(),
    issueCount: z.number().int().nonnegative(),
    highSeverityCount: z.number().int().nonnegative(),
    mediumSeverityCount: z.number().int().nonnegative(),
    lowSeverityCount: z.number().int().nonnegative()
  }),
  findings: z.array(FindingSchema),
  notes: z.array(z.string()),
  warnings: z.array(z.string()),
  generatedAt: z.string()
});

export const RunReviewInputSchema = z.object({
  projectId: z.string().min(1),
  versionId: z.string().min(1),
  reviewType: z.enum([
    "chapter_review",
    "continuity_review",
    "character_review",
    "timeline_review"
  ]),
  chapterId: z.string().optional()
});

export type ReviewResultParsed = z.infer<typeof ReviewResultSchema>;
