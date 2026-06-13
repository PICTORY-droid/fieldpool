import { redirect } from "next/navigation";

import { AdminLoginForm } from "./_components/AdminLoginForm.client";
import { isAdminAuthenticated } from "../../../server/security/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const isAuthenticated = await isAdminAuthenticated();

  if (isAuthenticated) {
    redirect("/admin/workers");
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-10 text-neutral-950">
      <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-neutral-500">
          Fieldpool 관리자
        </p>

        <h1 className="mt-2 text-2xl font-bold tracking-tight">
          관리자 로그인
        </h1>

        <p className="mt-3 text-sm leading-6 text-neutral-600">
          관리자 화면에 접근하려면 비밀번호를 입력해 주세요.
        </p>

        <AdminLoginForm />
      </div>
    </main>
  );
}