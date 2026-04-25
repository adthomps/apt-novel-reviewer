import type { ReviewMode } from "@apt/types";

export function buildReviewPrompt(mode: ReviewMode, chapterText: string, chapterId: string): string {
  const modeInstruction = {
    chapter_review: "Review this chapter for clarity, pacing, and narrative consistency.",
    continuity_review: "Review continuity against internal narrative logic and references.",
    character_review: "Review character voice and behavior consistency.",
    timeline_review: "Review temporal consistency and sequencing issues."
  }[mode];

  return [
    "You are a strict novel reviewer.",
    "Return JSON only. No markdown, no commentary.",
    "Use the exact schema fields and enum values provided.",
    "If uncertain, lower confidence and include warnings.",
    modeInstruction,
    "Schema:",
    `{
  \"templateId\": \"${mode}\",
  \"reviewType\": \"${mode}\",
  \"status\": \"success\" | \"partial\" | \"error\",
  \"model\": \"gpt-oss:20b\",
  \"summary\": {
    \"overallAssessment\": string,
    \"issueCount\": number,
    \"highSeverityCount\": number,
    \"mediumSeverityCount\": number,
    \"lowSeverityCount\": number
  },
  \"findings\": [
    {
      \"id\": string,
      \"type\": string,
      \"severity\": \"low\" | \"medium\" | \"high\",
      \"confidence\": \"low\" | \"medium\" | \"high\",
      \"location\": { \"chapterId\": \"${chapterId}\", \"textAnchor\": string },
      \"issue\": string,
      \"whyItMatters\": string,
      \"evidence\": string[],
      \"suggestedFix\": string
    }
  ],
  \"notes\": string[],
  \"warnings\": string[],
  \"generatedAt\": string
}`,
    "Chapter text:",
    chapterText
  ].join("\n\n");
}
