import { buildReviewPromptWithContext, OllamaClient, parseReviewResult, refineReviewResult } from "@apt/lib";
import type { Chapter, ReviewMode } from "@apt/types";

export interface ReviewContextNote {
  category: "character" | "timeline";
  title: string;
  content: string;
}

export async function runReview(
  mode: ReviewMode,
  chapter: Chapter,
  options?: {
    priorChapters?: Chapter[];
    canonNotes?: ReviewContextNote[];
  }
) {
  const model = "gpt-oss:20b";
  const client = new OllamaClient({ model });
  const prompt = buildReviewPromptWithContext({
    mode,
    chapterText: chapter.content,
    chapterId: chapter.id,
    chapterTitle: chapter.title,
    chapterNumber: chapter.chapterNumber,
    priorChapters: (options?.priorChapters ?? []).map((item) => ({
      id: item.id,
      chapterNumber: item.chapterNumber,
      title: item.title,
      content: item.content
    })),
    canonNotes: options?.canonNotes
  });
  const response = await client.generate(prompt, { format: "json" });
  const defaults = {
    templateId: mode,
    reviewType: mode,
    model
  };

  const parsed = parseReviewResult(response, defaults);
  if (parsed.success && parsed.data) {
    return {
      ...parsed,
      data: refineReviewResult(parsed.data, chapter.content)
    };
  }

  const hasJsonSyntaxError = parsed.errors.some((error) =>
    /json|unexpected|expected|position|token|unterminated/i.test(error)
  );

  if (!hasJsonSyntaxError) {
    return parsed;
  }

  const repaired = await client.generate(buildJsonRepairPrompt(response), { format: "json" });
  const repairedParsed = parseReviewResult(repaired, defaults);
  if (repairedParsed.success && repairedParsed.data) {
    return {
      ...repairedParsed,
      data: refineReviewResult(repairedParsed.data, chapter.content)
    };
  }

  return repairedParsed;
}

function buildJsonRepairPrompt(rawResponse: string): string {
  return [
    "You repair malformed JSON.",
    "Return only valid JSON. No markdown, no comments, no explanation.",
    "Preserve the original fields and values as much as possible.",
    "Do not invent new findings. Only repair syntax.",
    "If a field is missing, keep structure consistent with the existing payload.",
    "Malformed JSON input:",
    rawResponse
  ].join("\n\n");
}
