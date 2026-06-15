"use client";

import { AdminSubmitButton } from "../../../_components/AdminSubmitButton";

export function AdminWorkerDeleteSubmitButton() {
  return (
    <AdminSubmitButton variant="danger" size="sm" pendingChildren="삭제 중...">
      확인 후 작업자 삭제
    </AdminSubmitButton>
  );
}