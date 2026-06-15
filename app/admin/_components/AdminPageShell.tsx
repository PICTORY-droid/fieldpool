import type { ReactNode } from "react";

type AdminPageShellProps = {
  children: ReactNode;
};

export function AdminPageShell({ children }: AdminPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f4f6f9] text-neutral-950">
      <div className="border-b border-blue-900 bg-blue-950">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-white">Fieldpool 관리자</p>
          <p className="hidden text-xs font-medium text-blue-100 sm:block">
            건설 현장 인력풀 관리 시스템
          </p>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
}