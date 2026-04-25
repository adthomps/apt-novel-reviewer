import { buildReviewPrompt, OllamaClient, parseReviewResult } from "@apt/lib";
import type { Chapter, ReviewMode } from "@apt/types";

export async function runReview(mode: ReviewMode, chapter: Chapter) {
  const model = "gpt-oss:20b";
  const client = new OllamaClient({ model });
  const prompt = buildReviewPrompt(mode, chapter.content, chapter.id);
  const response = await client.generate(prompt);
  const defaults = {
    templateId: mode,
    reviewType: mode,
    model
  };

  const parsed = parseReviewResult(response, defaults);
  if (parsed.success) {
    return parsed;
  }

  const hasJsonSyntaxError = parsed.errors.some((error) =>
    /json|unexpected|expected|position|token|unterminated/i.test(error)
  );

  if (!hasJsonSyntaxError) {
    return parsed;
  }

  const repaired = await client.generate(buildJsonRepairPrompt(response));
  return parseReviewResult(repaired, defaults);
}

function buildJsonRepairPrompt(rawResponse: string): string {
  return [
    "You repair malformed JSON.",
    "Return only valid JSON. No markdown, no comments, no explanation.",
    "Preserve the original fields and values as much as possible.",
    "If a field is missing, keep structure consistent with the existing payload.",
    "Malformed JSON input:",
    rawResponse
  ].join("\n\n");
}
