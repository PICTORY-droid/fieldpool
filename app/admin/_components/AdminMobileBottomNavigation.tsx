"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_ITEMS = [
  {
    href: "/admin/workers",
    label: "작업자",
    match: "/admin/workers",
  },
  {
    href: "/admin/jobs",
    label: "공고",
    match: "/admin/jobs",
  },
  {
    href: "/admin/external-jobs",
    label: "외부",
    match: "/admin/external-jobs",
  },
  {
    href: "/register",
    label: "작업자 등록",
    match: "/register",
  },
  {
    href: "/admin/jobs/new",
    label: "공고 등록",
    match: "/admin/jobs/new",
  },
];

export function AdminMobileBottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.12)] backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.match !== "/admin/jobs" &&
              pathname.startsWith(item.match)) ||
            (item.href === "/admin/jobs" && pathname === "/admin/jobs");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={[
                "flex min-h-12 items-center justify-center rounded-2xl px-1 text-center text-[11px] font-bold leading-tight transition",
                isActive
                  ? "bg-blue-700 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}