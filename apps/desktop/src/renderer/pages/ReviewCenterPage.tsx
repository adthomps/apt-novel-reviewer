import { useEffect, useState } from "react";
import type { ReviewMode } from "@apt/types";
import { Badge, Button, Card } from "@apt/ui";

const MODES: ReviewMode[] = [
  "chapter_review",
  "continuity_review",
  "character_review",
  "timeline_review"
];

export function ReviewCenterPage(props: {
  projectId: string | null;
  versionId: string | null;
  activeVersionLabel: string;
  onReviewCompleted: () => Promise<void>;
}) {
  const [mode, setMode] = useState<ReviewMode>("chapter_review");
  const [resultText, setResultText] = useState("No run yet");
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
    }>
  >([]);

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

  async function run() {
    if (!props.projectId || !props.versionId || isRunning) return;

    try {
      setIsRunning(true);
      setElapsedSeconds(0);
      setLastError(null);
      setActionMessage(null);
      const result = await window.aptApi.reviews.start({
        projectId: props.projectId,
        versionId: props.versionId,
        reviewType: mode
      });

      if (result.status === "error") {
        setLastError((result.errors ?? ["Review run failed"]).join("; "));
      }

      setResultText(JSON.stringify(result, null, 2));
      await props.onReviewCompleted();
      await loadRuns(props.versionId);
    } finally {
      setIsRunning(false);
    }
  }

  async function retryFailedRun(reviewType: string) {
    if (!props.projectId || !props.versionId || isRunning) return;

    try {
      setIsRunning(true);
      setElapsedSeconds(0);
      setLastError(null);
      setActionMessage(null);
      const result = await window.aptApi.reviews.start({
        projectId: props.projectId,
        versionId: props.versionId,
        reviewType: reviewType as ReviewMode
      });

      if (result.status === "error") {
        setLastError((result.errors ?? ["Retry failed"]).join("; "));
      }

      setResultText(JSON.stringify(result, null, 2));
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
      const api = window.aptApi.reviews as {
        deleteRun?: (id: string) => Promise<{ ok: true; deletedCount?: number }>;
      };
      if (typeof api.deleteRun !== "function") {
        throw new Error("Review cleanup API is out of sync. Restart the desktop app to load the latest preload bridge.");
      }

      const result = await api.deleteRun(runId);
      await props.onReviewCompleted();
      const refreshedRuns = await loadRuns(props.versionId);

      const hasDeletedCount = typeof result.deletedCount === "number";
      const removedFromList = !refreshedRuns.some((run) => run.id === runId);
      const deletedCount = hasDeletedCount ? (result.deletedCount ?? 0) : removedFromList ? 1 : 0;

      if (!deletedCount) {
        throw new Error("No review run was deleted. Refresh and try again (or restart if multiple app instances are open).");
      }

      setResultText(JSON.stringify({ ok: true, deletedRunId: runId, deletedCount }, null, 2));
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
      const api = window.aptApi.reviews as {
        deleteRunsByStatus?: (
          versionId: string,
          statuses: Array<"success" | "partial" | "error">
        ) => Promise<{ ok: true; deletedCount: number }>;
      };
      if (typeof api.deleteRunsByStatus !== "function") {
        throw new Error("Review cleanup API is out of sync. Restart the desktop app to load the latest preload bridge.");
      }

      const result = await api.deleteRunsByStatus(props.versionId, statuses);
      await props.onReviewCompleted();
      await loadRuns(props.versionId);
      setResultText(JSON.stringify(result, null, 2));
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
            <p className="text-sm font-semibold text-emerald-300 apt-busy-pulse">Review in progress</p>
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
        <select
          value={mode}
          onChange={(event) => setMode(event.target.value as ReviewMode)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          disabled={!props.projectId || !props.versionId || isRunning}
        >
          {MODES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <Button disabled={!props.projectId || !props.versionId || isRunning} onClick={run}>
          {isRunning ? "Running Review..." : "Run Review"}
        </Button>
      </div>

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
        <p className="mt-2 text-[11px] text-slate-500">
          Deleting a run also removes findings generated by that run.
        </p>
      </div>

      <pre className="max-h-64 overflow-auto rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">{resultText}</pre>

      <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
        <h3 className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Run History</h3>
        {runs.length === 0 ? <p className="text-xs text-slate-500">No review runs for this version yet.</p> : null}
        <div className="max-h-56 space-y-2 overflow-auto">
          {runs.map((run) => (
            <div key={run.id} className="rounded border border-slate-800 bg-slate-950 p-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">{run.reviewType}</span>
                <Badge tone={toneForRunStatus(run.status)}>{run.status}</Badge>
              </div>
              <p className="text-[11px] text-slate-500">{new Date(run.startedAt).toLocaleString()} • {run.model}</p>
              {run.errorMessage ? <p className="mt-1 text-[11px] text-rose-300">{run.errorMessage}</p> : null}
              <div className="mt-2 flex flex-wrap gap-2">
                {run.status === "error" ? (
                  <button
                    className="rounded border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-[11px] text-emerald-200 disabled:opacity-60"
                    onClick={() => void retryFailedRun(run.reviewType)}
                    disabled={isRunning || isCleaning || !props.projectId || !props.versionId}
                  >
                    Retry
                  </button>
                ) : null}
                <button
                  className="rounded border border-rose-700/70 bg-rose-950/25 px-2 py-1 text-[11px] text-rose-200 disabled:opacity-60"
                  onClick={() => requestDeleteRun(run.id)}
                  disabled={isRunning || isCleaning || !props.versionId}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {confirmDeleteRunId || confirmDeleteStatuses ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-100">Confirm Delete</h3>
            <p className="mt-2 text-sm text-slate-300">
              {confirmDeleteRunId
                ? "Delete this review run? Findings generated by this run will also be removed."
                : `Delete ${confirmDeleteStatuses?.join(", ")} runs for this version? Matching findings will also be removed.`}
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
                disabled={isCleaning}
                onClick={() => {
                  setConfirmDeleteRunId(null);
                  setConfirmDeleteStatuses(null);
                }}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-rose-700/70 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 disabled:opacity-60"
                disabled={isCleaning}
                onClick={() => {
                  if (confirmDeleteRunId) {
                    void deleteRun(confirmDeleteRunId);
                    return;
                  }
                  if (confirmDeleteStatuses) {
                    void deleteRunsByStatus(confirmDeleteStatuses);
                  }
                }}
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

function toneForRunStatus(status: string): "success" | "warning" | "danger" | "info" {
  if (status === "success") return "success";
  if (status === "partial") return "warning";
  if (status === "error") return "danger";
  return "info";
}

function formatElapsed(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}
