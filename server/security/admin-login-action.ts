"use server";

import { redirect } from "next/navigation";

import { createAdminSession, isValidAdminPassword } from "./admin-auth";

export type AdminLoginActionState = {
  error: string;
};

export async function adminLoginAction(
  _previousState: AdminLoginActionState,
  formData: FormData,
): Promise<AdminLoginActionState> {
  const password = String(formData.get("password") ?? "");

  if (!password) {
    return {
      error: "관리자 비밀번호를 입력해 주세요.",
    };
  }

  if (!isValidAdminPassword(password)) {
    return {
      error: "관리자 비밀번호가 올바르지 않습니다.",
    };
  }

  await createAdminSession();

  redirect("/admin/workers");
}