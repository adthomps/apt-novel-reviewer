import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

export function Button({ children, className, ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
      {...rest}
    >
      {children}
    </button>
  );
}
