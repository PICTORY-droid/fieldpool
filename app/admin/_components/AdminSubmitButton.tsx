"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";

type AdminSubmitButtonVariant = "primary" | "accent" | "danger" | "outline";
type AdminSubmitButtonSize = "sm" | "md" | "pill";

type AdminSubmitButtonProps = {
  children: ReactNode;
  pendingChildren: ReactNode;
  variant?: AdminSubmitButtonVariant;
  size?: AdminSubmitButtonSize;
};

const variantClassNames: Record<AdminSubmitButtonVariant, string> = {
  primary:
    "bg-neutral-950 text-white disabled:bg-neutral-400 disabled:text-white",
  accent:
    "bg-cyan-500 text-slate-950 transition hover:bg-cyan-400 disabled:bg-slate-500 disabled:text-slate-200 disabled:hover:bg-slate-500",
  danger:
    "bg-red-600 text-white transition hover:bg-red-500 disabled:bg-red-300 disabled:hover:bg-red-300",
  outline:
    "border border-neutral-300 bg-white text-neutral-700 disabled:bg-neutral-100 disabled:text-neutral-400",
};

const sizeClassNames: Record<AdminSubmitButtonSize, string> = {
  sm: "inline-flex h-10 items-center justify-center rounded-2xl px-4 text-sm font-semibold",
  md: "inline-flex h-12 items-center justify-center rounded-2xl px-4 text-sm font-semibold",
  pill: "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-bold",
};

export function AdminSubmitButton({
  children,
  pendingChildren,
  variant = "primary",
  size = "md",
}: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`${sizeClassNames[size]} ${variantClassNames[variant]} disabled:cursor-not-allowed`}
    >
      {pending ? pendingChildren : children}
    </button>
  );
}