import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@apt/ui";

interface VersionLite {
  id: string;
  versionNumber: number;
}

interface CompareItem {
  id: string;
  type: string;
  chapterId: string;
  issue: string;
}

export function ComparePage(props: {
  projectId: string | null;
  versions: VersionLite[];
  chapters: Array<{ id: string; chapterNumber: number; title: string }>;
  activeVersionLabel: string;
  onStatusesApplied: () => Promise<void>;
}) {
  const [fromVersionId, setFromVersionId] = useState("");
  const [toVersionId, setToVersionId] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [result, setResult] = useState<{
    resolved: CompareItem[];
    still: CompareItem[];
    new: CompareItem[];
  } | null>(null);

  const chapterLabelById = useMemo(() => {
    const map = new Map<string, string>();
    for (const chapter of props.chapters) {
      map.set(chapter.id, `Chapter ${chapter.chapterNumber} · ${chapter.title}`);
    }
    return map;
  }, [props.chapters]);

  function chapterLabel(chapterId: string): string {
    return chapterLabelById.get(chapterId) ?? (chapterId ? chapterId.slice(0, 8) : "Unknown chapter");
  }

  async function compare() {
    if (!props.projectId || !fromVersionId || !toVersionId) return;
    setIsComparing(true);
    setError(null);
    setMessage(null);
    try {
      const data = await window.aptApi.compare.versions(props.projectId, fromVersionId, toVersionId);
      setResult(data);
    } catch (reason) {
      setResult(null);
      setError(reason instanceof Error ? reason.message : "Compare failed.");
    } finally {
      setIsComparing(false);
    }
  }

  async function applyStatuses() {
    if (!result || isApplying) return;

    const updates = [
      ...result.resolved.map((item) => ({ id: item.id, status: "resolved" as const })),
      ...result.still.map((item) => ({ id: item.id, status: "still" as const })),
      ...result.new.map((item) => ({ id: item.id, status: "new" as const }))
    ];

    if (updates.length === 0) {
      setMessage("No compare results to apply.");
      return;
    }

    setIsApplying(true);
    setError(null);
    try {
      const response = await window.aptApi.findings.applyStatuses(updates);
      setMessage(`Applied statuses to ${response.updatedCount} finding(s).`);
      await props.onStatusesApplied();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Failed to apply statuses.");
    } finally {
      setIsApplying(false);
    }
  }

  return (
    <Card title="Version Compare" className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge tone="info">Active version</Badge>
        <p className="text-xs text-slate-400">{props.activeVersionLabel}</p>
      </div>
      {!props.projectId ? <p className="text-xs text-slate-400">Select a project first.</p> : null}
      <div className="grid gap-3 md:grid-cols-3">
        <select
          value={fromVersionId}
          onChange={(event) => setFromVersionId(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          disabled={!props.projectId || isComparing}
        >
          <option value="">From version</option>
          {props.versions.map((version) => (
            <option key={version.id} value={version.id}>
              v{version.versionNumber}
            </option>
          ))}
        </select>
        <select
          value={toVersionId}
          onChange={(event) => setToVersionId(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2"
          disabled={!props.projectId || isComparing}
        >
          <option value="">To version</option>
          {props.versions.map((version) => (
            <option key={version.id} value={version.id}>
              v{version.versionNumber}
            </option>
          ))}
        </select>
        <Button onClick={compare} disabled={!props.projectId || !fromVersionId || !toVersionId || isComparing}>
          {isComparing ? "Comparing..." : "Compare"}
        </Button>
      </div>

      {error ? <p className="text-xs text-rose-300">{error}</p> : null}
      {message ? <p className="text-xs text-emerald-300">{message}</p> : null}

      {result ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button onClick={applyStatuses} disabled={isApplying}>
              {isApplying ? "Applying..." : "Apply statuses to findings"}
            </Button>
            <p className="text-[11px] text-slate-500">
              Writes resolved / still / new onto the compared findings in storage.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <Stat label="Resolved" value={result.resolved.length} />
            <Stat label="Still Present" value={result.still.length} />
            <Stat label="New" value={result.new.length} />
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <FindingBucket title="Resolved" items={result.resolved} tone="emerald" chapterLabel={chapterLabel} />
            <FindingBucket title="Still Present" items={result.still} tone="amber" chapterLabel={chapterLabel} />
            <FindingBucket title="New" items={result.new} tone="rose" chapterLabel={chapterLabel} />
          </div>
        </div>
      ) : null}
    </Card>
  );
}

function Stat(props: { label: string; value: number }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3 text-center">
      <p className="text-xs uppercase text-slate-400">{props.label}</p>
      <p className="text-2xl font-semibold">{props.value}</p>
    </div>
  );
}

function FindingBucket(props: {
  title: string;
  items: CompareItem[];
  tone: "emerald" | "amber" | "rose";
  chapterLabel: (chapterId: string) => string;
}) {
  const toneClass =
    props.tone === "emerald" ? "text-emerald-300" : props.tone === "amber" ? "text-amber-300" : "text-rose-300";

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <h3 className={`mb-2 text-sm font-semibold ${toneClass}`}>{props.title}</h3>
      {props.items.length === 0 ? <p className="text-xs text-slate-500">No items.</p> : null}
      <div className="max-h-52 space-y-2 overflow-auto">
        {props.items.map((item) => (
          <div key={item.id} className="rounded border border-slate-800 bg-slate-950 p-2">
            <p className="text-xs text-slate-400">
              {item.type} • {props.chapterLabel(item.chapterId)}
            </p>
            <p className="text-sm text-slate-200">{item.issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
