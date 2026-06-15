"use client";

import { useFormStatus } from "react-dom";

export function AdminJobCreateSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-500 disabled:text-slate-200 disabled:hover:bg-slate-500"
    >
      {pending ? "저장 중..." : "구인 공고 저장"}
    </button>
  );
}