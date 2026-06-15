"use client";

import { AdminSubmitButton } from "./AdminSubmitButton";

export function AdminLogoutSubmitButton() {
  return (
    <AdminSubmitButton
      variant="outline"
      size="sm"
      pendingChildren="로그아웃 중..."
    >
      로그아웃
    </AdminSubmitButton>
  );
}