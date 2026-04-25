import { useMemo, useState } from "react";
import { Badge, Button, Card } from "@apt/ui";

interface FindingLite {
  id: string;
  reviewRunId: string;
  reviewType: string;
  findingType: string;
  severity: string;
  confidence: string;
  chapterId: string;
  textAnchor: string;
  issue: string;
  whyItMatters: string;
  evidence: string;
  suggestedFix: string;
  status: string;
}

export function FindingsPage(props: {
  projectId: string | null;
  findings: FindingLite[];
  activeVersionLabel: string;
  onStatusUpdated: () => Promise<void>;
}) {
  const [reviewLens, setReviewLens] = useState<"all" | "continuity" | "character" | "timeline" | "chapter">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const [exportFormat, setExportFormat] = useState<"json" | "csv">("json");
  const [exportMessage, setExportMessage] = useState<{ tone: "success" | "error" | "info"; text: string } | null>(
    null
  );
  const [isExporting, setIsExporting] = useState(false);

  const filteredFindings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return props.findings.filter((finding) => {
      const severityMatch = severityFilter === "all" || finding.severity === severityFilter;
      const statusMatch = statusFilter === "all" || finding.status === statusFilter;
      const lensMatch = reviewLens === "all" || matchesLens(finding, reviewLens);
      const queryMatch =
        normalizedQuery.length === 0 ||
        finding.issue.toLowerCase().includes(normalizedQuery) ||
        finding.findingType.toLowerCase().includes(normalizedQuery) ||
        finding.chapterId.toLowerCase().includes(normalizedQuery);
      return severityMatch && statusMatch && lensMatch && queryMatch;
    });
  }, [props.findings, query, reviewLens, severityFilter, statusFilter]);

  const lensSummaries = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const pool = props.findings.filter((finding) => {
      const statusMatch = statusFilter === "all" || finding.status === statusFilter;
      const queryMatch =
        normalizedQuery.length === 0 ||
        finding.issue.toLowerCase().includes(normalizedQuery) ||
        finding.findingType.toLowerCase().includes(normalizedQuery) ||
        finding.chapterId.toLowerCase().includes(normalizedQuery);
      return statusMatch && queryMatch;
    });

    const lenses: Array<"continuity" | "character" | "timeline" | "chapter"> = [
      "continuity",
      "character",
      "timeline",
      "chapter"
    ];

    return lenses.map((lens) => {
      const items = pool.filter((finding) => inferLens(finding) === lens);
      const high = items.filter((finding) => finding.severity === "high").length;
      const medium = items.filter((finding) => finding.severity === "medium").length;
      const low = items.filter((finding) => finding.severity === "low").length;
      const total = items.length;
      const risk: "high" | "medium" | "low" | "none" =
        high > 0 ? "high" : medium > 0 ? "medium" : low > 0 ? "low" : "none";

      return { lens, high, medium, low, total, risk };
    });
  }, [props.findings, query, statusFilter]);

  const selectedFinding = useMemo(() => {
    const fallbackId = filteredFindings[0]?.id ?? null;
    const activeId = selectedId ?? fallbackId;
    return filteredFindings.find((finding) => finding.id === activeId) ?? null;
  }, [filteredFindings, selectedId]);

  async function updateStatus(status: "new" | "still" | "resolved") {
    if (!selectedFinding) return;
    await window.aptApi.findings.updateStatus(selectedFinding.id, status);
    await props.onStatusUpdated();
  }

  async function exportFindings(scope: "filtered" | "current") {
    if (isExporting) {
      return;
    }

    if (!props.projectId) {
      setExportMessage({ tone: "error", text: "Select a project before exporting findings." });
      return;
    }

    const exportSet =
      scope === "current" ? (selectedFinding ? [selectedFinding] : []) : filteredFindings;

    if (exportSet.length === 0) {
      setExportMessage({
        tone: "error",
        text:
          scope === "current"
            ? "Select a finding first to export current finding only."
            : "No findings match the current filters to export."
      });
      return;
    }

    setIsExporting(true);
    setExportMessage({
      tone: "info",
      text: scope === "current" ? "Exporting current finding..." : "Exporting filtered findings..."
    });

    try {
      const result = await window.aptApi.findings.export({
        projectId: props.projectId,
        format: exportFormat,
        activeVersionLabel: props.activeVersionLabel,
        findings: exportSet
      });

      if (result.canceled) {
        setExportMessage({ tone: "info", text: "Export canceled." });
        return;
      }

      setExportMessage({
        tone: "success",
        text: result.filePath
          ? `Exported ${exportSet.length} finding(s) to ${result.filePath}`
          : "Export completed."
      });
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Export failed.";
      setExportMessage({ tone: "error", text: detail });
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <Card title="Findings" className="space-y-3">
      <div className="flex items-center gap-2">
        <Badge tone="info">Active version</Badge>
        <p className="text-xs text-slate-400">{props.activeVersionLabel}</p>
      </div>
      <div className="grid gap-2 md:grid-cols-4">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Search issue, type, chapter"
        />
        <select
          value={severityFilter}
          onChange={(event) => setSeverityFilter(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        >
          <option value="all">All severities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="new">New</option>
          <option value="still">Still</option>
          <option value="resolved">Resolved</option>
        </select>
        <p className="flex items-center text-xs text-slate-400">{filteredFindings.length} findings</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-2">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-500">Review Lens</p>
        {[
          { value: "all", label: "All" },
          { value: "continuity", label: "Continuity" },
          { value: "character", label: "Character" },
          { value: "timeline", label: "Timeline" },
          { value: "chapter", label: "Chapter" }
        ].map((option) => (
          <button
            key={option.value}
            className={`rounded border px-2 py-1 text-xs ${
              reviewLens === option.value
                ? "border-emerald-600/80 bg-emerald-950/30 text-emerald-200"
                : "border-slate-700 text-slate-300"
            }`}
            onClick={() => setReviewLens(option.value as "all" | "continuity" | "character" | "timeline" | "chapter")}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-4">
        {lensSummaries.map((summary) => (
          <button
            key={`summary-${summary.lens}`}
            className={`rounded-lg border p-3 text-left transition ${
              reviewLens === summary.lens
                ? "border-emerald-600/80 bg-emerald-950/20"
                : "border-slate-800 bg-slate-950/40 hover:bg-slate-900"
            }`}
            onClick={() => setReviewLens(summary.lens)}
          >
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.12em] text-slate-400">{summary.lens}</p>
              <Badge tone={toneForLensRisk(summary.risk)}>{summary.risk === "none" ? "clear" : `${summary.risk} risk`}</Badge>
            </div>
            <p className="text-lg font-semibold text-slate-100">{summary.total} findings</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded border border-rose-700/60 bg-rose-950/20 px-2 py-1 text-rose-300">H: {summary.high}</span>
              <span className="rounded border border-amber-700/60 bg-amber-950/20 px-2 py-1 text-amber-300">M: {summary.medium}</span>
              <span className="rounded border border-cyan-700/60 bg-cyan-950/20 px-2 py-1 text-cyan-300">L: {summary.low}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border border-slate-800 bg-slate-950/40 p-2">
        <select
          value={exportFormat}
          onChange={(event) => setExportFormat(event.target.value as "json" | "csv")}
          className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs"
          disabled={isExporting}
        >
          <option value="json">Export JSON</option>
          <option value="csv">Export CSV</option>
        </select>
        <Button disabled={filteredFindings.length === 0 || !props.projectId || isExporting} onClick={() => void exportFindings("filtered")}>
          {isExporting ? "Exporting..." : "Export Filtered Findings"}
        </Button>
        <button
          className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200 disabled:opacity-60"
          disabled={!selectedFinding || !props.projectId || isExporting}
          onClick={() => void exportFindings("current")}
        >
          Export Current Finding Only
        </button>
        {isExporting ? <Badge tone="warning">Working...</Badge> : null}
        {exportMessage ? (
          <p
            className={`text-xs ${
              exportMessage.tone === "success"
                ? "text-emerald-300"
                : exportMessage.tone === "error"
                  ? "text-rose-300"
                  : "text-slate-400"
            }`}
          >
            {exportMessage.text}
          </p>
        ) : null}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-2">
          {filteredFindings.length === 0 ? <p className="text-sm text-slate-400">No findings match filters.</p> : null}
          {filteredFindings.map((finding) => (
            <button
              key={finding.id}
              className={`w-full rounded-lg border p-3 text-left transition ${
                selectedFinding?.id === finding.id
                  ? "border-emerald-600/70 bg-slate-900"
                  : "border-slate-800 bg-slate-950/50 hover:bg-slate-900"
              }`}
              onClick={() => setSelectedId(finding.id)}
            >
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <Badge tone={toneForSeverity(finding.severity)}>{finding.severity}</Badge>
                <Badge tone={toneForStatus(finding.status)}>{finding.status}</Badge>
                <Badge tone="info">{finding.findingType}</Badge>
                <Badge tone="info">{finding.reviewType || "unknown_review"}</Badge>
              </div>
              <p className="text-sm text-slate-100">{finding.issue}</p>
              <p className="mt-1 text-xs text-slate-400">Chapter {finding.chapterId || "unknown"}</p>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-950/40 p-4">
          {selectedFinding ? (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-slate-100">{selectedFinding.issue}</h3>
              <div className="flex flex-wrap gap-2">
                <Badge tone="info">{selectedFinding.findingType}</Badge>
                <Badge tone={toneForSeverity(selectedFinding.severity)}>{selectedFinding.severity}</Badge>
                <Badge tone={toneForConfidence(selectedFinding.confidence)}>{selectedFinding.confidence}</Badge>
                <Badge tone={toneForStatus(selectedFinding.status)}>{selectedFinding.status}</Badge>
                <Badge tone="info">{selectedFinding.reviewType || "unknown_review"}</Badge>
              </div>
              <p className="text-xs text-slate-400">Chapter: {selectedFinding.chapterId}</p>
              <p className="text-xs text-slate-400">Anchor: {selectedFinding.textAnchor || "N/A"}</p>
              <section>
                <h4 className="text-xs uppercase text-slate-400">Why It Matters</h4>
                <p className="mt-1 text-sm text-slate-200">{selectedFinding.whyItMatters}</p>
              </section>
              <section>
                <h4 className="text-xs uppercase text-slate-400">Suggested Fix</h4>
                <p className="mt-1 text-sm text-slate-200">{selectedFinding.suggestedFix}</p>
              </section>
              <section>
                <h4 className="text-xs uppercase text-slate-400">Status Actions</h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    className="rounded border border-cyan-700/70 bg-cyan-950/25 px-2 py-1 text-xs text-cyan-200"
                    onClick={() => void updateStatus("new")}
                  >
                    Mark New
                  </button>
                  <button
                    className="rounded border border-amber-700/70 bg-amber-950/25 px-2 py-1 text-xs text-amber-200"
                    onClick={() => void updateStatus("still")}
                  >
                    Mark Still
                  </button>
                  <button
                    className="rounded border border-emerald-700/70 bg-emerald-950/25 px-2 py-1 text-xs text-emerald-200"
                    onClick={() => void updateStatus("resolved")}
                  >
                    Mark Resolved
                  </button>
                </div>
              </section>
              <section>
                <h4 className="text-xs uppercase text-slate-400">Examples To Review</h4>
                <div className="mt-2 space-y-2">
                  {parseEvidence(selectedFinding.evidence).map((line, index) => (
                    <div key={`${selectedFinding.id}-evidence-${index}`} className="rounded border border-slate-800 bg-slate-950 p-2">
                      <p className="text-[11px] uppercase text-slate-500">Example {index + 1}</p>
                      <p className="mt-1 text-xs text-slate-300">{line}</p>
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <h4 className="text-xs uppercase text-slate-400">Areas To Enhance</h4>
                <div className="mt-2 space-y-2">
                  {buildEnhancementAreas(selectedFinding).map((line, index) => (
                    <div key={`${selectedFinding.id}-area-${index}`} className="rounded border border-slate-800 bg-slate-950 p-2">
                      <p className="text-xs text-slate-300">{line}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <p className="text-sm text-slate-400">Select a finding to view details.</p>
          )}
        </div>
      </div>
    </Card>
  );
}

function parseEvidence(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw) as string[];
    if (!Array.isArray(parsed)) {
      return raw ? [raw] : ["No evidence provided."];
    }
    return parsed.length === 0 ? ["No evidence provided."] : parsed.map((line) => String(line));
  } catch {
    return raw ? [raw] : ["No evidence provided."];
  }
}

function buildEnhancementAreas(finding: FindingLite): string[] {
  const evidence = parseEvidence(finding.evidence);
  const lens = inferLens(finding);
  const focus = [
    `Inspect chapter ${finding.chapterId || "unknown"} near anchor: ${finding.textAnchor || "N/A"}.`,
    `Target issue: ${finding.issue}`,
    `Apply fix direction: ${finding.suggestedFix}`
  ];

  if (lens === "character") {
    focus.push("Check voice consistency, motivation continuity, and dialogue tone for this character moment.");
  }

  if (lens === "continuity") {
    focus.push("Cross-check references to prior facts, objects, and scene outcomes for contradiction drift.");
  }

  if (lens === "timeline") {
    focus.push("Verify time progression, ordering of events, and elapsed-time cues around this segment.");
  }

  if (lens === "chapter") {
    focus.push("Assess pacing and clarity within this chapter section; tighten transitions and setup/payoff flow.");
  }

  if (evidence.length > 0 && evidence[0] !== "No evidence provided.") {
    focus.push(`Cross-check example phrasing: ${evidence[0]}`);
  }

  return focus;
}

function matchesLens(finding: FindingLite, lens: "continuity" | "character" | "timeline" | "chapter"): boolean {
  return inferLens(finding) === lens;
}

function inferLens(finding: FindingLite): "continuity" | "character" | "timeline" | "chapter" {
  const reviewType = (finding.reviewType || "").toLowerCase();
  const findingType = (finding.findingType || "").toLowerCase();
  const combined = `${reviewType} ${findingType}`;

  if (combined.includes("character")) return "character";
  if (combined.includes("timeline") || combined.includes("temporal") || combined.includes("chronolog")) return "timeline";
  if (combined.includes("continuity") || combined.includes("consisten")) return "continuity";
  return "chapter";
}

function toneForSeverity(value: string): "danger" | "warning" | "info" {
  if (value === "high") return "danger";
  if (value === "medium") return "warning";
  return "info";
}

function toneForStatus(value: string): "success" | "warning" | "info" {
  if (value === "resolved") return "success";
  if (value === "still") return "warning";
  return "info";
}

function toneForConfidence(value: string): "success" | "warning" | "danger" {
  if (value === "high") return "success";
  if (value === "medium") return "warning";
  return "danger";
}

function toneForLensRisk(value: "high" | "medium" | "low" | "none"): "danger" | "warning" | "info" | "success" {
  if (value === "high") return "danger";
  if (value === "medium") return "warning";
  if (value === "low") return "info";
  return "success";
}
