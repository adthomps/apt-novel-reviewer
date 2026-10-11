import { useEffect, useRef, useState } from "react";
import { Card, StatusIndicator } from "@apt/ui";
import type { ModelPullStatus, RuntimeStatus } from "@apt/types";

const buttonClass = "rounded border border-slate-500 px-3 py-2 text-sm text-slate-100 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed";
export function SetupPage(props: { onStatusLoaded?: (status: RuntimeStatus) => void }) {
  const [status, setStatus] = useState<RuntimeStatus | null>(null);
  const [pull, setPull] = useState<ModelPullStatus>({ state: "idle", message: "Download not started" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const onStatusLoaded = useRef(props.onStatusLoaded);
  onStatusLoaded.current = props.onStatusLoaded;
  const refresh = async () => {
    if (!window.aptApi) throw new Error("Preload bridge not available.");
    const [nextStatus, nextPull] = await Promise.all([window.aptApi.runtime.getStatus(), window.aptApi.runtime.getPullStatus()]);
    setStatus(nextStatus);
    setPull(nextPull);
    onStatusLoaded.current?.(nextStatus);
  };
  useEffect(() => {
    let active = true;
    let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        if (!window.aptApi) throw new Error("Preload bridge not available.");
        const [nextStatus, nextPull] = await Promise.all([window.aptApi.runtime.getStatus(), window.aptApi.runtime.getPullStatus()]);
        if (active) { setStatus(nextStatus); setPull(nextPull); onStatusLoaded.current?.(nextStatus); }
      } catch (reason) { if (active) setError(reason instanceof Error ? reason.message : "Failed to check runtime."); }
      finally { if (active) timer = setTimeout(() => void poll(), 2000); }
    };
    void poll();
    return () => { active = false; clearTimeout(timer); };
  }, []);
  const act = async (action: () => Promise<unknown>) => {
    setBusy(true); setError(null);
    try { await action(); await refresh(); }
    catch (reason) { setError(reason instanceof Error ? reason.message : "Setup action failed. Please retry."); }
    finally { setBusy(false); }
  };
  const downloading = pull.state === "downloading";
  const modelReady = Boolean(status?.modelInstalled);
  const percentage = pull.total && pull.completed !== undefined ? Math.min(100, Math.round(pull.completed / pull.total * 100)) : undefined;
  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-300">Set up local manuscript reviews. Installing Ollama and downloading the model require internet and substantial disk space. Manuscripts stay on your computer.</p>
      <button className={buttonClass} disabled={busy} onClick={() => void act(async () => undefined)}>Check again</button>
      {error && <p role="alert" className="text-sm text-rose-300">{error}</p>}
      <Card title="1. Install Ollama">
        <StatusIndicator label={status?.ollamaInstalled ? "Ollama detected" : "Install Ollama to continue"} status={status?.ollamaInstalled ? "ok" : "warn"} />
        <p className="my-2 text-sm text-slate-300">Open the official download page, run the Windows installer, then check again. For a custom install location, select ollama.exe.</p>
        <div className="flex gap-2">
          <button className={buttonClass} disabled={busy} onClick={() => void act(() => window.aptApi.runtime.openDownloadPage())}>Install Ollama</button>
          <button className={buttonClass} disabled={busy} onClick={() => void act(() => window.aptApi.runtime.selectExecutable())}>Locate ollama.exe</button>
        </div>
      </Card>
      <Card title="2. Start Ollama">
        <StatusIndicator label={status?.ollamaRunning ? "Ollama running" : "Ollama not running"} status={status?.ollamaRunning ? "ok" : "warn"} />
        <p className="my-2 text-sm text-slate-300">{status?.message ?? "Checking runtime…"}</p>
        <button className={buttonClass} disabled={busy || !status?.ollamaInstalled || status.ollamaRunning} onClick={() => void act(() => window.aptApi.runtime.start())}>{busy ? "Working…" : "Start Ollama"}</button>
      </Card>
      <Card title="3. Download review model">
        <StatusIndicator label={`gpt-oss:20b ${modelReady ? "available" : "required"}`} status={modelReady ? "ok" : "warn"} />
        <p className="my-2 text-sm text-slate-300">The model is downloaded by Ollama and stored separately from this app. Download time depends on your connection. Reviews also require sufficient available memory.</p>
        <p role={pull.state === "error" ? "alert" : "status"} className="my-2 text-sm text-slate-300">{pull.message}</p>
        {downloading && <div className="my-2">
          {pull.digest && <p className="text-xs text-slate-300">Layer {pull.digest.slice(0, 20)}</p>}
          <progress className="w-full" aria-label="Current model layer download" max={100} value={percentage} />
          {percentage !== undefined && <p className="text-xs text-slate-300">{percentage}% • {((pull.completed ?? 0) / 1048576).toFixed(1)} / {((pull.total ?? 0) / 1048576).toFixed(1)} MiB for this layer</p>}
        </div>}
        <div className="flex gap-2">
          <button className={buttonClass} disabled={busy || downloading || !status?.ollamaRunning || modelReady} onClick={() => void act(async () => setPull(await window.aptApi.runtime.beginPull()))}>{pull.state === "error" || pull.state === "cancelled" ? "Retry download" : "Download model"}</button>
          {downloading && <button className={buttonClass} disabled={busy} onClick={() => void act(async () => setPull(await window.aptApi.runtime.cancelPull()))}>Cancel download</button>}
        </div>
      </Card>
      {status?.state === "ready" && <Card title="Ready for local reviews"><p className="text-sm text-slate-300">Open Library to create a project and import your manuscript.</p></Card>}
    </div>
  );
}
