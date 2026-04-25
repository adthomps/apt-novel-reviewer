import fs from "node:fs";
import path from "node:path";
import { app, dialog, ipcMain } from "electron";
import { RunReviewInputSchema } from "@apt/lib";
import { compareRepo, reviewRepo, versionRepo } from "@apt/db";
import { IPC } from "../../shared/ipc";
import { runReview } from "../services/review";

export function registerReviewIpc() {
  ipcMain.handle(IPC.reviewStart, async (_event, input: unknown) => {
    const parsed = RunReviewInputSchema.parse(input);
    const run = reviewRepo.createReviewRun({
      projectId: parsed.projectId,
      versionId: parsed.versionId,
      reviewType: parsed.reviewType,
      model: "gpt-oss:20b"
    });

    try {
      const chapter = selectChapter(parsed.versionId, parsed.chapterId);
      const result = await runReview(parsed.reviewType, chapter);
      if (!result.success || !result.data) {
        reviewRepo.failReviewRun(run.id, result.errors.join("; "));
        return { runId: run.id, status: "error", errors: result.errors };
      }

      reviewRepo.completeReviewRun(run.id, result.data);
      return { runId: run.id, status: result.data.status };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown review error";
      reviewRepo.failReviewRun(run.id, message);
      return { runId: run.id, status: "error", errors: [message] };
    }
  });

  ipcMain.handle(IPC.findingsList, async (_event, projectId: string) => reviewRepo.listFindingsByProject(projectId));

  ipcMain.handle(
    IPC.findingsExport,
    async (
      _event,
      input: {
        projectId: string;
        format: "json" | "csv";
        activeVersionLabel: string;
        findings: Array<{
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
    ) => {
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const ext = input.format === "csv" ? "csv" : "json";
      const suggestedName = `findings-${input.projectId}-${timestamp}.${ext}`;
      const documents = app.getPath("documents");

      const save = await dialog.showSaveDialog({
        title: "Export Findings",
        defaultPath: path.join(documents, suggestedName),
        filters:
          input.format === "csv"
            ? [{ name: "CSV", extensions: ["csv"] }]
            : [{ name: "JSON", extensions: ["json"] }]
      });

      if (save.canceled || !save.filePath) {
        return { ok: true as const, canceled: true as const };
      }

      const content =
        input.format === "csv"
          ? toFindingsCsv(input.findings)
          : JSON.stringify(
              {
                exportedAt: new Date().toISOString(),
                projectId: input.projectId,
                activeVersion: input.activeVersionLabel,
                count: input.findings.length,
                findings: input.findings.map((finding) => ({
                  ...finding,
                  evidence: parseEvidenceArray(finding.evidence)
                }))
              },
              null,
              2
            );

      fs.writeFileSync(save.filePath, content, "utf8");
      return { ok: true as const, canceled: false as const, filePath: save.filePath };
    }
  );

  ipcMain.handle(IPC.findingUpdateStatus, async (_event, findingId: string, status: "new" | "still" | "resolved") => {
    reviewRepo.updateFindingStatus(findingId, status);
    return { ok: true };
  });

  ipcMain.handle(IPC.reviewRunsList, async (_event, versionId: string) => reviewRepo.listReviewRunsByVersion(versionId));

  ipcMain.handle(IPC.reviewRunDelete, async (_event, runId: string) => {
    const deletedCount = reviewRepo.deleteReviewRun(runId);
    return { ok: true, deletedCount };
  });

  ipcMain.handle(
    IPC.reviewRunsDeleteByStatus,
    async (_event, versionId: string, statuses: Array<"success" | "partial" | "error">) => {
      const deletedCount = reviewRepo.deleteReviewRunsByVersionAndStatus(versionId, statuses ?? []);
      return { ok: true, deletedCount };
    }
  );

  ipcMain.handle(
    IPC.compareVersions,
    async (_event, projectId: string, fromVersionId: string, toVersionId: string) =>
      compareRepo.compareVersionFindings(projectId, fromVersionId, toVersionId)
  );
}

function toFindingsCsv(
  findings: Array<{
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
  }>
): string {
  const headers = [
    "id",
    "reviewRunId",
    "chapterId",
    "reviewType",
    "findingType",
    "severity",
    "confidence",
    "textAnchor",
    "issue",
    "whyItMatters",
    "evidence",
    "suggestedFix",
    "status"
  ];

  const lines = findings.map((finding) => {
    const evidence = parseEvidenceArray(finding.evidence).join(" | ");
    const cells = [
      finding.id,
      finding.reviewRunId,
      finding.chapterId,
      finding.reviewType,
      finding.findingType,
      finding.severity,
      finding.confidence,
      finding.textAnchor,
      finding.issue,
      finding.whyItMatters,
      evidence,
      finding.suggestedFix,
      finding.status
    ];
    return cells.map(escapeCsv).join(",");
  });

  return [headers.join(","), ...lines].join("\n");
}

function escapeCsv(value: string): string {
  const raw = value ?? "";
  if (/[",\n\r]/.test(raw)) {
    return `"${raw.replace(/"/g, '""')}"`;
  }
  return raw;
}

function parseEvidenceArray(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((item) => String(item));
    }
    return [String(parsed)];
  } catch {
    return raw ? [raw] : [];
  }
}

function selectChapter(versionId: string, chapterId?: string) {
  const chapters = versionRepo.listChapters(versionId);
  if (chapters.length === 0) {
    throw new Error("No chapters detected");
  }

  if (chapterId) {
    const chapter = chapters.find((item) => item.id === chapterId);
    if (!chapter) {
      throw new Error("Selected chapter not found");
    }
    return chapter;
  }

  return chapters[0];
}
