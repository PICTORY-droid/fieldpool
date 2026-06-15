import Link from "next/link";

import { AdminContent } from "../_components/AdminContent";
import { AdminLogoutButton } from "../_components/AdminLogoutButton";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { AdminPageShell } from "../_components/AdminPageShell";
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
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
          >
            구인 공고 목록으로
          </Link>
          <Link
            href="/admin/external-jobs"
            className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-semibold text-neutral-700 shadow-sm transition hover:border-blue-300 hover:text-blue-700"
          >
            외부 공고 후보
          </Link>
        </nav>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">
              등록 작업자
            </p>
            <p className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
              {workers.length}명
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              현재 관리자 화면에서 확인 가능한 전체 인력풀입니다.
            </p>
          </div>

          <div className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-neutral-500">
              최근 등록
            </p>
            <p className="mt-2 text-xl font-bold tracking-tight text-neutral-950">
              {latestWorker ? latestWorker.name : "-"}
            </p>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              {latestWorker
                ? formatDateTime(latestWorker.createdAt)
                : "아직 등록된 작업자가 없습니다."}
            </p>
          </div>

          <div className="rounded-3xl border border-blue-100 bg-blue-50 p-5 shadow-sm sm:col-span-2 lg:col-span-1">
            <p className="text-sm font-semibold text-blue-700">관리 안내</p>
            <p className="mt-2 text-sm leading-6 text-blue-950">
              작업자 상태가 소개 대상인지 확인한 뒤 구인 공고 매칭 결과를
              검토하세요. 상태가 비활성이면 조건이 맞아도 확인 대상으로
              분류됩니다.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-neutral-950">
                최근 등록 작업자
              </h2>
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                이름, 연락처, 공종, 경력 조건을 최근 등록순으로 확인합니다.
              </p>
            </div>

            <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-blue-700">
              {workers.length}명
            </span>
          </div>

          {workers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
              <p className="text-base font-semibold text-neutral-800">
                등록된 작업자가 없습니다.
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                /register 화면에서 작업자를 등록하면 이곳에 표시됩니다.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {workers.map((worker) => {
                const statusLabel = formatWorkerStatus(worker.status);

                return (
                  <article
                    key={worker.id}
                    className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50"
                  >
                    <div className="border-b border-neutral-200 bg-white p-5">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-bold text-neutral-950">
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

                          <p className="mt-1 text-sm font-semibold text-neutral-700">
                            {worker.phone}
                          </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:items-end">
                          <p className="text-sm text-neutral-500">
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
                      <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                        <div className="rounded-xl border border-neutral-200 bg-white p-3">
                          <dt className="font-semibold text-neutral-500">
                            주 근무지역
                          </dt>
                          <dd className="mt-1 font-bold text-neutral-800">
                            {worker.mainRegion}
                          </dd>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-3">
                          <dt className="font-semibold text-neutral-500">
                            공종
                          </dt>
                          <dd className="mt-1 font-bold text-neutral-800">
                            {worker.jobTypes.length > 0
                              ? worker.jobTypes.join(", ")
                              : "-"}
                          </dd>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-3">
                          <dt className="font-semibold text-neutral-500">
                            경력
                          </dt>
                          <dd className="mt-1 font-bold text-neutral-800">
                            {worker.careerYears === null
                              ? "-"
                              : `${worker.careerYears}년`}
                          </dd>
                        </div>

                        <div className="rounded-xl border border-neutral-200 bg-white p-3">
                          <dt className="font-semibold text-neutral-500">
                            희망 일당
                          </dt>
                          <dd className="mt-1 font-bold text-neutral-800">
                            {worker.desiredPay === null
                              ? "-"
                              : `${worker.desiredPay.toLocaleString(
                                  "ko-KR",
                                )}원`}
                          </dd>
                        </div>
                      </dl>

                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-neutral-700">
                        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                          차량 {worker.hasVehicle ? "가능" : "없음"}
                        </span>
                        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                          숙소 {worker.canLodging ? "가능" : "불가"}
                        </span>
                        <span className="rounded-full border border-neutral-200 bg-white px-3 py-1">
                          언어{" "}
                          {worker.languages.length > 0
                            ? worker.languages.join(", ")
                            : "미입력"}
                        </span>
                      </div>

                      {worker.memo ? (
                        <p className="mt-4 rounded-xl border border-neutral-200 bg-white p-3 text-sm leading-6 text-neutral-600">
                          {worker.memo}
                        </p>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
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

function formatDateTime(value: string) {
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
    return "bg-neutral-200 text-neutral-700";
  }

  if (label.includes("소개") || label.includes("가능")) {
    return "bg-emerald-50 text-emerald-700";
  }

  return "bg-amber-50 text-amber-700";
}