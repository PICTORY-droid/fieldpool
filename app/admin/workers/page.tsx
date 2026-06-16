import Link from "next/link";

import { AdminCard } from "../_components/AdminCard";
import { AdminContent } from "../_components/AdminContent";
import { AdminInfoItem } from "../_components/AdminInfoItem";
import { AdminLogoutButton } from "../_components/AdminLogoutButton";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { AdminPageShell } from "../_components/AdminPageShell";
import { AdminSection } from "../_components/AdminSection";
import {
  WORKER_STATUS,
  WORKER_STATUS_LABELS,
  type WorkerStatus,
} from "../../../features/workers/constants/worker-status";
import { getWorkerRecords } from "../../../features/workers/server/get-worker-records";
import { requireAdminAuth } from "../../../server/security/admin-auth";

export const dynamic = "force-dynamic";

const WORKER_STATUS_VALUES = Object.values(WORKER_STATUS);

export default async function AdminWorkersPage() {
  await requireAdminAuth();

  const workers = await getWorkerRecords();
  const latestWorker = workers[0];

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="Fieldpool 관리자"
        title="작업자 인력풀"
        description="등록된 작업자의 기본 정보, 공종, 경력, 차량, 숙소 조건을 확인하고 현장 구인 공고와 매칭할 수 있습니다."
        actions={<AdminLogoutButton />}
      />

      <AdminContent>
        <nav className="flex flex-wrap gap-3">
          <Link
            href="/register"
            className="rounded-full bg-blue-700 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
          >
            작업자 등록
          </Link>
          <Link
            href="/admin/jobs"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
          >
            구인 공고 목록으로
          </Link>
          <Link
            href="/admin/external-jobs"
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
          >
            외부 공고 후보
          </Link>
        </nav>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AdminCard>
            <p className="text-sm font-semibold text-slate-500">등록 작업자</p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
              {workers.length}명
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              현재 관리자 화면에서 확인 가능한 전체 인력풀입니다.
            </p>
          </AdminCard>

          <AdminCard>
            <p className="text-sm font-semibold text-slate-500">최근 등록</p>
            <p className="mt-2 text-xl font-bold tracking-tight text-slate-950">
              {latestWorker ? latestWorker.name : "-"}
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {latestWorker
                ? formatDateTime(latestWorker.createdAt)
                : "아직 등록된 작업자가 없습니다."}
            </p>
          </AdminCard>

          <AdminCard tone="blue" className="sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold text-blue-700">관리 안내</p>
            <p className="mt-2 text-sm leading-6 text-blue-950">
              작업자 상태가 소개 대상인지 확인한 뒤 구인 공고 매칭 결과를
              검토하세요. 상태가 비활성이면 조건이 맞아도 확인 대상으로
              분류됩니다.
            </p>
          </AdminCard>
        </section>

        <AdminSection
          title="최근 등록 작업자"
          description="이름, 연락처, 공종, 경력 조건을 최근 등록순으로 확인합니다."
          actions={
            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {workers.length}명
            </span>
          }
        >
          {workers.length === 0 ? (
            <AdminCard tone="dashed" className="text-center">
              <p className="text-base font-semibold text-slate-900">
                등록된 작업자가 없습니다.
              </p>
              <p className="mt-2 text-sm text-slate-600">
                /register 화면에서 작업자를 등록하면 이곳에 표시됩니다.
              </p>
            </AdminCard>
          ) : (
            <div className="grid gap-4">
              {workers.map((worker) => {
                const statusLabel = formatWorkerStatus(worker.status);

                return (
                  <AdminCard
                    as="article"
                    key={worker.id}
                    className="bg-slate-50 p-0 sm:p-0"
                  >
                    <div className="border-b border-slate-200 bg-white p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-bold text-slate-950">
                              {worker.name}
                            </h3>
                            <span
                              className={`rounded-full px-3 py-1 text-xs font-bold ${getWorkerStatusClass(
                                statusLabel,
                              )}`}
                            >
                              {statusLabel}
                            </span>
                          </div>

                          <p className="mt-1 text-sm font-semibold text-slate-700">
                            {worker.phone}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:items-end">
                          <p className="text-sm text-slate-500">
                            {formatDateTime(worker.createdAt)}
                          </p>

                          <Link
                            href={`/admin/workers/${worker.id}`}
                            className="inline-flex h-10 items-center justify-center rounded-full bg-blue-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
                          >
                            상세 보기
                          </Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                        <AdminInfoItem
                          label="주 근무지역"
                          value={worker.mainRegion}
                        />

                        <AdminInfoItem
                          label="공종"
                          value={
                            worker.jobTypes.length > 0
                              ? worker.jobTypes.join(", ")
                              : "-"
                          }
                        />

                        <AdminInfoItem
                          label="경력"
                          value={
                            worker.careerYears === null
                              ? "-"
                              : `${worker.careerYears}년`
                          }
                        />

                        <AdminInfoItem
                          label="희망 일당"
                          value={
                            worker.desiredPay === null
                              ? "-"
                              : `${worker.desiredPay.toLocaleString("ko-KR")}원`
                          }
                        />
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          차량 {worker.hasVehicle ? "가능" : "없음"}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          숙소 {worker.canLodging ? "가능" : "불가"}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1">
                          언어{" "}
                          {worker.languages.length > 0
                            ? worker.languages.join(", ")
                            : "미입력"}
                        </span>
                      </div>

                      {worker.memo ? (
                        <p className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-sm leading-6 text-slate-600">
                          {worker.memo}
                        </p>
                      ) : null}
                    </div>
                  </AdminCard>
                );
              })}
            </div>
          )}
        </AdminSection>
      </AdminContent>
    </AdminPageShell>
  );
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

function formatDateTime(value: string | Date) {
  return new Date(value).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getWorkerStatusClass(label: string) {
  if (label.includes("신규")) {
    return "bg-blue-50 text-blue-700";
  }

  if (label.includes("비활성")) {
    return "bg-slate-200 text-slate-700";
  }

  if (label.includes("소개") || label.includes("가능")) {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-amber-50 text-amber-700";
}