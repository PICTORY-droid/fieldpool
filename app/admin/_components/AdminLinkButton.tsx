import Link, { type LinkProps } from "next/link";
import type { ReactNode } from "react";

type AdminLinkButtonVariant = "primary" | "secondary";
type AdminLinkButtonSize = "sm" | "md";

type AdminLinkButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: AdminLinkButtonVariant;
  size?: AdminLinkButtonSize;
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full shadow-sm transition";

const variantClassNames: Record<AdminLinkButtonVariant, string> = {
  primary: "bg-blue-700 text-white hover:bg-blue-800",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:border-blue-300 hover:text-blue-700",
};

const sizeClassNames: Record<AdminLinkButtonSize, string> = {
  sm: "h-10 px-4 text-sm font-bold",
  md: "px-4 py-2 text-sm font-semibold",
};

export function AdminLinkButton({
  children,
  className = "",
  variant = "secondary",
  size = "md",
  ...props
}: AdminLinkButtonProps) {
  return (
    <Link
      {...props}
      className={`${baseClassName} ${sizeClassNames[size]} ${variantClassNames[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}