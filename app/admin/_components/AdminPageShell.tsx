import type { ReactNode } from "react";

import { AdminMobileBottomNavigation } from "./AdminMobileBottomNavigation";

export function AdminPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 pb-24 text-slate-950 md:pb-0">
      <header className="border-b border-blue-900 bg-blue-950 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 text-sm font-semibold sm:px-6 lg:px-8">
          <span>Fieldpool 관리자</span>
          <span className="hidden text-xs font-medium text-blue-100 sm:inline">
            건설 현장 인력풀 관리 시스템
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {children}
      </main>

      <AdminMobileBottomNavigation />
    </div>
  );
}