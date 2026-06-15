"use client";

import { useFormStatus } from "react-dom";

export function AdminJobStatusSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="h-11 w-fit rounded-2xl bg-cyan-500 px-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-200 disabled:hover:bg-slate-500"
    >
      {pending ? "저장 중..." : "상태 저장"}
    </button>
  );
}