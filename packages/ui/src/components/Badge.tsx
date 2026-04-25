import type { PropsWithChildren } from "react";

type BadgeTone = "neutral" | "success" | "warning" | "danger" | "info";

const toneClass: Record<BadgeTone, string> = {
  neutral: "border-slate-700 bg-slate-900 text-slate-300",
  success: "border-emerald-700/70 bg-emerald-950/30 text-emerald-300",
  warning: "border-amber-700/70 bg-amber-950/30 text-amber-300",
  danger: "border-rose-700/70 bg-rose-950/30 text-rose-300",
  info: "border-cyan-700/70 bg-cyan-950/30 text-cyan-300"
};

export function Badge(props: PropsWithChildren<{ tone?: BadgeTone; className?: string }>) {
  const tone = props.tone ?? "neutral";
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${toneClass[tone]} ${
        props.className ?? ""
      }`}
    >
      {props.children}
    </span>
  );
}
