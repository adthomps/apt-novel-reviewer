export type ReviewMode =
  | "chapter_review"
  | "continuity_review"
  | "character_review"
  | "timeline_review";

export type Severity = "low" | "medium" | "high";
export type Confidence = "low" | "medium" | "high";

export interface Finding {
  id: string;
  type: string;
  severity: Severity;
  confidence: Confidence;
  location: {
    chapterId: string;
    textAnchor: string;
  };
  issue: string;
  whyItMatters: string;
  evidence: string[];
  suggestedFix: string;
  status?: "new" | "still" | "resolved";
}

export interface ReviewResult {
  templateId: string;
  reviewType: string;
  status: "success" | "partial" | "error";
  model: string;
  summary: {
    overallAssessment: string;
    issueCount: number;
    highSeverityCount: number;
    mediumSeverityCount: number;
    lowSeverityCount: number;
  };
  findings: Finding[];
  notes: string[];
  warnings: string[];
  generatedAt: string;
}

export interface ReviewRun {
  id: string;
  projectId: string;
  versionId: string;
  templateId: ReviewMode;
  reviewType: ReviewMode;
  model: string;
  status: "pending" | "running" | "success" | "partial" | "error";
  startedAt: number;
  completedAt: number | null;
  errorMessage: string | null;
}
