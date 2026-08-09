import { useEffect, useMemo, useState } from "react";
import type { ReviewMode } from "@apt/types";
import { Badge, Button, Card } from "@apt/ui";

const MODE_OPTIONS: Array<{ value: ReviewMode; label: string; description: string }> = [
  {
    value: "chapter_review",
    label: "Chapter review",
    description: "Clarity, pacing, and local narrative consistency in one chapter."
  },
  {
    value: "continuity_review",
    label: "Continuity review",
    description: "Contradictions against prior chapters and internal logic."
  },
  {
    value: "character_review",
    label: "Character review",
    description: "Voice and behavior consistency using canon character notes."
  },
  {
    value: "timeline_review",
    label: "Timeline review",
    description: "Temporal sequencing using prior chapters and timeline notes."
  }
];

interface ChapterLite {
  id: string;
  chapterNumber: number;
  title: string;
}

interface RunSummary {
  overallAssessment: string;
  issueCount: number;
  highSeverityCount: number;
  mediumSeverityCount: number;
  lowSeverityCount: number;
}

export function ReviewCenterPage(props: {
  projectId: string | null;
  versionId: string | null;
  activeVersionLabel: string;
  chapters: ChapterLite[];
  onNavigateToFindings: () => void;
  onReviewCompleted: () => Promise<void>;
}) {
  const [mode, setMode] = useState<ReviewMode>("chapter_review");
  const [chapterId, setChapterId] = useState<string>("");
  const [reviewAll, setReviewAll] = useState(false);
  const [rawResult, setRawResult] = useState<string>("");
  const [showRaw, setShowRaw] = useState(false);
  const [lastSummary, setLastSummary] = useState<RunSummary | null>(null);
  const [lastWarnings, setLastWarnings] = useState<string[]>([]);
  const [lastStatus, setLastStatus] = useState<string | null>(null);
  const [batchProgress, setBatchProgress] = useState<{ current: number; total: number } | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isCleaning, setIsCleaning] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ tone: "success" | "error"; text: string } | null>(null);
  const [confirmDeleteRunId, setConfirmDeleteRunId] = useState<string | null>(null);
  const [confirmDeleteStatuses, setConfirmDeleteStatuses] = useState<Array<"success" | "partial" | "error"> | null>(
    null
  );
  const [runs, setRuns] = useState<
    Array<{
      id: string;
      reviewType: string;
      model: string;
      status: string;
      startedAt: number;
      completedAt: number | null;
      errorMessage: string | null;
      summaryJson: string | null;
      warningsJson: string | null;
    }>
  >([]);

  const modeMeta = useMemo(() => MODE_OPTIONS.find((item) => item.value === mode) ?? MODE_OPTIONS[0], [mode]);

  useEffect(() => {
    if (!chapterId && props.chapters[0]) {
      setChapterId(props.chapters[0].id);
    } else if (chapterId && !props.chapters.some((chapter) => chapter.id === chapterId)) {
      setChapterId(props.chapters[0]?.id ?? "");
    }
  }, [chapterId, props.chapters]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const timer = setInterval(() => {
      setElapsedSeconds((value) => value + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (!props.versionId) {
      setRuns([]);
      return;
    }
    void loadRuns(props.versionId);
  }, [props.versionId]);

  useEffect(() => {
    if (!props.versionId) {
      return;
    }

    const refresh = () => {
      if (!props.versionId) return;
      void loadRuns(props.versionId);
    };

    const onFocus = () => refresh();
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refresh();
      }
    };

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);
    const interval = window.setInterval(refresh, 5000);

    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.clearInterval(interval);
    };
  }, [props.versionId]);

  async function loadRuns(versionId: string) {
    const nextRuns = await window.aptApi.reviews.listRuns(versionId);
    setRuns(nextRuns);
    return nextRuns;
  }

  async function runSingle(selectedChapterId: string, reviewType: ReviewMode) {
    if (!props.projectId || !props.versionId) {
      throw new Error("Select a project and version first.");
    }

    return window.aptApi.reviews.start({
      projectId: props.projectId,
      versionId: props.versionId,
      reviewType,
      chapterId: selectedChapterId
    });
  }

  async function run() {
    if (!props.projectId || !props.versionId || isRunning) return;
    if (!reviewAll && !chapterId) {
      setLastError("Select a chapter to review.");
      return;
    }

    try {
      setIsRunning(true);
      setElapsedSeconds(0);
      setLastError(null);
      setActionMessage(null);
      setBatchProgress(null);

      const targets = reviewAll ? props.chapters.map((chapter) => chapter.id) : [chapterId];
      let lastResult: Awaited<ReturnType<typeof runSingle>> | null = null;
      let totalFindings = 0;
      const allWarnings: string[] = [];

      for (let index = 0; index < targets.length; index += 1) {
        const targetId = targets[index];
        setBatchProgress({ current: index + 1, total: targets.length });
        lastResult = await runSingle(targetId, mode);
        if (lastResult.status === "error") {
          setLastError((lastResult.errors ?? ["Review run failed"]).join("; "));
          break;
        }
        totalFindings += lastResult.findingCount ?? 0;
        allWarnings.push(...(lastResult.warnings ?? []));
        if (lastResult.summary) {
          setLastSummary(lastResult.summary);
        }
        setLastStatus(lastResult.status);
      }

      if (lastResult) {
        setRawResult(JSON.stringify(lastResult, null, 2));
        setLastWarnings(allWarnings);
        if (lastResult.status !== "error") {
          setActionMessage({
            tone: "success",
            text:
              targets.length > 1
                ? `Finished ${targets.length} chapter reviews · ${totalFindings} findings.`
                : `Review complete · ${totalFindings} findings.`
          });
        }
      }

      await props.onReviewCompleted();
      await loadRuns(props.versionId);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Review failed.";
      setLastError(detail);
      setActionMessage({ tone: "error", text: detail });
    } finally {
      setIsRunning(false);
      setBatchProgress(null);
    }
  }

  async function retryFailedRun(reviewType: string) {
    if (!props.projectId || !props.versionId || isRunning) return;
    const targetChapterId = chapterId || props.chapters[0]?.id;
    if (!targetChapterId) {
      setLastError("No chapter available to retry.");
      return;
    }

    try {
      setIsRunning(true);
      setElapsedSeconds(0);
      setLastError(null);
      setActionMessage(null);
      const result = await runSingle(targetChapterId, reviewType as ReviewMode);

      if (result.status === "error") {
        setLastError((result.errors ?? ["Retry failed"]).join("; "));
      } else {
        setLastSummary(result.summary ?? null);
        setLastWarnings(result.warnings ?? []);
        setLastStatus(result.status);
        setActionMessage({
          tone: "success",
          text: `Retry complete · ${result.findingCount ?? 0} findings.`
        });
      }

      setRawResult(JSON.stringify(result, null, 2));
      await props.onReviewCompleted();
      await loadRuns(props.versionId);
    } finally {
      setIsRunning(false);
    }
  }

  async function deleteRun(runId: string) {
    if (!props.versionId || isRunning || isCleaning) return;
    setIsCleaning(true);
    try {
      const result = await window.aptApi.reviews.deleteRun(runId);
      await props.onReviewCompleted();
      const refreshedRuns = await loadRuns(props.versionId);

      const removedFromList = !refreshedRuns.some((run) => run.id === runId);
      const deletedCount = typeof result.deletedCount === "number" ? result.deletedCount : removedFromList ? 1 : 0;

      if (!deletedCount) {
        throw new Error("No review run was deleted. Refresh and try again.");
      }

      setRawResult(JSON.stringify({ ok: true, deletedRunId: runId, deletedCount }, null, 2));
      setActionMessage({ tone: "success", text: "Review run deleted successfully." });
      setConfirmDeleteRunId(null);
      setLastError(null);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Failed to delete review run.";
      setLastError(detail);
      setActionMessage({ tone: "error", text: detail });
    } finally {
      setIsCleaning(false);
    }
  }

  async function deleteRunsByStatus(statuses: Array<"success" | "partial" | "error">) {
    if (!props.versionId || isRunning || isCleaning || statuses.length === 0) return;

    setIsCleaning(true);
    try {
      const result = await window.aptApi.reviews.deleteRunsByStatus(props.versionId, statuses);
      await props.onReviewCompleted();
      await loadRuns(props.versionId);
      setRawResult(JSON.stringify(result, null, 2));
      setConfirmDeleteStatuses(null);
      setLastError(null);
      setActionMessage({
        tone: "success",
        text:
          result.deletedCount > 0
            ? `Deleted ${result.deletedCount} review run(s).`
            : "No review runs matched that cleanup filter."
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Failed to delete review runs.";
      setLastError(detail);
      setActionMessage({ tone: "error", text: detail });
    } finally {
      setIsCleaning(false);
    }
  }

  function requestDeleteRun(runId: string) {
    if (isRunning || isCleaning || !props.versionId) return;
    setConfirmDeleteRunId(runId);
    setConfirmDeleteStatuses(null);
  }

  function requestDeleteByStatus(statuses: Array<"success" | "partial" | "error">) {
    if (isRunning || isCleaning || !props.versionId || statuses.length === 0) return;
    setConfirmDeleteStatuses(statuses);
    setConfirmDeleteRunId(null);
  }

  return (
    <Card title="Review Center" className="space-y-3">
      <p className="text-xs text-slate-400">Reviewing version: {props.activeVersionLabel}</p>
      {isRunning ? (
        <div className="rounded-lg border border-emerald-700/60 bg-emerald-950/20 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm font-semibold text-emerald-300 apt-busy-pulse">
              {batchProgress ? `Reviewing chapter ${batchProgress.current} of ${batchProgress.total}` : "Review in progress"}
            </p>
            <Badge tone="success">{formatElapsed(elapsedSeconds)}</Badge>
          </div>
          <div className="h-2 w-full overflow-hidden rounded bg-slate-900">
            <div className="apt-busy-stripe h-full w-full" />
          </div>
          <p className="mt-2 text-xs text-emerald-200/80">Keep this page open while the model analyzes the manuscript.</p>
        </div>
      ) : null}

      {lastError ? (
        <div className="rounded-lg border border-rose-700/60 bg-rose-950/20 p-3 text-xs text-rose-300">{lastError}</div>
      ) : null}
      {actionMessage ? (
        <div
          className={`rounded-lg border p-3 text-xs ${
            actionMessage.tone === "success"
              ? "border-emerald-700/60 bg-emerald-950/20 text-emerald-300"
              : "border-rose-700/60 bg-rose-950/20 text-rose-300"
          }`}
        >
          {actionMessage.text}
        </div>
      ) : null}

      <div className="grid gap-2 md:grid-cols-2">
        <div className="space-y-1">
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value as ReviewMode)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            disabled={!props.projectId || !props.versionId || isRunning}
          >
            {MODE_OPTIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-slate-500">{modeMeta.description}</p>
        </div>
        <div className="space-y-1">
          <select
            value={chapterId}
            onChange={(event) => setChapterId(event.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
            disabled={!props.projectId || !props.versionId || isRunning || reviewAll || props.chapters.length === 0}
          >
            {props.chapters.length === 0 ? <option value="">No chapters</option> : null}
            {props.chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.id}>
                Chapter {chapter.chapterNumber} · {chapter.title}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-[11px] text-slate-400">
            <input
              type="checkbox"
              checked={reviewAll}
              onChange={(event) => setReviewAll(event.target.checked)}
              disabled={!props.projectId || !props.versionId || isRunning || props.chapters.length === 0}
            />
            Review all chapters
          </label>
        </div>
      </div>

      <Button disabled={!props.projectId || !props.versionId || isRunning || props.chapters.length === 0} onClick={run}>
        {isRunning ? "Running Review..." : reviewAll ? "Run All Chapters" : "Run Review"}
      </Button>

      {lastSummary || lastStatus ? (
        <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xs uppercase tracking-[0.12em] text-slate-400">Latest result</h3>
            {lastStatus ? <Badge tone={toneForRunStatus(lastStatus)}>{lastStatus}</Badge> : null}
          </div>
          {lastSummary ? (
            <>
              <p className="text-sm text-slate-200">{lastSummary.overallAssessment}</p>
              <div className="flex flex-wrap gap-2 text-xs text-slate-400">
                <span>Findings: {lastSummary.issueCount}</span>
                <span>High: {lastSummary.highSeverityCount}</span>
                <span>Medium: {lastSummary.mediumSeverityCount}</span>
                <span>Low: {lastSummary.lowSeverityCount}</span>
              </div>
            </>
          ) : null}
          {lastWarnings.length > 0 ? (
            <div className="space-y-1">
              <p className="text-[11px] uppercase text-amber-300/80">Warnings</p>
              {lastWarnings.slice(0, 5).map((warning, index) => (
                <p key={`warning-${index}`} className="text-xs text-amber-100/80">
                  {warning}
                </p>
              ))}
            </div>
          ) : null}
          <button
            className="rounded border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-xs text-emerald-200"
            onClick={props.onNavigateToFindings}
          >
            Open Findings
          </button>
        </div>
      ) : null}

      <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
        <h3 className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">History Cleanup</h3>
        <div className="flex flex-wrap gap-2">
          <button
            className="rounded border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-xs text-amber-200 disabled:opacity-60"
            onClick={() => requestDeleteByStatus(["error"])}
            disabled={!props.versionId || isRunning || isCleaning}
          >
            Delete Failed Runs
          </button>
          <button
            className="rounded border border-sky-700/70 bg-sky-950/25 px-2 py-1 text-xs text-sky-200 disabled:opacity-60"
            onClick={() => requestDeleteByStatus(["success", "partial"])}
            disabled={!props.versionId || isRunning || isCleaning}
          >
            Delete Success/Partial Runs
          </button>
        </div>
        <p className="mt-2 text-[11px] text-slate-500">Deleting a run also removes findings generated by that run.</p>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-3">
        <button className="text-xs text-slate-400 hover:text-slate-200" onClick={() => setShowRaw((value) => !value)}>
          {showRaw ? "Hide raw result" : "Show raw result"}
        </button>
        {showRaw ? (
          <pre className="mt-2 max-h-64 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">
            {rawResult || "No run yet"}
          </pre>
        ) : null}
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
        <h3 className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Run History</h3>
        {runs.length === 0 ? <p className="text-xs text-slate-500">No review runs for this version yet.</p> : null}
        <div className="max-h-56 space-y-2 overflow-auto">
          {runs.map((runItem) => {
            const summary = parseJsonObject(runItem.summaryJson) as RunSummary | null;
            return (
              <div key={runItem.id} className="rounded border border-slate-800 bg-slate-950 p-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">{labelForMode(runItem.reviewType)}</span>
                  <Badge tone={toneForRunStatus(runItem.status)}>{runItem.status}</Badge>
                </div>
                <p className="text-[11px] text-slate-500">
                  {new Date(runItem.startedAt).toLocaleString()} • {runItem.model}
                </p>
                {summary?.overallAssessment ? (
                  <p className="mt-1 text-[11px] text-slate-400">{summary.overallAssessment}</p>
                ) : null}
                {runItem.errorMessage ? <p className="mt-1 text-[11px] text-rose-300">{runItem.errorMessage}</p> : null}
                <div className="mt-2 flex flex-wrap gap-2">
                  {runItem.status === "error" ? (
                    <button
                      className="rounded border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[11px] text-emerald-200 disabled:opacity-60"
                      onClick={() => void retryFailedRun(runItem.reviewType)}
                      disabled={isRunning || isCleaning || !props.projectId || !props.versionId}
                    >
                      Retry
                    </button>
                  ) : null}
                  <button
                    className="rounded border border-rose-700/70 bg-rose-950/25 px-2 py-1 text-[11px] text-rose-200 disabled:opacity-60"
                    onClick={() => requestDeleteRun(runItem.id)}
                    disabled={isRunning || isCleaning || !props.versionId}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {confirmDeleteRunId ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-100">Delete Review Run</h3>
            <p className="mt-2 text-sm text-slate-300">Delete this review run and its findings?</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
                onClick={() => setConfirmDeleteRunId(null)}
                disabled={isCleaning}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-rose-700/70 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 disabled:opacity-60"
                onClick={() => void deleteRun(confirmDeleteRunId)}
                disabled={isCleaning}
              >
                {isCleaning ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {confirmDeleteStatuses ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-100">Delete Review Runs</h3>
            <p className="mt-2 text-sm text-slate-300">
              Delete all runs with status: {confirmDeleteStatuses.join(", ")}?
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
                onClick={() => setConfirmDeleteStatuses(null)}
                disabled={isCleaning}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-rose-700/70 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 disabled:opacity-60"
                onClick={() => void deleteRunsByStatus(confirmDeleteStatuses)}
                disabled={isCleaning}
              >
                {isCleaning ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

function toneForRunStatus(status: string): "success" | "warning" | "danger" | "info" {
  if (status === "success") return "success";
  if (status === "partial" || status === "running") return "warning";
  if (status === "error") return "danger";
  return "info";
}

function labelForMode(value: string): string {
  return MODE_OPTIONS.find((item) => item.value === value)?.label ?? value;
}

function parseJsonObject(raw: string | null): Record<string, unknown> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as unknown;
    return typeof parsed === "object" && parsed !== null ? (parsed as Record<string, unknown>) : null;
  } catch {
    return null;
  }
}
