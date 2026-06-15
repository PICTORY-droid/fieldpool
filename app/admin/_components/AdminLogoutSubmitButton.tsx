"use client";

import { useFormStatus } from "react-dom";

export function AdminLogoutSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400"
    >
      {pending ? "로그아웃 중..." : "로그아웃"}
    </button>
  );
}