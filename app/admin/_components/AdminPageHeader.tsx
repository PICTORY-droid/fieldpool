import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({
  title,
  description,
  eyebrow,
  actions,
}: AdminPageHeaderProps) {
  return (
    <header className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-2">
          {eyebrow ? (
            <p className="text-sm font-semibold text-blue-700">{eyebrow}</p>
          ) : null}

          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-950 sm:text-3xl">
              {title}
            </h1>

            {description ? (
              <p className="max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {actions ? (
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {actions}
          </div>
        ) : null}
      </div>
    </header>
  );
}