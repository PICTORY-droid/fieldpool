"use client";

import { useActionState } from "react";

import {
  adminLoginAction,
  type AdminLoginActionState,
} from "../../../../server/security/admin-login-action";

const initialState: AdminLoginActionState = {
  error: "",
};

export function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(
    adminLoginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-6 grid gap-4">
      <label className="grid gap-2">
        <span className="text-sm font-semibold text-neutral-700">
          관리자 비밀번호
        </span>

        <input
          type="password"
          name="password"
          autoComplete="current-password"
          className="h-12 rounded-2xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-950 outline-none focus:border-neutral-950"
        />
      </label>

      {state.error ? (
        <p className="rounded-2xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="h-12 rounded-2xl bg-neutral-950 px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "확인 중..." : "관리자 로그인"}
      </button>
    </form>
  );
}