import type { ReviewMode } from "@apt/types";

export interface ReviewPromptContext {
  mode: ReviewMode;
  chapterText: string;
  chapterId: string;
  chapterTitle?: string;
  chapterNumber?: number;
  priorChapters?: Array<{ id: string; chapterNumber: number; title: string; content: string }>;
  canonNotes?: Array<{ category: "character" | "timeline"; title: string; content: string }>;
}

export function buildReviewPrompt(mode: ReviewMode, chapterText: string, chapterId: string): string {
  return buildReviewPromptWithContext({ mode, chapterText, chapterId });
}

export function buildReviewPromptWithContext(context: ReviewPromptContext): string {
  const { mode, chapterText, chapterId } = context;
  const modeInstruction = {
    chapter_review:
      "Review this chapter for clarity, pacing, and local narrative consistency. Prefer fewer high-signal findings.",
    continuity_review:
      "Review continuity against prior chapter context and internal narrative logic. Flag contradictions with earlier facts.",
    character_review:
      "Review character voice and behavior consistency against canon notes when provided.",
    timeline_review:
      "Review temporal consistency and sequencing against prior chapters and timeline notes."
  }[mode];

  const lines = [
    "You are a strict novel reviewer.",
    "Return JSON only. No markdown, no commentary.",
    "Use the exact schema fields and enum values provided.",
    "Evidence must be verbatim substrings copied from the chapter text.",
    "If uncertain, lower confidence and include warnings.",
    "Prefer fewer high-signal findings over speculative nitpicks.",
    "Severity rubric: high = breaks plot/character trust; medium = noticeable inconsistency; low = polish.",
    modeInstruction,
    "Finding type must be one of: continuity | character | timeline | chapter | pacing | clarity | consistency",
    "Schema:",
    `{
  "templateId": "${mode}",
  "reviewType": "${mode}",
  "status": "success" | "partial" | "error",
  "model": "gpt-oss:20b",
  "summary": {
    "overallAssessment": string,
    "issueCount": number,
    "highSeverityCount": number,
    "mediumSeverityCount": number,
    "lowSeverityCount": number
  },
  "findings": [
    {
      "id": string,
      "type": "continuity" | "character" | "timeline" | "chapter" | "pacing" | "clarity" | "consistency",
      "severity": "low" | "medium" | "high",
      "confidence": "low" | "medium" | "high",
      "location": { "chapterId": "${chapterId}", "textAnchor": string },
      "issue": string,
      "whyItMatters": string,
      "evidence": string[],
      "suggestedFix": string
    }
  ],
  "notes": string[],
  "warnings": string[],
  "generatedAt": string
}`
  ];

  if (context.chapterTitle || context.chapterNumber != null) {
    lines.push(
      `Target chapter: ${context.chapterNumber != null ? `Chapter ${context.chapterNumber}` : "Chapter"} — ${
        context.chapterTitle ?? chapterId
      } (${chapterId})`
    );
  }

  const relevantNotes = (context.canonNotes ?? []).filter((note) => {
    if (mode === "character_review") return note.category === "character";
    if (mode === "timeline_review") return note.category === "timeline";
    return mode === "continuity_review";
  });

  if (relevantNotes.length > 0) {
    lines.push("Canon notes:");
    for (const note of relevantNotes.slice(0, 12)) {
      lines.push(`[${note.category}] ${note.title}: ${truncate(note.content, 600)}`);
    }
  }

  if (
    (mode === "continuity_review" || mode === "timeline_review") &&
    context.priorChapters &&
    context.priorChapters.length > 0
  ) {
    lines.push("Prior chapter context (recent excerpts):");
    for (const prior of context.priorChapters.slice(-3)) {
      lines.push(
        `Chapter ${prior.chapterNumber} — ${prior.title} (${prior.id}):\n${truncate(prior.content, 1200)}`
      );
    }
  }

  lines.push("Chapter text:", chapterText);
  return lines.join("\n\n");
}

function truncate(value: string, max: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= max) {
    return trimmed;
  }
  return `${trimmed.slice(0, max)}…`;
}
