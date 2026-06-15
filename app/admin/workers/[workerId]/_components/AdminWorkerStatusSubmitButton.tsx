"use client";

import { useFormStatus } from "react-dom";

export function AdminWorkerStatusSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="h-12 rounded-2xl bg-neutral-950 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {pending ? "저장 중..." : "상태 저장"}
    </button>
  );
}