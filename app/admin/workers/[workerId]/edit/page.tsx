import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkerRecord } from "@/features/workers/server/get-worker-record";
import { requireAdminAuth } from "@/server/security/admin-auth";
import { AdminLogoutButton } from "../../../_components/AdminLogoutButton";
import { AdminWorkerEditForm } from "./_components/AdminWorkerEditForm";

type AdminWorkerEditPageProps = {
  params: Promise<{
    workerId: string;
  }>;
};

export default async function AdminWorkerEditPage({
  params,
}: AdminWorkerEditPageProps) {
  await requireAdminAuth();

  const { workerId } = await params;
  const worker = await getWorkerRecord(workerId);

  if (!worker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 text-neutral-950">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-3xl bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <Link
              href={`/admin/workers/${worker.id}`}
              className="text-sm font-semibold text-neutral-600"
            >
              ← 작업자 상세로
            </Link>

            <AdminLogoutButton />
          </div>

          <div className="mt-4">
            <p className="text-sm font-semibold text-neutral-500">
              Fieldpool 관리자
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              작업자 정보 수정
            </h1>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              {worker.name} 작업자의 기본 정보와 근무 정보를 수정합니다.
            </p>
          </div>
        </header>

        <AdminWorkerEditForm worker={worker} />
      </div>
    </main>
  );
}