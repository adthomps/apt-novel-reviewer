import { Card } from "@apt/ui";

export function SettingsPage() {
  return (
    <div className="space-y-4">
      <Card title="Runtime Configuration">
        <p className="text-sm text-slate-300">Ollama endpoint: http://127.0.0.1:11434</p>
        <p className="text-sm text-slate-300">Model: gpt-oss:20b (locked for V1)</p>
      </Card>

      <Card title="Project Storage">
        <p className="text-sm text-slate-300">Default: Documents/APT-Projects</p>
        <p className="text-xs text-slate-400">Override path UI will be added in next increment.</p>
      </Card>
    </div>
  );
}
