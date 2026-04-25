import type { PropsWithChildren } from "react";

export function Card(props: PropsWithChildren<{ title?: string; className?: string }>) {
  return (
    <section className={`rounded-xl border border-slate-700 bg-slate-900/60 p-4 ${props.className ?? ""}`}>
      {props.title ? <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">{props.title}</h3> : null}
      {props.children}
    </section>
  );
}
