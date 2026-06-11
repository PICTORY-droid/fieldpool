"use client";

import { useState, useTransition, type FormEvent, type ReactNode } from "react";

import {
  createWorkerAction,
  type CreateWorkerActionResult,
} from "@/features/workers/actions/create-worker-action";
import { RegisterFormErrors } from "./RegisterFormErrors";
import { RegisterFormMessage } from "./RegisterFormMessage";

type RegisterFormProps = {
  children: ReactNode;
};

export function RegisterForm({ children }: RegisterFormProps) {
  const [result, setResult] = useState<CreateWorkerActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const actionResult = await createWorkerAction(formData);

      setResult(actionResult);
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {children}

      {result ? <RegisterFormErrors errors={result.errors} /> : null}

      {result?.ok && result.preview ? (
        <RegisterFormMessage preview={result.preview} />
      ) : null}

      {isPending ? (
        <p className="text-center text-sm text-neutral-500">
          입력값을 확인하는 중입니다.
        </p>
      ) : null}
    </form>
  );
}