import type { ReactNode } from "react";

type AdminContentProps = {
  children: ReactNode;
};

export function AdminContent({ children }: AdminContentProps) {
  return <div className="flex flex-col gap-6">{children}</div>;
}