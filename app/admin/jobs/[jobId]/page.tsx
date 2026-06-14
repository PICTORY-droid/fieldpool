import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminLogoutButton } from "../../_components/AdminLogoutButton";
import { getJobPost } from "../../../../features/jobs/server/get-job-post";
import { requireAdminAuth } from "../../../../server/security/admin-auth";

const JOB_POST_STATUS_LABELS: Record<string, string> = {
  open: "모집중",
  paused: "일시중지",
  closed: "마감",
};

const JOB_POST_SOURCE_LABELS: Record<string, string> = {
  manual: "직접 등록",
  external: "외부 공고",
};

type AdminJobDetailPageProps = {
  params: Promise<{
    jobId: string;
  }>;
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

function formatNeededCount(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${value}명`;
}

function formatCareerYears(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-";
  }

  return `${value}년 이상`;
}

function formatVehicle(value: boolean) {
  return value ? "필요" : "무관";
}

function formatLodging(value: boolean) {
  return value ? "제공" : "미제공";
}

export default async function AdminJobDetailPage({
  params,
}: AdminJobDetailPageProps) {
  await requireAdminAuth();

  const { jobId } = await params;
  const jobPost = await getJobPost(jobId);

  if (!jobPost) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Fieldpool 관리자
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">
                  {JOB_POST_STATUS_LABELS[jobPost.status] ?? jobPost.status}
                </span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-300">
                  {JOB_POST_SOURCE_LABELS[jobPost.sourceType] ??
                    jobPost.sourceType}
                </span>
              </div>
              <h1 className="mt-3 text-3xl font-bold tracking-tight">
                {jobPost.title}
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                구인 공고 상세 정보와 앞으로 연결할 매칭 작업자 영역을
                확인합니다.
              </p>
            </div>

            <AdminLogoutButton />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/jobs"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              구인 공고 목록으로
            </Link>
            <Link
              href="/admin/jobs/new"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              새 공고 등록
            </Link>
            <Link
              href="/admin/workers"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              작업자 목록으로
            </Link>
          </div>
        </header>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div>
            <h2 className="text-xl font-bold">기본 정보</h2>
            <p className="mt-1 text-sm text-slate-400">
              현장과 공고 출처를 확인합니다.
            </p>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">공고명</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {jobPost.title}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">현장명</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {jobPost.siteName || "-"}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">지역</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {jobPost.region || "-"}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4 sm:col-span-2 lg:col-span-3">
              <dt className="text-slate-500">주소</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {jobPost.address || "-"}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">상태</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {JOB_POST_STATUS_LABELS[jobPost.status] ?? jobPost.status}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">등록 방식</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {JOB_POST_SOURCE_LABELS[jobPost.sourceType] ??
                  jobPost.sourceType}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">등록일</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatDate(jobPost.createdAt)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div>
            <h2 className="text-xl font-bold">모집 조건</h2>
            <p className="mt-1 text-sm text-slate-400">
              작업자 자동 매칭에 사용할 조건입니다.
            </p>
          </div>

          <dl className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">필요 공종</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {jobPost.jobTypes.length > 0
                  ? jobPost.jobTypes.join(", ")
                  : "-"}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">필요 인원</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatNeededCount(jobPost.neededCount)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">일당</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatPay(jobPost.pay)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">시작일</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatDate(jobPost.startDate)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">종료일</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatDate(jobPost.endDate)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">필요 경력</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatCareerYears(jobPost.careerYears)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">차량</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatVehicle(jobPost.requiresVehicle)}
              </dd>
            </div>

            <div className="rounded-xl bg-slate-950/60 p-4">
              <dt className="text-slate-500">숙소</dt>
              <dd className="mt-1 font-semibold text-slate-100">
                {formatLodging(jobPost.providesLodging)}
              </dd>
            </div>
          </dl>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div>
            <h2 className="text-xl font-bold">메모</h2>
            <p className="mt-1 text-sm text-slate-400">
              관리자 참고사항입니다.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-sm leading-6 text-slate-300">
            {jobPost.memo || "등록된 메모가 없습니다."}
          </div>
        </section>

        <section className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <div>
            <h2 className="text-xl font-bold">매칭 작업자</h2>
            <p className="mt-1 text-sm text-slate-400">
              다음 작업에서 공고 조건과 작업자 정보를 비교해 자동 매칭 목록을
              표시합니다.
            </p>
          </div>

          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-950/40 p-8 text-center">
            <p className="text-base font-semibold text-slate-200">
              아직 매칭 기능이 연결되지 않았습니다.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              지역, 공종, 경력, 차량, 숙소 조건으로 작업자를 골라 표시할
              예정입니다.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}