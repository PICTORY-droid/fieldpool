"use client";

import { AdminSubmitButton } from "../../../_components/AdminSubmitButton";

export function AdminJobDeleteSubmitButton() {
  return (
    <AdminSubmitButton variant="danger" size="sm" pendingChildren="삭제 중...">
      확인 후 구인 공고 삭제
    </AdminSubmitButton>
  );
}