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
    <header className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">
      <div className="border-b border-neutral-200 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            {eyebrow ? (
              <p className="text-sm font-semibold text-blue-100">{eyebrow}</p>
            ) : null}

            <h1 className="mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {title}
            </h1>
          </div>

          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      </div>

      {description ? (
        <div className="bg-white px-5 py-4 sm:px-6">
          <p className="max-w-3xl text-sm leading-6 text-neutral-600 sm:text-base">
            {description}
          </p>
        </div>
      ) : null}
    </header>
  );
}