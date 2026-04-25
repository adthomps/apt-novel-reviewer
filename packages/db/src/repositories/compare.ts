import { randomUUID } from "node:crypto";
import { compareFindings } from "@apt/lib";
import { getDb } from "../index";

interface FindingComparable {
  id: string;
  findingType: string;
  chapterId: string;
  issue: string;
}

export function compareVersionFindings(projectId: string, fromVersionId: string, toVersionId: string) {
  const previous = listFindingsForVersion(projectId, fromVersionId);
  const current = listFindingsForVersion(projectId, toVersionId);

  const result = compareFindings(
    previous.map(mapComparable),
    current.map(mapComparable)
  );

  const payload = {
    resolved: result.resolved,
    still: result.still,
    new: result.new
  };

  getDb()
    .prepare(
      `INSERT OR REPLACE INTO version_comparisons (id, projectId, fromVersionId, toVersionId, generatedAt, comparison)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(randomUUID(), projectId, fromVersionId, toVersionId, Date.now(), JSON.stringify(payload));

  return payload;
}

function listFindingsForVersion(projectId: string, versionId: string): FindingComparable[] {
  return getDb()
    .prepare(
      `SELECT f.id, f.findingType, f.chapterId, f.issue
       FROM findings f
       INNER JOIN review_runs rr ON rr.id = f.reviewRunId
       WHERE rr.versionId = ? AND f.projectId = ?`
    )
    .all(versionId, projectId) as FindingComparable[];
}

function mapComparable(item: FindingComparable) {
  return {
    id: item.id,
    type: item.findingType,
    chapterId: item.chapterId,
    issue: item.issue
  };
}
