import { Card } from "@apt/ui";

export function DashboardPage(props: {
  projectId: string | null;
  versionCount: number;
  findingCount: number;
  activeVersionLabel: string;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card title="Active Project">
        <p className="text-sm text-slate-300">{props.projectId ?? "No project selected"}</p>
      </Card>
      <Card title="Active Version">
        <p className="text-sm text-slate-300">{props.activeVersionLabel}</p>
      </Card>
      <Card title="Versions">
        <p className="text-2xl font-semibold">{props.versionCount}</p>
      </Card>
      <Card title="Findings">
        <p className="text-2xl font-semibold">{props.findingCount}</p>
      </Card>
    </div>
  );
}
