import Link from "next/link";
import { notFound } from "next/navigation";

import { deleteWorkerAction } from "../../../../features/workers/actions/delete-worker-action";
import { updateWorkerStatusAction } from "../../../../features/workers/actions/update-worker-status-action";
import {
  WORKER_STATUS,
  WORKER_STATUS_LABELS,
  type WorkerStatus,
} from "../../../../features/workers/constants/worker-status";
import { getWorkerRecord } from "../../../../features/workers/server/get-worker-record";
import { requireAdminAuth } from "../../../../server/security/admin-auth";
import { AdminLogoutButton } from "../../_components/AdminLogoutButton";
import { AdminWorkerStatusSubmitButton } from "./_components/AdminWorkerStatusSubmitButton";

export const dynamic = "force-dynamic";

type AdminWorkerDetailPageProps = {
  params: Promise<{
    workerId: string;
  }>;
};

const WORKER_STATUS_VALUES = Object.values(WORKER_STATUS);

export default async function AdminWorkerDetailPage({
  params,
}: AdminWorkerDetailPageProps) {
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
              href="/admin/workers"
              className="text-sm font-semibold text-neutral-600"
            >
              ← 작업자 목록으로
            </Link>

            <AdminLogoutButton />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-neutral-500">
                Fieldpool 관리자
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">
                {worker.name}
              </h1>
              <p className="mt-2 text-sm font-semibold text-neutral-700">
                {worker.phone}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:items-end">
              <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
                {formatWorkerStatus(worker.status)}
              </span>

              <Link
                href={`/admin/workers/${worker.id}/edit`}
                className="inline-flex h-10 items-center justify-center rounded-2xl border border-neutral-300 px-4 text-sm font-semibold text-neutral-700"
              >
                작업자 정보 수정
              </Link>
            </div>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">상태 변경</h2>

          <form action={updateWorkerStatusAction} className="mt-4 grid gap-3">
            <input type="hidden" name="workerId" value={worker.id} />

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-neutral-600">
                작업자 상태
              </span>

              <select
                name="status"
                defaultValue={worker.status}
                className="h-12 rounded-2xl border border-neutral-300 bg-white px-4 text-sm font-semibold text-neutral-950"
              >
                {WORKER_STATUS_VALUES.map((status) => (
                  <option key={status} value={status}>
                    {WORKER_STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </label>

            <AdminWorkerStatusSubmitButton />
          </form>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">기본 정보</h2>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoItem label="이름" value={worker.name} />
            <InfoItem label="연락처" value={worker.phone} />
            <InfoItem label="출생연도" value={formatNullable(worker.birthYear)} />
            <InfoItem label="성별" value={formatGender(worker.gender)} />
            <InfoItem label="주 근무지역" value={worker.mainRegion} />
            <InfoItem
              label="가능 지역"
              value={formatList(worker.availableRegions)}
            />
          </dl>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">근무 정보</h2>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoItem label="공종" value={formatList(worker.jobTypes)} />
            <InfoItem
              label="경력"
              value={
                worker.careerYears === null ? "-" : `${worker.careerYears}년`
              }
            />
            <InfoItem
              label="희망 일당"
              value={
                worker.desiredPay === null
                  ? "-"
                  : `${worker.desiredPay.toLocaleString("ko-KR")}원`
              }
            />
            <InfoItem label="차량" value={worker.hasVehicle ? "가능" : "없음"} />
            <InfoItem label="숙소" value={worker.canLodging ? "가능" : "불가"} />
            <InfoItem label="언어" value={formatList(worker.languages)} />
          </dl>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">메모</h2>

          <p className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">
            {worker.memo || "메모가 없습니다."}
          </p>
        </section>

        <section className="rounded-3xl bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold">관리 정보</h2>

          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            <InfoItem label="상태" value={formatWorkerStatus(worker.status)} />
            <InfoItem
              label="개인정보 동의"
              value={worker.consentPrivacy ? "동의" : "미동의"}
            />
            <InfoItem label="등록일" value={formatDateTime(worker.createdAt)} />
            <InfoItem label="수정일" value={formatDateTime(worker.updatedAt)} />
          </dl>
        </section>

        <section className="rounded-3xl border border-red-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-red-700">위험 작업</h2>
          <p className="mt-2 text-sm leading-6 text-neutral-600">
            이 작업자를 삭제하면 목록과 상세 화면에서 더 이상 확인할 수
            없습니다. 테스트 데이터나 잘못 등록된 데이터만 삭제하세요.
          </p>

          <form action={deleteWorkerAction} className="mt-4 grid gap-4">
            <input type="hidden" name="workerId" value={worker.id} />

            <label className="flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
              <input
                type="checkbox"
                name="confirmDelete"
                required
                className="mt-1 h-4 w-4"
              />
              <span>삭제하면 되돌릴 수 없다는 것을 확인했습니다.</span>
            </label>

            <button
              type="submit"
              className="h-11 w-fit rounded-2xl bg-red-600 px-4 text-sm font-semibold text-white"
            >
              확인 후 작업자 삭제
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

type InfoItemProps = {
  label: string;
  value: string | number;
};

function InfoItem({ label, value }: InfoItemProps) {
  return (
    <div className="rounded-2xl bg-neutral-50 p-4">
      <dt className="text-sm font-semibold text-neutral-500">{label}</dt>
      <dd className="mt-2 font-bold text-neutral-950">{value}</dd>
    </div>
  );
}

function formatNullable(value: string | number | null) {
  return value === null ? "-" : value;
}

function formatList(values: string[]) {
  return values.length > 0 ? values.join(", ") : "-";
}

function formatGender(value: string) {
  if (value === "male") {
    return "남성";
  }

  if (value === "female") {
    return "여성";
  }

  return "미입력";
}

function formatWorkerStatus(value: string) {
  if (isWorkerStatus(value)) {
    return WORKER_STATUS_LABELS[value];
  }

  return value;
}

function isWorkerStatus(value: string): value is WorkerStatus {
  return WORKER_STATUS_VALUES.includes(value as WorkerStatus);
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}