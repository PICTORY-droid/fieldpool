"use client";

import type { ReactNode } from "react";

type RegisterFormProps = {
  children: ReactNode;
};

export function RegisterForm({ children }: RegisterFormProps) {
  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      {children}
    </form>
  );
}