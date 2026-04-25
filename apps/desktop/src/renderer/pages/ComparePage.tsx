import { useState } from "react";
import { Badge, Button, Card } from "@apt/ui";

interface VersionLite {
  id: string;
  versionNumber: number;
}

export function ComparePage(props: { projectId: string | null; versions: VersionLite[]; activeVersionLabel: string }) {
  const [fromVersionId, setFromVersionId] = useState("");
  const [toVersionId, setToVersionId] = useState("");
  const [result, setResult] = useState<{
    resolved: Array<{ id: string; type: string; chapterId: string; issue: string }>;
    still: Array<{ id: string; type: string; chapterId: string; issue: string }>;
    new: Array<{ id: string; type: string; chapterId: string; issue: string }>;
  } | null>(null);

  async function compare() {
    if (!props.projectId || !fromVersionId || !toVersionId) return;
    const data = await window.aptApi.compare.versions(props.projectId, fromVersionId, toVersionId);
    setResult(data);
  }

  return (
    <Card title="Version Compare" className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge tone="info">Active version</Badge>
        <p className="text-xs text-slate-400">{props.activeVersionLabel}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <select value={fromVersionId} onChange={(event) => setFromVersionId(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
          <option value="">From version</option>
          {props.versions.map((version) => (
            <option key={version.id} value={version.id}>
              v{version.versionNumber}
            </option>
          ))}
        </select>
        <select value={toVersionId} onChange={(event) => setToVersionId(event.target.value)} className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2">
          <option value="">To version</option>
          {props.versions.map((version) => (
            <option key={version.id} value={version.id}>
              v{version.versionNumber}
            </option>
          ))}
        </select>
        <Button onClick={compare}>Compare</Button>
      </div>

      {result ? (
        <div className="space-y-3">
          <div className="grid gap-3 md:grid-cols-3">
            <Stat label="Resolved" value={result.resolved.length} />
            <Stat label="Still Present" value={result.still.length} />
            <Stat label="New" value={result.new.length} />
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            <FindingBucket title="Resolved" items={result.resolved} tone="emerald" />
            <FindingBucket title="Still Present" items={result.still} tone="amber" />
            <FindingBucket title="New" items={result.new} tone="rose" />
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
  items: Array<{ id: string; type: string; chapterId: string; issue: string }>;
  tone: "emerald" | "amber" | "rose";
}) {
  const toneClass = props.tone === "emerald" ? "text-emerald-300" : props.tone === "amber" ? "text-amber-300" : "text-rose-300";

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/50 p-3">
      <h3 className={`mb-2 text-sm font-semibold ${toneClass}`}>{props.title}</h3>
      {props.items.length === 0 ? <p className="text-xs text-slate-500">No items.</p> : null}
      <div className="max-h-52 space-y-2 overflow-auto">
        {props.items.map((item) => (
          <div key={item.id} className="rounded border border-slate-800 bg-slate-950 p-2">
            <p className="text-xs text-slate-400">{item.type} • {item.chapterId}</p>
            <p className="text-sm text-slate-200">{item.issue}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
