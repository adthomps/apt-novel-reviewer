import { Card } from "@apt/ui";
import type { RuntimeStatus } from "@apt/types";

export function SettingsPage(props: { runtimeStatus: RuntimeStatus | null }) {
  const status = props.runtimeStatus;

  return (
    <div className="space-y-4">
      <Card title="Runtime Configuration">
        <p className="text-sm text-slate-300">Ollama endpoint: http://127.0.0.1:11434</p>
        <p className="text-sm text-slate-300">Model: gpt-oss:20b (locked for V1)</p>
        {status ? (
          <p className="mt-2 text-xs text-slate-400">
            Detected: {status.ollamaRunning ? "running" : status.ollamaInstalled ? "installed" : "missing"} · model{" "}
            {status.modelInstalled ? "ready" : "missing"}
          </p>
        ) : (
          <p className="mt-2 text-xs text-slate-400">Open Setup to refresh runtime detection.</p>
        )}
      </Card>

      <Card title="Project Storage">
        <p className="text-sm text-slate-300">Default: Documents/APT-Projects</p>
        <p className="text-xs text-slate-400">Override path UI will be added in next increment.</p>
      </Card>
    </div>
  );
}
