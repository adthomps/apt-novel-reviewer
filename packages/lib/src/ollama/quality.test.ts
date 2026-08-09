import { describe, expect, it } from "vitest";
import { normalizeFindingType, refineReviewResult } from "./quality";
import type { ReviewResultParsed } from "../schemas";

function baseResult(overrides?: Partial<ReviewResultParsed>): ReviewResultParsed {
  return {
    templateId: "chapter_review",
    reviewType: "chapter_review",
    status: "success",
    model: "gpt-oss:20b",
    summary: {
      overallAssessment: "ok",
      issueCount: 1,
      highSeverityCount: 0,
      mediumSeverityCount: 1,
      lowSeverityCount: 0
    },
    findings: [
      {
        id: "f1",
        type: "continuity",
        severity: "medium",
        confidence: "high",
        location: { chapterId: "c1", textAnchor: "the river" },
        issue: "Timeline slip",
        whyItMatters: "Breaks continuity",
        evidence: ["the river"],
        suggestedFix: "Align the timing"
      }
    ],
    notes: [],
    warnings: [],
    generatedAt: new Date().toISOString(),
    ...overrides
  };
}

describe("refineReviewResult", () => {
  it("keeps grounded evidence and success status", () => {
    const refined = refineReviewResult(baseResult(), "She walked to the river at dawn.");
    expect(refined.findings).toHaveLength(1);
    expect(refined.findings[0]?.confidence).toBe("high");
    expect(refined.status).toBe("success");
  });

  it("demotes confidence when evidence is missing from chapter text", () => {
    const refined = refineReviewResult(baseResult(), "She walked to the market at dawn.");
    expect(refined.findings[0]?.confidence).toBe("medium");
    expect(refined.status).toBe("partial");
    expect(refined.warnings.length).toBeGreaterThan(0);
  });

  it("drops low-signal placeholder findings", () => {
    const refined = refineReviewResult(
      baseResult({
        findings: [
          {
            id: "f1",
            type: "consistency",
            severity: "medium",
            confidence: "medium",
            location: { chapterId: "c1", textAnchor: "N/A" },
            issue: "Issue not specified",
            whyItMatters: "Potential narrative impact.",
            evidence: [],
            suggestedFix: "Clarify this passage for consistency."
          }
        ]
      }),
      "Any chapter text"
    );

    expect(refined.findings).toHaveLength(0);
    expect(refined.status).toBe("partial");
  });
});

describe("normalizeFindingType", () => {
  it("maps free text to closed enum values", () => {
    expect(normalizeFindingType("Character Voice")).toBe("character");
    expect(normalizeFindingType("temporal drift")).toBe("timeline");
    expect(normalizeFindingType("unknown-tag")).toBe("consistency");
  });
});
