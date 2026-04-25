import { randomUUID } from "node:crypto";
import type { Finding, ReviewMode, ReviewResult, ReviewRun } from "@apt/types";
import { getDb } from "../index";

export function createReviewRun(input: {
  projectId: string;
  versionId: string;
  reviewType: ReviewMode;
  model: string;
}): ReviewRun {
  const run: ReviewRun = {
    id: randomUUID(),
    projectId: input.projectId,
    versionId: input.versionId,
    templateId: input.reviewType,
    reviewType: input.reviewType,
    model: input.model,
    status: "running",
    startedAt: Date.now(),
    completedAt: null,
    errorMessage: null
  };

  getDb()
    .prepare(
      `INSERT INTO review_runs (id, projectId, versionId, templateId, reviewType, model, status, startedAt, completedAt, errorMessage)
       VALUES (@id, @projectId, @versionId, @templateId, @reviewType, @model, @status, @startedAt, @completedAt, @errorMessage)`
    )
    .run(run);

  return run;
}

export function completeReviewRun(runId: string, result: ReviewResult): void {
  const db = getDb();
  const doneAt = Date.now();

  const run = db.prepare("SELECT * FROM review_runs WHERE id = ?").get(runId) as ReviewRun | undefined;
  if (!run) {
    throw new Error("Review run not found");
  }

  const tx = db.transaction(() => {
    db.prepare("UPDATE review_runs SET status = ?, completedAt = ? WHERE id = ?").run(result.status, doneAt, runId);

    const insertFinding = db.prepare(
      `INSERT INTO findings (
        id, reviewRunId, chapterId, projectId, findingType, severity, confidence, textAnchor,
        issue, whyItMatters, evidence, suggestedFix, status, createdAt, resolvedAt
      ) VALUES (
        @id, @reviewRunId, @chapterId, @projectId, @findingType, @severity, @confidence, @textAnchor,
        @issue, @whyItMatters, @evidence, @suggestedFix, @status, @createdAt, @resolvedAt
      )`
    );

    result.findings.forEach((finding, index) => {
      insertFinding.run(toFindingRow(run, runId, finding, index));
    });
  });

  tx();
}

export function failReviewRun(runId: string, message: string): void {
  getDb()
    .prepare("UPDATE review_runs SET status = 'error', completedAt = ?, errorMessage = ? WHERE id = ?")
    .run(Date.now(), message, runId);
}

export function listFindingsByProject(projectId: string): Array<{
  id: string;
  reviewRunId: string;
  reviewType: string;
  chapterId: string;
  findingType: string;
  severity: string;
  confidence: string;
  textAnchor: string;
  issue: string;
  whyItMatters: string;
  evidence: string;
  suggestedFix: string;
  status: string;
}> {
  return getDb()
    .prepare(
      `SELECT
        f.id,
        f.reviewRunId,
        rr.reviewType AS reviewType,
        f.chapterId,
        f.findingType,
        f.severity,
        f.confidence,
        f.textAnchor,
        f.issue,
        f.whyItMatters,
        f.evidence,
        f.suggestedFix,
        f.status
       FROM findings f
       LEFT JOIN review_runs rr ON rr.id = f.reviewRunId
       WHERE f.projectId = ?
       ORDER BY f.createdAt DESC`
    )
    .all(projectId) as Array<{
    id: string;
    reviewRunId: string;
    reviewType: string;
    chapterId: string;
    findingType: string;
    severity: string;
    confidence: string;
    textAnchor: string;
    issue: string;
    whyItMatters: string;
    evidence: string;
    suggestedFix: string;
    status: string;
  }>;
}

export function updateFindingStatus(
  findingId: string,
  status: "new" | "still" | "resolved"
): void {
  const resolvedAt = status === "resolved" ? Date.now() : null;
  getDb().prepare("UPDATE findings SET status = ?, resolvedAt = ? WHERE id = ?").run(status, resolvedAt, findingId);
}

export function listReviewRunsByVersion(versionId: string): Array<{
  id: string;
  versionId: string;
  reviewType: string;
  model: string;
  status: string;
  startedAt: number;
  completedAt: number | null;
  errorMessage: string | null;
}> {
  return getDb()
    .prepare(
      `SELECT id, versionId, reviewType, model, status, startedAt, completedAt, errorMessage
       FROM review_runs WHERE versionId = ? ORDER BY startedAt DESC`
    )
    .all(versionId) as Array<{
    id: string;
    versionId: string;
    reviewType: string;
    model: string;
    status: string;
    startedAt: number;
    completedAt: number | null;
    errorMessage: string | null;
  }>;
}

export function deleteReviewRun(runId: string): number {
  const result = getDb().prepare("DELETE FROM review_runs WHERE id = ?").run(runId);
  return result.changes;
}

export function deleteReviewRunsByVersionAndStatus(
  versionId: string,
  statuses: Array<"success" | "partial" | "error">
): number {
  if (statuses.length === 0) {
    return 0;
  }

  const placeholders = statuses.map(() => "?").join(", ");
  const result = getDb()
    .prepare(`DELETE FROM review_runs WHERE versionId = ? AND status IN (${placeholders})`)
    .run(versionId, ...statuses);
  return result.changes;
}

function toFindingRow(run: ReviewRun, runId: string, finding: Finding, findingIndex: number) {
  const sourceId = (finding.id || "").trim();
  const uniqueId = sourceId ? `${runId}:${sourceId}:${findingIndex}` : `${runId}:${findingIndex}:${randomUUID()}`;

  return {
    id: uniqueId,
    reviewRunId: runId,
    chapterId: finding.location.chapterId,
    projectId: run.projectId,
    findingType: finding.type,
    severity: finding.severity,
    confidence: finding.confidence,
    textAnchor: finding.location.textAnchor,
    issue: finding.issue,
    whyItMatters: finding.whyItMatters,
    evidence: JSON.stringify(finding.evidence),
    suggestedFix: finding.suggestedFix,
    status: finding.status ?? "new",
    createdAt: Date.now(),
    resolvedAt: null
  };
}
