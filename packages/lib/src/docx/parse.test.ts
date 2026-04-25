import { describe, expect, it } from "vitest";
import { createManualChaptersFromText } from "./parse";

// This test validates the heading regex behavior without reading an actual DOCX file.
const CHAPTER_HEADING = /^(chapter|ch\.|part)\s+([0-9ivxlcdm]+|one|two|three|four|five|six|seven|eight|nine|ten)\b/i;

describe("chapter heading detection", () => {
  it("matches canonical chapter headings", () => {
    expect(CHAPTER_HEADING.test("Chapter 1")).toBe(true);
    expect(CHAPTER_HEADING.test("Part IV")).toBe(true);
    expect(CHAPTER_HEADING.test("Prologue")).toBe(false);
  });
});

describe("createManualChaptersFromText", () => {
  it("splits text into chapter chunks by delimiter", () => {
    const text = "Intro text\n---\nMiddle text\n---\nEnding text";
    const result = createManualChaptersFromText(text, "---");
    expect(result).toHaveLength(3);
    expect(result[0].title).toBe("Chapter 1");
    expect(result[1].content).toContain("Middle text");
  });

  it("falls back to a single chapter when delimiter is not present", () => {
    const text = "Aten XX1\nMara enters the old city and notices the market is oddly quiet.";
    const result = createManualChaptersFromText(text, "Chapter ");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Aten XX1");
    expect(result[0].content).toContain("Mara enters the old city");
  });

  it("falls back to a single chapter when delimiter is blank", () => {
    const text = "Single chapter body text without explicit markers.";
    const result = createManualChaptersFromText(text, "   ");
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("Single chapter body text without explicit markers.");
  });
});
