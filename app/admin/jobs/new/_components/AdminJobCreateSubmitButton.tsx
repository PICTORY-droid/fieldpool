"use client";

import { AdminSubmitButton } from "../../../_components/AdminSubmitButton";

export function AdminJobCreateSubmitButton() {
  return (
    <AdminSubmitButton
      variant="accent"
      size="pill"
      pendingChildren="저장 중..."
    >
      구인 공고 저장
    </AdminSubmitButton>
  );
}