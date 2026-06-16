import type { ReactNode } from "react";

export function AdminSectionHeader({
  children,
  description,
  eyebrow,
  title,
}: {
  children?: ReactNode;
  description?: string;
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold text-blue-700">{eyebrow}</p>
        ) : null}

        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>

        {description ? (
          <p className="mt-2 text-sm leading-6 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>

      {children ? <div className="flex flex-wrap gap-2">{children}</div> : null}
    </div>
  );
}