import type { ReactNode } from "react";

import { AdminCard } from "./AdminCard";
import { AdminSectionHeader } from "./AdminSectionHeader";

type AdminSectionTone = "default" | "blue" | "red" | "dashed";

export function AdminSection({
  actions,
  children,
  className = "",
  description,
  eyebrow,
  title,
  tone = "default",
}: {
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  description?: string;
  eyebrow?: string;
  title: string;
  tone?: AdminSectionTone;
}) {
  return (
    <AdminCard className={className} tone={tone}>
      <AdminSectionHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
      >
        {actions}
      </AdminSectionHeader>

      <div className="mt-5">{children}</div>
    </AdminCard>
  );
}