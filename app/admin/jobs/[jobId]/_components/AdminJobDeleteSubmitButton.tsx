"use client";

import { useFormStatus } from "react-dom";

export function AdminJobDeleteSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="h-11 w-fit rounded-2xl bg-red-600 px-4 text-sm font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
    >
      {pending ? "삭제 중..." : "확인 후 구인 공고 삭제"}
    </button>
  );
}