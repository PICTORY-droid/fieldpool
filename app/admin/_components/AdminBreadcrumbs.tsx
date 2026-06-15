import Link from "next/link";

export type AdminBreadcrumbItem = {
  href?: string;
  label: string;
};

export function AdminBreadcrumbs({ items }: { items: AdminBreadcrumbItem[] }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="현재 위치"
      className="mb-4 overflow-x-auto whitespace-nowrap text-sm"
    >
      <ol className="flex items-center gap-2 text-slate-600">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-slate-400">
                  /
                </span>
              ) : null}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-semibold text-blue-700 underline-offset-4 hover:text-blue-900 hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "font-semibold text-slate-950" : ""}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}