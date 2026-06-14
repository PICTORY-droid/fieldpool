import Link from "next/link";

import { AdminLogoutButton } from "../_components/AdminLogoutButton";
import { getJobPosts } from "../../../features/jobs/server/get-job-posts";
import { requireAdminAuth } from "../../../server/security/admin-auth";

const JOB_POST_STATUS_LABELS: Record<string, string> = {
  open: "모집중",
  paused: "일시중지",
  closed: "마감",
};

const JOB_POST_SOURCE_LABELS: Record<string, string> = {
  manual: "직접 등록",
  external: "외부 공고",
};

function formatDate(value: Date | string | null | undefined) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(value));
}

function formatPay(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${value.toLocaleString("ko-KR")}원`;
}

function formatBoolean(value: boolean) {
  return value ? "필요" : "무관";
}

function formatLodging(value: boolean) {
  return value ? "제공" : "미제공";
}

export default async function AdminJobsPage() {
  await requireAdminAuth();

  const jobPosts = await getJobPosts();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Fieldpool 관리자
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                구인 공고 목록
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                관리자가 직접 등록했거나 외부 공고에서 전환한 내부 구인
                공고를 확인합니다.
              </p>
            </div>

            <AdminLogoutButton />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/workers"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              작업자 목록으로
            </Link>
            <Link
              href="/admin/external-jobs"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              외부 공고 후보
            </Link>
            <Link
              href="/admin/jobs/new"
              className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              새 공고 등록
            </Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">최근 구인 공고</h2>
              <p className="mt-1 text-sm text-slate-400">
                등록된 공고를 최근 등록순으로 표시합니다.
              </p>
            </div>

            <p className="rounded-full bg-slate-800 px-3 py-1 text-sm font-semibold text-cyan-200">
              {jobPosts.length}건
            </p>
          </div>

          {jobPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
              <p className="text-base font-semibold text-slate-200">
                등록된 구인 공고가 없습니다.
              </p>
              <p className="mt-2 text-sm text-slate-400">
                새 공고 등록 화면에서 관리자 직접 공고를 먼저 등록하세요.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {jobPosts.map((jobPost) => (
                <article
                  key={jobPost.id}
                  className="rounded-2xl border border-slate-800 bg-slate-950/50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">
                          {JOB_POST_STATUS_LABELS[jobPost.status] ??
                            jobPost.status}
                        </span>
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                          {JOB_POST_SOURCE_LABELS[jobPost.sourceType] ??
                            jobPost.sourceType}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-white">
                        {jobPost.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {jobPost.siteName || "현장명 미입력"}
                      </p>
                    </div>

                    <Link
                      href={`/admin/jobs/${jobPost.id}`}
                      className="rounded-full border border-slate-700 px-4 py-2 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
                    >
                      상세 보기
                    </Link>
                  </div>

                  <dl className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">지역</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {jobPost.region || "-"}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">공종</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {jobPost.jobTypes.length > 0
                          ? jobPost.jobTypes.join(", ")
                          : "-"}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">필요 인원</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {jobPost.neededCount
                          ? `${jobPost.neededCount}명`
                          : "-"}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">일당</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {formatPay(jobPost.pay)}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">근무 기간</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {formatDate(jobPost.startDate)} ~{" "}
                        {formatDate(jobPost.endDate)}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">필요 경력</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {jobPost.careerYears === null ||
                        jobPost.careerYears === undefined
                          ? "-"
                          : `${jobPost.careerYears}년 이상`}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">차량</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {formatBoolean(jobPost.requiresVehicle)}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">숙소</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {formatLodging(jobPost.providesLodging)}
                      </dd>
                    </div>

                    <div className="rounded-xl bg-slate-900 p-3">
                      <dt className="text-slate-500">등록일</dt>
                      <dd className="mt-1 font-semibold text-slate-200">
                        {formatDate(jobPost.createdAt)}
                      </dd>
                    </div>
                  </dl>

                  {jobPost.memo ? (
                    <p className="mt-4 rounded-xl bg-slate-900 p-3 text-sm leading-6 text-slate-300">
                      {jobPost.memo}
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