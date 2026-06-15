"use client";

import { useFormStatus } from "react-dom";

export function AdminWorkerEditSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="h-12 rounded-2xl bg-neutral-950 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-neutral-400"
    >
      {pending ? "저장 중..." : "작업자 정보 저장"}
    </button>
  );
}