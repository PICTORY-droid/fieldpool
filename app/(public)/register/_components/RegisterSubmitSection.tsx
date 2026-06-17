"use client";

import { Button } from "@/shared/ui/Button";
import { useRegisterFormPending } from "./RegisterForm.client";

export function RegisterSubmitSection() {
  const isPending = useRegisterFormPending();

  return (
    <section className="space-y-3">
      <Button className="w-full" disabled={isPending} type="submit">
        {isPending ? "등록 중..." : "인력풀 등록하기"}
      </Button>

      <p className="text-center text-xs leading-5 text-neutral-500">
        입력한 내용이 정확한지 확인한 뒤 등록해 주세요.
      </p>
    </section>
  );
}