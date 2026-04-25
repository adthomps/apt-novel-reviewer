import { jsonrepair } from "jsonrepair";
import { ReviewResultSchema, type ReviewResultParsed } from "../schemas";

export interface ParseResult {
  success: boolean;
  data?: ReviewResultParsed;
  errors: string[];
}

export interface ParseDefaults {
  templateId?: string;
  reviewType?: string;
  model?: string;
}

export function parseReviewResult(rawText: string, defaults?: ParseDefaults): ParseResult {
  const extracted = extractJson(rawText);
  if (!extracted) {
    return { success: false, errors: ["No JSON payload found"] };
  }

  try {
    return validatePayload(JSON.parse(extracted), defaults);
  } catch (error) {
    try {
      const repaired = jsonrepair(extracted);
      return validatePayload(JSON.parse(repaired), defaults);
    } catch {
      // fall through to original syntax error
    }

    return {
      success: false,
      errors: [error instanceof Error ? error.message : "Invalid JSON"]
    };
  }
}

function validatePayload(parsed: unknown, defaults?: ParseDefaults): ParseResult {
  const normalized = normalizeReviewPayload(parsed, defaults);
  const validated = ReviewResultSchema.safeParse(normalized);
  if (!validated.success) {
    const errors = validated.error.errors.map((issue) => `${issue.path.join(".")}: ${issue.message}`);
    return { success: false, errors };
  }

  return { success: true, data: validated.data, errors: [] };
}

function extractJson(value: string): string | null {
  const trimmed = value.trim();
  const fence = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fence?.[1]) {
    return fence[1].trim();
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  return null;
}

function normalizeReviewPayload(input: unknown, defaults?: ParseDefaults): unknown {
  if (!isRecord(input)) {
    return input;
  }

  const findings = normalizeFindings(input.findings);
  const summary = normalizeSummary(input.summary, findings);

  return {
    ...input,
    templateId: asNonEmptyString(input.templateId, defaults?.templateId ?? "unknown_template"),
    reviewType: asNonEmptyString(input.reviewType, defaults?.reviewType ?? "unknown_review"),
    model: asNonEmptyString(input.model, defaults?.model ?? "gpt-oss:20b"),
    status: normalizeStatus(input.status),
    findings,
    summary,
    notes: normalizeStringArray(input.notes),
    warnings: normalizeStringArray(input.warnings),
    generatedAt: normalizeGeneratedAt(input.generatedAt)
  };
}

function normalizeFindings(value: unknown): unknown[] {
  const rawItems = Array.isArray(value) ? value : isRecord(value) ? [value] : [];

  return rawItems
    .map((item, index) => normalizeFinding(item, index))
    .filter((item): item is Record<string, unknown> => Boolean(item));
}

function normalizeFinding(value: unknown, index: number): Record<string, unknown> | null {
  if (!isRecord(value)) {
    return null;
  }

  const location = isRecord(value.location) ? value.location : {};
  const severity = normalizeLevel(value.severity);
  const confidence = normalizeLevel(value.confidence);
  const issue = asNonEmptyString(value.issue, "Issue not specified");
  const type = asNonEmptyString(value.type, "consistency");

  return {
    ...value,
    id: asNonEmptyString(value.id, `finding_${index + 1}`),
    type,
    severity,
    confidence,
    location: {
      chapterId: asNonEmptyString(location.chapterId, "unknown-chapter"),
      textAnchor: asNonEmptyString(location.textAnchor, "N/A")
    },
    issue,
    whyItMatters: asNonEmptyString(value.whyItMatters, "Potential narrative impact."),
    evidence: normalizeStringArray(value.evidence),
    suggestedFix: asNonEmptyString(value.suggestedFix, "Clarify this passage for consistency."),
    status: normalizeFindingStatus(value.status)
  };
}

function normalizeSummary(value: unknown, findings: unknown[]): Record<string, unknown> {
  const summary = isRecord(value) ? value : {};
  const low = findings.filter((item) => isRecord(item) && item.severity === "low").length;
  const medium = findings.filter((item) => isRecord(item) && item.severity === "medium").length;
  const high = findings.filter((item) => isRecord(item) && item.severity === "high").length;

  return {
    overallAssessment: asString(summary.overallAssessment, findings.length > 0 ? "Issues detected." : "No issues detected."),
    issueCount: asNonNegativeInteger(summary.issueCount, findings.length),
    highSeverityCount: asNonNegativeInteger(summary.highSeverityCount, high),
    mediumSeverityCount: asNonNegativeInteger(summary.mediumSeverityCount, medium),
    lowSeverityCount: asNonNegativeInteger(summary.lowSeverityCount, low)
  };
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (typeof value === "string") {
    return [value];
  }
  return [];
}

function normalizeGeneratedAt(value: unknown): string {
  const text = asString(value, "");
  if (!text) {
    return new Date().toISOString();
  }
  const date = new Date(text);
  return Number.isNaN(date.valueOf()) ? new Date().toISOString() : date.toISOString();
}

function normalizeLevel(value: unknown): "low" | "medium" | "high" {
  const normalized = asString(value, "").toLowerCase();
  if (normalized === "low" || normalized === "medium" || normalized === "high") {
    return normalized;
  }
  return "medium";
}

function normalizeStatus(value: unknown): "success" | "partial" | "error" {
  const normalized = asString(value, "").toLowerCase();
  if (normalized === "success" || normalized === "partial" || normalized === "error") {
    return normalized;
  }
  return "partial";
}

function normalizeFindingStatus(value: unknown): "new" | "still" | "resolved" | undefined {
  const normalized = asString(value, "").toLowerCase();
  if (normalized === "new" || normalized === "still" || normalized === "resolved") {
    return normalized;
  }
  return undefined;
}

function asString(value: unknown, fallback: string): string {
  if (typeof value === "string") {
    return value;
  }
  if (value == null) {
    return fallback;
  }
  return String(value);
}

function asNonEmptyString(value: unknown, fallback: string): string {
  const text = asString(value, fallback).trim();
  return text.length > 0 ? text : fallback;
}

function asNonNegativeInteger(value: unknown, fallback: number): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.floor(value));
  }
  return Math.max(0, Math.floor(fallback));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
