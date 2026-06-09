import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ action, description, title }: EmptyStateProps) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-white p-6 text-center">
      <p className="text-base font-semibold text-neutral-950">{title}</p>

      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-6 text-neutral-600">
          {description}
        </p>
      ) : null}

      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}