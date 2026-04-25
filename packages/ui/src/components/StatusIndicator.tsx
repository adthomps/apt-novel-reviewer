export function StatusIndicator(props: { label: string; status: "ok" | "warn" | "error" }) {
  const color = props.status === "ok" ? "bg-emerald-400" : props.status === "warn" ? "bg-amber-400" : "bg-rose-400";
  return (
    <div className="flex items-center gap-2 text-xs text-slate-300">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`} />
      <span>{props.label}</span>
    </div>
  );
}
