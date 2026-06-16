import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminBreadcrumbs } from "../../_components/AdminBreadcrumbs";
import { AdminCard } from "../../_components/AdminCard";
import { AdminContent } from "../../_components/AdminContent";
import { AdminInfoGrid, AdminInfoItem } from "../../_components/AdminInfoItem";
import { AdminLogoutButton } from "../../_components/AdminLogoutButton";
import { AdminPageHeader } from "../../_components/AdminPageHeader";
import { AdminPageShell } from "../../_components/AdminPageShell";
import { AdminSection } from "../../_components/AdminSection";
import { AdminSectionHeader } from "../../_components/AdminSectionHeader";
import { deleteWorkerAction } from "../../../../features/workers/actions/delete-worker-action";
import { updateWorkerStatusAction } from "../../../../features/workers/actions/update-worker-status-action";
import {
  WORKER_STATUS,
  WORKER_STATUS_LABELS,
  type WorkerStatus,
} from "../../../../features/workers/constants/worker-status";
import { getWorkerRecord } from "../../../../features/workers/server/get-worker-record";
import { requireAdminAuth } from "../../../../server/security/admin-auth";
import { AdminWorkerDeleteSubmitButton } from "./_components/AdminWorkerDeleteSubmitButton";
import { AdminWorkerStatusSubmitButton } from "./_components/AdminWorkerStatusSubmitButton";

export const dynamic = "force-dynamic";

const WORKER_STATUS_VALUES = Object.values(WORKER_STATUS) as WorkerStatus[];

function isWorkerStatus(value: string): value is WorkerStatus {
  return WORKER_STATUS_VALUES.includes(value as WorkerStatus);
}

function formatWorkerStatus(value: string) {
  if (!isWorkerStatus(value)) {
    return value;
  }

  return WORKER_STATUS_LABELS[value];
}

function formatNullable(value: string | number | null) {
  if (value === null || value === "") {
    return "-";
  }

  return String(value);
}

function formatList(values: string[]) {
  if (values.length === 0) {
    return "-";
  }

  return values.join(", ");
}

function formatGender(value: string | null) {
  if (value === "male") {
    return "남성";
  }

  if (value === "female") {
    return "여성";
  }

  return "미입력";
}

function formatBoolean(value: boolean) {
  return value ? "가능" : "불가";
}

function formatConsent(value: boolean) {
  return value ? "동의" : "미동의";
}

function formatDateTime(value: Date | string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

export default async function AdminWorkerDetailPage({
  params,
}: {
  params: Promise<{ workerId: string }>;
}) {
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
          { label: worker.name },
        ]}
      />

      <AdminPageHeader
        eyebrow="작업자 상세"
        title={worker.name}
        description="작업자의 기본 정보, 근무 조건, 상태를 확인하고 수정 또는 삭제할 수 있습니다."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/admin/workers/${worker.id}/edit`}
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              작업자 정보 수정
            </Link>

            <AdminLogoutButton />
          </div>
        }
      />

      <AdminContent>
        <section className="grid gap-4 md:grid-cols-3">
          <AdminCard>
            <p className="text-sm font-medium text-slate-500">현재 상태</p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {formatWorkerStatus(worker.status)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              상태 저장 영역에서 작업자 진행 단계를 변경합니다.
            </p>
          </AdminCard>

          <AdminCard>
            <p className="text-sm font-medium text-slate-500">연락처</p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {worker.phone}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              중복 등록을 막기 위해 연락처는 고유값으로 관리됩니다.
            </p>
          </AdminCard>

          <AdminCard>
            <p className="text-sm font-medium text-slate-500">등록일</p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {formatDateTime(worker.createdAt)}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              최근 등록 작업자를 기준으로 목록에 표시됩니다.
            </p>
          </AdminCard>
        </section>

        <AdminCard>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <AdminSectionHeader
              eyebrow="상태 변경"
              title="작업자 상태"
              description="상담, 소개 가능, 비활성 같은 작업자 관리 상태를 저장합니다."
            />

            <form
              action={updateWorkerStatusAction}
              className="flex flex-col gap-3 sm:min-w-80"
            >
              <input type="hidden" name="workerId" value={worker.id} />

              <label
                className="text-sm font-semibold text-slate-700"
                htmlFor="status"
              >
                작업자 상태
              </label>

              <select
                id="status"
                name="status"
                defaultValue={worker.status}
                className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              >
                {WORKER_STATUS_VALUES.map((status) => (
                  <option key={status} value={status}>
                    {WORKER_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>

              <AdminWorkerStatusSubmitButton />
            </form>
          </div>
        </AdminCard>

        <AdminSection eyebrow="기본 정보" title="작업자 기본 정보">
          <AdminInfoGrid>
            <AdminInfoItem label="이름" value={worker.name} />
            <AdminInfoItem label="연락처" value={worker.phone} />
            <AdminInfoItem
              label="출생연도"
              value={formatNullable(worker.birthYear)}
            />
            <AdminInfoItem label="성별" value={formatGender(worker.gender)} />
            <AdminInfoItem label="주 근무지역" value={worker.mainRegion} />
            <AdminInfoItem
              label="가능 지역"
              value={formatList(worker.availableRegions)}
            />
          </AdminInfoGrid>
        </AdminSection>

        <AdminSection eyebrow="근무 정보" title="공종과 근무 조건">
          <AdminInfoGrid>
            <AdminInfoItem label="공종" value={formatList(worker.jobTypes)} />
            <AdminInfoItem label="경력" value={`${worker.careerYears}년`} />
            <AdminInfoItem
              label="희망 일당"
              value={formatNullable(worker.desiredPay)}
            />
            <AdminInfoItem label="차량" value={formatBoolean(worker.hasVehicle)} />
            <AdminInfoItem label="숙소" value={formatBoolean(worker.canLodging)} />
            <AdminInfoItem label="언어" value={formatList(worker.languages)} />
          </AdminInfoGrid>
        </AdminSection>

        <AdminSection eyebrow="메모" title="관리자 메모">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
              {worker.memo || "-"}
            </p>
          </div>
        </AdminSection>

        <AdminSection eyebrow="관리 정보" title="등록 및 동의 정보">
          <AdminInfoGrid>
            <AdminInfoItem
              label="개인정보 동의"
              value={formatConsent(worker.consentPrivacy)}
            />
            <AdminInfoItem label="등록일" value={formatDateTime(worker.createdAt)} />
            <AdminInfoItem label="수정일" value={formatDateTime(worker.updatedAt)} />
          </AdminInfoGrid>
        </AdminSection>

        <AdminCard tone="red">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <AdminSectionHeader
              eyebrow="위험 작업"
              title="작업자 삭제"
              description="삭제한 작업자는 목록과 상세 화면에서 제거됩니다. 테스트가 필요하면 김서인 작업자는 삭제하지 말고 임시 작업자를 새로 등록해서 확인하세요."
            />

            <form
              action={deleteWorkerAction}
              className="flex flex-col gap-3 sm:min-w-80"
            >
              <input type="hidden" name="workerId" value={worker.id} />

              <label className="flex items-start gap-3 rounded-2xl border border-red-200 bg-white px-4 py-3 text-sm font-semibold text-red-900">
                <input
                  type="checkbox"
                  name="confirmDelete"
                  value="yes"
                  className="mt-1 h-4 w-4 rounded border-red-300"
                />
                <span>이 작업자 삭제를 확인합니다.</span>
              </label>

              <AdminWorkerDeleteSubmitButton />
            </form>
          </div>
        </AdminCard>
      </AdminContent>
    </AdminPageShell>
  );
}