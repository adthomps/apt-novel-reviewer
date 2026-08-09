import { Button, Card } from "@apt/ui";

type NavTarget =
  | "Manuscript"
  | "Review Center"
  | "Findings"
  | "Compare"
  | "Canon"
  | "Library";

export function DashboardPage(props: {
  projectId: string | null;
  projectName: string | null;
  versionCount: number;
  chapterCount: number;
  findingCount: number;
  activeVersionLabel: string;
  lastReviewAt: number | null;
  onNavigate: (target: NavTarget) => void;
}) {
  const nextStep = !props.projectId
    ? {
        label: "Open or create a project",
        detail: "Start from the Library to open a manuscript workspace.",
        action: "Library" as const,
        cta: "Go to Library"
      }
    : props.versionCount === 0
      ? {
          label: "Import a manuscript",
          detail: "Add a DOCX version so chapters can be reviewed.",
          action: "Manuscript" as const,
          cta: "Import Manuscript"
        }
      : props.findingCount === 0
        ? {
            label: "Run a review",
            detail: "Choose a chapter and mode in Review Center.",
            action: "Review Center" as const,
            cta: "Open Review Center"
          }
        : {
            label: "Review findings",
            detail: "Triage issues for the active version, then compare versions.",
            action: "Findings" as const,
            cta: "View Findings"
          };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-4">
        <Card title="Active Project">
          <p className="text-sm text-slate-300">
            {props.projectName ?? (props.projectId ? props.projectId.slice(0, 8) : "No project selected")}
          </p>
        </Card>
        <Card title="Active Version">
          <p className="text-sm text-slate-300">{props.activeVersionLabel}</p>
        </Card>
        <Card title="Versions / Chapters">
          <p className="text-2xl font-semibold">
            {props.versionCount} / {props.chapterCount}
          </p>
        </Card>
        <Card title="Findings">
          <p className="text-2xl font-semibold">{props.findingCount}</p>
          <p className="mt-1 text-xs text-slate-400">
            {props.lastReviewAt
              ? `Last review ${new Date(props.lastReviewAt).toLocaleString()}`
              : "No reviews yet"}
          </p>
        </Card>
      </div>

      <Card title="Next Step" className="space-y-3">
        <div>
          <p className="text-sm font-semibold text-slate-100">{nextStep.label}</p>
          <p className="mt-1 text-xs text-slate-400">{nextStep.detail}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => props.onNavigate(nextStep.action)}>{nextStep.cta}</Button>
          {props.findingCount > 0 ? (
            <button
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
              onClick={() => props.onNavigate("Compare")}
            >
              Compare Versions
            </button>
          ) : null}
          {props.versionCount > 0 ? (
            <button
              className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
              onClick={() => props.onNavigate("Canon")}
            >
              Edit Canon Notes
            </button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
