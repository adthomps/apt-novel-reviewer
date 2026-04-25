import mammoth from "mammoth";
import { sha256 } from "../hash";

export interface ParsedChapter {
  chapterNumber: number;
  title: string;
  content: string;
  contentHash: string;
  wordCount: number;
  characterCount: number;
}

export interface ParseDocxResult {
  chapters: ParsedChapter[];
  usedFallback: boolean;
  fullText: string;
}

const CHAPTER_HEADING = /^(chapter|ch\.|part)\s+([0-9ivxlcdm]+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i;

export async function parseDocxIntoChapters(filePath: string): Promise<ParseDocxResult> {
  const result = await mammoth.extractRawText({ path: filePath });
  const fullText = result.value.replace(/\r/g, "").trim();
  if (!fullText) {
    throw new Error("DOCX parse failure: no text extracted");
  }

  const lines = fullText.split("\n").map((line) => line.trim());
  const headingIndexes: number[] = [];

  lines.forEach((line, index) => {
    if (line.length > 0 && CHAPTER_HEADING.test(line)) {
      headingIndexes.push(index);
    }
  });

  if (headingIndexes.length === 0) {
    return {
      chapters: [toChapter(1, "Manuscript", fullText)],
      usedFallback: true,
      fullText
    };
  }

  const chapters: ParsedChapter[] = [];
  for (let i = 0; i < headingIndexes.length; i += 1) {
    const start = headingIndexes[i];
    const end = i + 1 < headingIndexes.length ? headingIndexes[i + 1] : lines.length;
    const title = lines[start] || `Chapter ${i + 1}`;
    const content = lines.slice(start + 1, end).join("\n").trim();
    chapters.push(toChapter(i + 1, title, content));
  }

  return {
    chapters,
    usedFallback: false,
    fullText
  };
}

export function createManualChaptersFromText(fullText: string, delimiter: string): ParsedChapter[] {
  const normalizedText = fullText.replace(/\r/g, "").trim();
  const normalizedDelimiter = delimiter.trim();

  if (!normalizedText) {
    throw new Error("Cannot split empty manuscript text.");
  }

  if (!normalizedDelimiter) {
    return [toChapter(1, deriveSingleChapterTitle(normalizedText), normalizedText)];
  }

  if (!normalizedText.includes(normalizedDelimiter)) {
    return [toChapter(1, deriveSingleChapterTitle(normalizedText), normalizedText)];
  }

  const chunks = normalizedText
    .split(normalizedDelimiter)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);

  if (chunks.length < 2) {
    throw new Error("Manual split produced less than two chapters. Use a delimiter that appears between chapters.");
  }

  return chunks.map((chunk, index) => toChapter(index + 1, `Chapter ${index + 1}`, chunk));
}

function deriveSingleChapterTitle(text: string): string {
  const firstLine = text
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.length > 0);

  if (!firstLine) {
    return "Chapter 1";
  }

  return firstLine.length > 80 ? `${firstLine.slice(0, 77)}...` : firstLine;
}

function toChapter(chapterNumber: number, title: string, content: string): ParsedChapter {
  const normalized = content.trim();
  return {
    chapterNumber,
    title: title.trim(),
    content: normalized,
    contentHash: sha256(`${chapterNumber}:${title}:${normalized}`),
    wordCount: normalized.length > 0 ? normalized.split(/\s+/).length : 0,
    characterCount: normalized.length
  };
}
