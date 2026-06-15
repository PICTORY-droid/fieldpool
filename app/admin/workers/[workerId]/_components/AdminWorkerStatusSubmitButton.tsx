"use client";

import { AdminSubmitButton } from "../../../_components/AdminSubmitButton";

export function AdminWorkerStatusSubmitButton() {
  return (
    <AdminSubmitButton pendingChildren="저장 중...">
      상태 저장
    </AdminSubmitButton>
  );
}