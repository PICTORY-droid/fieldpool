import type { ReactNode } from "react";

export function AdminInfoGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function AdminInfoItem({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
      <p className="text-xs font-medium text-slate-500">{label}</p>
      <div className="mt-1 whitespace-pre-wrap text-sm font-semibold leading-6 text-slate-900">
        {value}
      </div>
    </div>
  );
}