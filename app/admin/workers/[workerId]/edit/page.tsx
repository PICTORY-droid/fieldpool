import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkerRecord } from "@/features/workers/server/get-worker-record";
import { requireAdminAuth } from "@/server/security/admin-auth";
import { AdminBreadcrumbs } from "../../../_components/AdminBreadcrumbs";
import { AdminContent } from "../../../_components/AdminContent";
import { AdminLogoutButton } from "../../../_components/AdminLogoutButton";
import { AdminPageHeader } from "../../../_components/AdminPageHeader";
import { AdminPageShell } from "../../../_components/AdminPageShell";
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
    <AdminPageShell>
      <AdminBreadcrumbs
        items={[
          { href: "/admin/workers", label: "작업자 목록" },
          { href: `/admin/workers/${worker.id}`, label: worker.name },
          { label: "정보 수정" },
        ]}
      />

      <AdminPageHeader
        eyebrow="작업자 수정"
        title="작업자 정보 수정"
        description={`${worker.name} 작업자의 기본 정보와 근무 조건을 수정합니다.`}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/workers/${worker.id}`}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              작업자 상세
            </Link>

            <AdminLogoutButton />
          </div>
        }
      />

      <AdminContent>
        <AdminWorkerEditForm worker={worker} />
      </AdminContent>
    </AdminPageShell>
  );
}