import { describe, expect, it } from "vitest";
import { parseReviewResult } from "./parser";

describe("parseReviewResult", () => {
  it("parses valid JSON payload", () => {
    const json = JSON.stringify({
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
          location: { chapterId: "c1", textAnchor: "line" },
          issue: "Issue",
          whyItMatters: "Impact",
          evidence: ["A"],
          suggestedFix: "Fix"
        }
      ],
      notes: [],
      warnings: [],
      generatedAt: new Date().toISOString()
    });

    const result = parseReviewResult(json);
    expect(result.success).toBe(true);
    expect(result.data?.templateId).toBe("chapter_review");
  });

  it("normalizes a single finding object into array", () => {
    const json = JSON.stringify({
      templateId: "character_review",
      reviewType: "character_review",
      status: "success",
      model: "gpt-oss:20b",
      summary: {
        overallAssessment: "ok",
        issueCount: 1,
        highSeverityCount: 0,
        mediumSeverityCount: 1,
        lowSeverityCount: 0
      },
      findings: {
        id: "f1",
        type: "character",
        severity: "medium",
        confidence: "high",
        location: { chapterId: "c1", textAnchor: "line" },
        issue: "Issue",
        whyItMatters: "Impact",
        evidence: ["A"],
        suggestedFix: "Fix"
      },
      notes: [],
      warnings: [],
      generatedAt: new Date().toISOString()
    });

    const result = parseReviewResult(json);
    expect(result.success).toBe(true);
    expect(result.data?.findings).toHaveLength(1);
    expect(result.data?.findings[0]?.type).toBe("character");
  });

  it("fills missing fields with safe defaults", () => {
    const json = JSON.stringify({
      templateId: "character_review",
      reviewType: "character_review",
      model: "gpt-oss:20b",
      findings: {
        issue: "Only one issue",
        location: { chapterId: "ch1" }
      },
      notes: "single note",
      warnings: "single warning"
    });

    const result = parseReviewResult(json);
    expect(result.success).toBe(true);
    expect(result.data?.status).toBe("partial");
    expect(result.data?.findings).toHaveLength(1);
    expect(result.data?.findings[0]?.severity).toBe("medium");
    expect(result.data?.findings[0]?.location.textAnchor).toBe("N/A");
    expect(result.data?.notes).toEqual(["single note"]);
    expect(result.data?.warnings).toEqual(["single warning"]);
  });

  it("uses caller defaults when templateId/reviewType/model are missing", () => {
    const json = JSON.stringify({
      status: "success",
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
          type: "character",
          severity: "medium",
          confidence: "high",
          location: { chapterId: "c1", textAnchor: "line" },
          issue: "Issue",
          whyItMatters: "Impact",
          evidence: ["A"],
          suggestedFix: "Fix"
        }
      ],
      notes: [],
      warnings: [],
      generatedAt: new Date().toISOString()
    });

    const result = parseReviewResult(json, {
      templateId: "chapter_review",
      reviewType: "chapter_review",
      model: "gpt-oss:20b"
    });

    expect(result.success).toBe(true);
    expect(result.data?.templateId).toBe("chapter_review");
    expect(result.data?.reviewType).toBe("chapter_review");
    expect(result.data?.model).toBe("gpt-oss:20b");
  });

  it("repairs malformed JSON syntax (missing comma in array/object)", () => {
    const malformed = `{
      "templateId": "chapter_review",
      "reviewType": "chapter_review",
      "status": "success",
      "model": "gpt-oss:20b",
      "summary": {
        "overallAssessment": "ok",
        "issueCount": 1,
        "highSeverityCount": 0,
        "mediumSeverityCount": 1,
        "lowSeverityCount": 0
      },
      "findings": [
        {
          "id": "f1",
          "type": "continuity",
          "severity": "medium",
          "confidence": "high",
          "location": { "chapterId": "c1", "textAnchor": "line" },
          "issue": "Issue",
          "whyItMatters": "Impact",
          "evidence": ["A" "B"],
          "suggestedFix": "Fix"
        }
      ],
      "notes": [],
      "warnings": [],
      "generatedAt": "2026-03-30T00:00:00.000Z"
    }`;

    const result = parseReviewResult(malformed);
    expect(result.success).toBe(true);
    expect(result.data?.findings[0]?.evidence).toEqual(["A", "B"]);
  });
});
