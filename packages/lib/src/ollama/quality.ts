import type { ReviewResultParsed } from "../schemas";

const FINDING_TYPES = [
  "continuity",
  "character",
  "timeline",
  "chapter",
  "pacing",
  "clarity",
  "consistency"
] as const;

type FindingType = (typeof FINDING_TYPES)[number];

export function refineReviewResult(
  result: ReviewResultParsed,
  chapterText: string
): ReviewResultParsed {
  const warnings = [...result.warnings];
  const refinedFindings = [];

  for (const finding of result.findings) {
    const type = normalizeFindingType(finding.type);
    const issue = finding.issue.trim();
    const textAnchor = finding.location.textAnchor.trim();
    const evidence = finding.evidence.map((item) => item.trim()).filter(Boolean);

    const inventedIssue = !issue || /^issue not specified$/i.test(issue);
    const inventedAnchor = !textAnchor || /^n\/a$/i.test(textAnchor);
    const emptyEvidence = evidence.length === 0;

    if (inventedIssue && inventedAnchor && emptyEvidence) {
      warnings.push(`Dropped low-signal finding ${finding.id}: missing issue, anchor, and evidence.`);
      continue;
    }

    let confidence = finding.confidence;
    const groundedEvidence = evidence.filter((item) => includesIgnoreCase(chapterText, item));
    const ungroundedCount = evidence.length - groundedEvidence.length;

    if (emptyEvidence) {
      confidence = demoteConfidence(confidence);
      warnings.push(`Finding ${finding.id} has no evidence quotes.`);
    } else if (ungroundedCount > 0) {
      confidence = demoteConfidence(confidence);
      warnings.push(
        `Finding ${finding.id}: ${ungroundedCount} evidence quote(s) not found in chapter text.`
      );
    }

    if (inventedIssue || inventedAnchor) {
      confidence = demoteConfidence(confidence);
      warnings.push(`Finding ${finding.id} used placeholder issue/anchor values.`);
    }

    refinedFindings.push({
      ...finding,
      type,
      confidence,
      issue: inventedIssue ? "Issue details incomplete." : issue,
      location: {
        ...finding.location,
        textAnchor: inventedAnchor ? "unspecified" : textAnchor
      },
      evidence: groundedEvidence.length > 0 ? groundedEvidence : evidence
    });
  }

  const high = refinedFindings.filter((item) => item.severity === "high").length;
  const medium = refinedFindings.filter((item) => item.severity === "medium").length;
  const low = refinedFindings.filter((item) => item.severity === "low").length;
  const hadQualityIssues = warnings.length > result.warnings.length;
  const status =
    result.status === "error"
      ? "error"
      : hadQualityIssues || refinedFindings.length < result.findings.length
        ? "partial"
        : result.status;

  return {
    ...result,
    status,
    findings: refinedFindings,
    warnings,
    summary: {
      overallAssessment: result.summary.overallAssessment,
      issueCount: refinedFindings.length,
      highSeverityCount: high,
      mediumSeverityCount: medium,
      lowSeverityCount: low
    }
  };
}

export function normalizeFindingType(value: string): FindingType {
  const normalized = value.trim().toLowerCase();
  if ((FINDING_TYPES as readonly string[]).includes(normalized)) {
    return normalized as FindingType;
  }
  if (normalized.includes("character") || normalized.includes("voice")) return "character";
  if (normalized.includes("timeline") || normalized.includes("temporal") || normalized.includes("chronolog")) {
    return "timeline";
  }
  if (normalized.includes("continuit") || normalized.includes("consisten")) return "continuity";
  if (normalized.includes("pacing") || normalized.includes("tempo")) return "pacing";
  if (normalized.includes("clarity") || normalized.includes("confus")) return "clarity";
  if (normalized.includes("chapter") || normalized.includes("scene")) return "chapter";
  return "consistency";
}

function demoteConfidence(value: "low" | "medium" | "high"): "low" | "medium" | "high" {
  if (value === "high") return "medium";
  if (value === "medium") return "low";
  return "low";
}

function includesIgnoreCase(haystack: string, needle: string): boolean {
  if (!needle.trim()) {
    return false;
  }
  return haystack.toLowerCase().includes(needle.toLowerCase());
}
