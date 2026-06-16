import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type AdminCardTone = "default" | "blue" | "red" | "dashed";

type AdminCardProps<TElement extends ElementType> = {
  as?: TElement;
  children: ReactNode;
  className?: string;
  tone?: AdminCardTone;
} & Omit<ComponentPropsWithoutRef<TElement>, "as" | "children" | "className">;

const TONE_CLASS_NAMES: Record<AdminCardTone, string> = {
  default: "border-slate-200 bg-white shadow-sm",
  blue: "border-blue-100 bg-blue-50 shadow-sm",
  red: "border-red-200 bg-red-50 shadow-sm",
  dashed: "border-dashed border-slate-300 bg-white shadow-sm",
};

export function AdminCard<TElement extends ElementType = "section">({
  as,
  children,
  className = "",
  tone = "default",
  ...props
}: AdminCardProps<TElement>) {
  const Component = as ?? "section";

  return (
    <Component
      className={[
        "rounded-3xl border p-5 sm:p-6",
        TONE_CLASS_NAMES[tone],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}