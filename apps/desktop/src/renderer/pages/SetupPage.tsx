import { useEffect, useState } from "react";
import { Card, StatusIndicator } from "@apt/ui";
import type { RuntimeStatus } from "@apt/types";

export function SetupPage(props: { onStatusLoaded?: (status: RuntimeStatus) => void }) {
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!window.aptApi) {
      setError("Preload bridge not available.");
      return;
    }

    void window.aptApi.runtime
      .getStatus()
      .then((nextStatus) => {
        setStatus(nextStatus);
        props.onStatusLoaded?.(nextStatus);
        setError(null);
      })
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Failed to fetch runtime status.");
      });
    // Load once on mount; status is also refreshed from App shell.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const runtimeOk = status?.ollamaRunning && status?.ollamaInstalled;
  const modelOk = status?.modelInstalled;

  return (
    <div className="space-y-4">
      <Card title="Runtime Status">
        {status ? (
          <div className="space-y-2">
            <StatusIndicator
              label={`Ollama installed: ${status.ollamaInstalled ? "yes" : "no"}`}
              status={status.ollamaInstalled ? "ok" : "error"}
            />
            <StatusIndicator
              label={`Ollama running: ${status.ollamaRunning ? "yes" : "no"}`}
              status={runtimeOk ? "ok" : "warn"}
            />
            <p className="text-xs text-slate-400">{status.message}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Checking runtime...</p>
        )}
        {error ? <p className="mt-2 text-xs text-rose-300">{error}</p> : null}
      </Card>

      <Card title="Model Status">
        {status ? (
          <div className="space-y-2">
            <StatusIndicator label={`Required model: ${status.requiredModel}`} status={modelOk ? "ok" : "warn"} />
            <p className="text-xs text-slate-400">Available: {status.availableModels.join(", ") || "none"}</p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}
