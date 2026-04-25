import { describe, expect, it } from "vitest";
import { diffChapterHashes } from "./diff";

describe("diffChapterHashes", () => {
  it("classifies unchanged, modified, new, and removed", () => {
    const previous = [
      { chapterNumber: 1, title: "Chapter 1", contentHash: "a" },
      { chapterNumber: 2, title: "Chapter 2", contentHash: "b" },
      { chapterNumber: 3, title: "Chapter 3", contentHash: "c" }
    ];

    const current = [
      { chapterNumber: 1, title: "Chapter 1", contentHash: "a" },
      { chapterNumber: 2, title: "Chapter 2", contentHash: "bb" },
      { chapterNumber: 4, title: "Chapter 4", contentHash: "d" }
    ];

    const result = diffChapterHashes(previous, current);
    expect(result).toEqual([
      { chapterNumber: 1, title: "Chapter 1", status: "unchanged" },
      { chapterNumber: 2, title: "Chapter 2", status: "modified" },
      { chapterNumber: 3, title: "Chapter 3", status: "removed" },
      { chapterNumber: 4, title: "Chapter 4", status: "new" }
    ]);
  });
});
