"use client";

import { AdminSubmitButton } from "../../../_components/AdminSubmitButton";

export function AdminJobStatusSubmitButton() {
  return (
    <AdminSubmitButton variant="accent" size="sm" pendingChildren="저장 중...">
      상태 저장
    </AdminSubmitButton>
  );
}