import type { ReactNode } from "react";

type ErrorBoxProps = {
  title?: string;
  children: ReactNode;
};

export function ErrorBox({ children, title = "오류가 발생했습니다." }: ErrorBoxProps) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-semibold">{title}</p>
      <div className="mt-2 leading-6">{children}</div>
    </div>
  );
}