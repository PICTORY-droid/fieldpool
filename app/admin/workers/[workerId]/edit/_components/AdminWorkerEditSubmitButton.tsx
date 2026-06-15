"use client";

import { AdminSubmitButton } from "../../../../_components/AdminSubmitButton";

export function AdminWorkerEditSubmitButton() {
  return (
    <AdminSubmitButton pendingChildren="저장 중...">
      작업자 정보 저장
    </AdminSubmitButton>
  );
}