import Link from "next/link";

import { getWorkerRecords } from "../../../features/workers/server/get-worker-records";
import { requireAdminAuth } from "../../../server/security/admin-auth";

export const dynamic = "force-dynamic";

export default async function AdminWorkersPage() {
  await requireAdminAuth();

  const workers = await getWorkerRecords();

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 text-neutral-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="rounded-3xl bg-white p-5 shadow-sm">
          <p className="text-sm font-semibold text-neutral-500">
            Fieldpool 관리자
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                작업자 인력풀
              </h1>
              <p className="mt-2 text-sm leading-6 text-neutral-600">
                등록된 작업자 정보를 최근 등록순으로 확인합니다.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-neutral-950 px-4 text-sm font-semibold text-white"
            >
              작업자 등록
            </Link>
          </div>
        </header>

        <section className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold">최근 등록 작업자</h2>
            <span className="rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
              {workers.length}명
            </span>
          </div>

          {workers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 p-6 text-center">
              <p className="font-semibold">등록된 작업자가 없습니다.</p>
              <p className="mt-2 text-sm text-neutral-600">
                /register 화면에서 작업자를 등록하면 이곳에 표시됩니다.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {workers.map((worker) => (
                <article
                  key={worker.id}
                  className="rounded-2xl border border-neutral-200 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-lg font-bold">{worker.name}</h3>
                        <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold text-neutral-700">
                          {worker.status}
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
                        className="inline-flex h-9 items-center justify-center rounded-xl bg-neutral-950 px-3 text-sm font-semibold text-white"
                      >
                        상세 보기
                      </Link>
                    </div>
                  </div>

                  <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-neutral-50 p-3">
                      <dt className="font-semibold text-neutral-500">
                        주 근무지역
                      </dt>
                      <dd className="mt-1 font-bold">{worker.mainRegion}</dd>
                    </div>

                    <div className="rounded-xl bg-neutral-50 p-3">
                      <dt className="font-semibold text-neutral-500">공종</dt>
                      <dd className="mt-1 font-bold">
                        {worker.jobTypes.length > 0
                          ? worker.jobTypes.join(", ")
                          : "-"}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-neutral-50 p-3">
                      <dt className="font-semibold text-neutral-500">경력</dt>
                      <dd className="mt-1 font-bold">
                        {worker.careerYears === null
                          ? "-"
                          : `${worker.careerYears}년`}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-neutral-50 p-3">
                      <dt className="font-semibold text-neutral-500">
                        희망 일당
                      </dt>
                      <dd className="mt-1 font-bold">
                        {worker.desiredPay === null
                          ? "-"
                          : `${worker.desiredPay.toLocaleString("ko-KR")}원`}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-neutral-700">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1">
                      차량 {worker.hasVehicle ? "가능" : "없음"}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1">
                      숙소 {worker.canLodging ? "가능" : "불가"}
                    </span>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1">
                      언어{" "}
                      {worker.languages.length > 0
                        ? worker.languages.join(", ")
                        : "미입력"}
                    </span>
                  </div>

                  {worker.memo ? (
                    <p className="mt-3 rounded-xl bg-neutral-50 p-3 text-sm leading-6 text-neutral-700">
                      {worker.memo}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}