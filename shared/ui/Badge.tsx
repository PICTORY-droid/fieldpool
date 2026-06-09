import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "muted";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: BadgeVariant;
};

const variantClassNames: Record<BadgeVariant, string> = {
  default: "bg-neutral-900 text-white",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
  muted: "bg-neutral-100 text-neutral-700",
};

export function Badge({
  children,
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantClassNames[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}