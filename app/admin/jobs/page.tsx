import Link from "next/link";

import { AdminCard } from "../_components/AdminCard";
import { AdminContent } from "../_components/AdminContent";
import { AdminInfoGrid, AdminInfoItem } from "../_components/AdminInfoItem";
import { AdminLogoutButton } from "../_components/AdminLogoutButton";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { AdminPageShell } from "../_components/AdminPageShell";
import { AdminSection } from "../_components/AdminSection";
import { getJobPosts } from "../../../features/jobs/server/get-job-posts";
import type { JobPost } from "../../../features/jobs/types/job-post.types";
import { requireAdminAuth } from "../../../server/security/admin-auth";

export const metadata = {
  title: "구인공고 목록 | Fieldpool 관리자",
  description: "Fieldpool 관리자 구인공고 목록 화면입니다.",
};

const JOB_STATUS_LABELS: Record<JobPost["status"], string> = {
  open: "모집중",
  paused: "일시중지",
  closed: "마감",
};

const JOB_STATUS_CLASS_NAMES: Record<JobPost["status"], string> = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-700",
  paused: "border-amber-200 bg-amber-50 text-amber-700",
  closed: "border-slate-200 bg-slate-100 text-slate-600",
};

const JOB_SOURCE_LABELS: Record<JobPost["sourceType"], string> = {
  manual: "직접 등록",
  external: "외부 후보",
};

function formatDate(value: Date | string | null) {
  if (!value) {
    return "-";
  }

  return new Date(value).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
}

function formatCurrency(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${value.toLocaleString("ko-KR")}원`;
}

function formatCount(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${value.toLocaleString("ko-KR")}명`;
}

function formatCareerYears(value: number | null) {
  if (value === null) {
    return "-";
  }

  if (value === 0) {
    return "무관";
  }

  return `${value}년 이상`;
}

function formatBoolean(value: boolean) {
  return value ? "필요" : "무관";
}

function formatLodging(value: boolean) {
  return value ? "제공" : "미제공";
}

function JobSummaryCard({
  description,
  label,
  value,
}: {
  description: string;
  label: string;
  value: string;
}) {
  return (
    <AdminCard>
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
        {value}
      </p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </AdminCard>
  );
}

function JobPostCard({ jobPost }: { jobPost: JobPost }) {
  return (
    <AdminCard
      as="article"
      className="transition hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={[
                "inline-flex rounded-full border px-3 py-1 text-xs font-semibold",
                JOB_STATUS_CLASS_NAMES[jobPost.status],
              ].join(" ")}
            >
              {JOB_STATUS_LABELS[jobPost.status]}
            </span>

            <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              {JOB_SOURCE_LABELS[jobPost.sourceType]}
            </span>
          </div>

          <div>
            <h2 className="truncate text-xl font-bold tracking-tight text-slate-950">
              {jobPost.title}
            </h2>
            <p className="mt-2 text-sm font-medium text-slate-600">
              {jobPost.siteName || "현장명 미입력"}
            </p>
          </div>
        </div>

        <Link
          href={`/admin/jobs/${jobPost.id}`}
          className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
        >
          상세 보기
        </Link>
      </div>

      <div className="mt-5">
        <AdminInfoGrid>
          <AdminInfoItem label="지역" value={jobPost.region || "-"} />
          <AdminInfoItem
            label="공종"
            value={
              jobPost.jobTypes.length > 0 ? jobPost.jobTypes.join(", ") : "-"
            }
          />
          <AdminInfoItem
            label="필요 인원"
            value={formatCount(jobPost.neededCount)}
          />
          <AdminInfoItem label="일당" value={formatCurrency(jobPost.pay)} />
          <AdminInfoItem
            label="근무 시작"
            value={formatDate(jobPost.startDate)}
          />
          <AdminInfoItem label="근무 종료" value={formatDate(jobPost.endDate)} />
          <AdminInfoItem
            label="필요 경력"
            value={formatCareerYears(jobPost.careerYears)}
          />
          <AdminInfoItem
            label="차량"
            value={formatBoolean(jobPost.requiresVehicle)}
          />
          <AdminInfoItem
            label="숙소"
            value={formatLodging(jobPost.providesLodging)}
          />
          <AdminInfoItem label="등록일" value={formatDate(jobPost.createdAt)} />
        </AdminInfoGrid>
      </div>

      {jobPost.memo ? (
        <div className="mt-5 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
          <p className="text-xs font-medium text-slate-500">메모</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {jobPost.memo}
          </p>
        </div>
      ) : null}
    </AdminCard>
  );
}

export default async function AdminJobsPage() {
  await requireAdminAuth();

  const jobPosts = await getJobPosts();
  const latestJobPost = jobPosts[0] ?? null;
  const openJobPostCount = jobPosts.filter(
    (jobPost) => jobPost.status === "open",
  ).length;

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="구인공고 관리"
        title="구인공고 목록"
        description="등록된 현장 구인공고의 모집 상태, 공종, 지역, 근무 조건을 확인하고 작업자 매칭으로 이어갈 수 있습니다."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/workers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              작업자 목록으로
            </Link>
            <Link
              href="/admin/external-jobs"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              외부 공고 후보
            </Link>
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              구인공고 등록
            </Link>
            <AdminLogoutButton />
          </div>
        }
      />

      <AdminContent>
        <section className="grid gap-4 md:grid-cols-3">
          <JobSummaryCard
            label="등록 공고"
            value={`${jobPosts.length.toLocaleString("ko-KR")}건`}
            description="관리자 화면에 등록된 전체 구인공고 수입니다."
          />
          <JobSummaryCard
            label="모집중"
            value={`${openJobPostCount.toLocaleString("ko-KR")}건`}
            description="현재 작업자 매칭을 진행할 수 있는 공고입니다."
          />
          <JobSummaryCard
            label="최근 공고"
            value={latestJobPost?.title ?? "-"}
            description="가장 최근 등록된 구인공고를 기준으로 표시합니다."
          />
        </section>

        <AdminSection
          eyebrow="관리 안내"
          title="공고 상태 관리"
          description="모집중, 일시중지, 마감 상태는 공고 상세 화면에서 변경합니다. 목록에서는 공고 조건과 등록 상태를 먼저 확인한 뒤 상세 보기로 이동하세요."
          tone="blue"
        >
          <p className="text-sm leading-6 text-blue-900">
            작업자 매칭은 상세 화면에서 확인합니다. 조건이 맞더라도 작업자 상태가
            비활성이면 확인 대상으로 분류됩니다.
          </p>
        </AdminSection>

        {jobPosts.length > 0 ? (
          <section className="grid gap-4">
            {jobPosts.map((jobPost) => (
              <JobPostCard key={jobPost.id} jobPost={jobPost} />
            ))}
          </section>
        ) : (
          <AdminCard tone="dashed" className="text-center">
            <p className="text-lg font-bold text-slate-950">
              등록된 구인공고가 없습니다.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              새 구인공고를 등록하면 이곳에서 모집 상태와 현장 조건을 확인할 수 있습니다.
            </p>
            <div className="mt-5">
              <Link
                href="/admin/jobs/new"
                className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
              >
                구인공고 등록
              </Link>
            </div>
          </AdminCard>
        )}
      </AdminContent>
    </AdminPageShell>
  );
}