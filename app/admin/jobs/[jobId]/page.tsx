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
import { JOB_POST_STATUS_LABELS } from "../../../../features/jobs/constants/job-post-status";
import { matchWorkersToJob } from "../../../../features/jobs/matching/match-workers-to-job";
import { getJobPost } from "../../../../features/jobs/server/get-job-post";
import { getWorkerRecords } from "../../../../features/workers/server/get-worker-records";
import { WORKER_STATUS_LABELS } from "../../../../features/workers/constants/worker-status";
import { requireAdminAuth } from "../../../../server/security/admin-auth";
import { AdminJobDangerZone } from "./_components/AdminJobDangerZone";
import { AdminJobStatusForm } from "./_components/AdminJobStatusForm";

export const dynamic = "force-dynamic";

const JOB_POST_SOURCE_LABELS: Record<string, string> = {
  manual: "직접 등록",
  external: "외부 공고",
};

const JOB_POST_STATUS_CLASS_NAMES: Record<string, string> = {
  open: "border-emerald-200 bg-emerald-50 text-emerald-700",
  paused: "border-amber-200 bg-amber-50 text-amber-700",
  closed: "border-slate-200 bg-slate-100 text-slate-600",
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

  return `${value.toLocaleString("ko-KR")}명`;
}

function formatCareerYears(value: number | null | undefined) {
  if (value === null || value === undefined) {
    return "-";
  }

  if (value === 0) {
    return "무관";
  }

  return `${value}년 이상`;
}

function formatVehicle(value: boolean) {
  return value ? "필요" : "무관";
}

function formatLodging(value: boolean) {
  return value ? "제공" : "미제공";
}

function formatWorkerVehicle(value: boolean) {
  return value ? "가능" : "없음";
}

function formatWorkerLodging(value: boolean) {
  return value ? "가능" : "불가";
}

function formatWorkerStatus(status: string) {
  return (
    WORKER_STATUS_LABELS[status as keyof typeof WORKER_STATUS_LABELS] ?? status
  );
}

function formatJobStatus(status: string) {
  return (
    JOB_POST_STATUS_LABELS[status as keyof typeof JOB_POST_STATUS_LABELS] ??
    status
  );
}

function MatchReasonBox({
  label,
  tone,
  value,
}: {
  label: string;
  tone: "blue" | "amber";
  value: string;
}) {
  const className =
    tone === "blue"
      ? "rounded-2xl border border-blue-100 bg-blue-50 p-4"
      : "rounded-2xl border border-amber-100 bg-amber-50 p-4";

  const labelClassName =
    tone === "blue"
      ? "text-sm font-bold text-blue-800"
      : "text-sm font-bold text-amber-800";

  const valueClassName =
    tone === "blue"
      ? "mt-2 text-sm leading-6 text-blue-900"
      : "mt-2 text-sm leading-6 text-amber-900";

  return (
    <div className={className}>
      <p className={labelClassName}>{label}</p>
      <p className={valueClassName}>{value}</p>
    </div>
  );
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

  const workers = await getWorkerRecords();
  const workerMatches = matchWorkersToJob(jobPost, workers);
  const exactMatchCount = workerMatches.filter((match) => match.isMatch).length;

  return (
    <AdminPageShell>
      <AdminBreadcrumbs
        items={[
          { href: "/admin/jobs", label: "구인공고 목록" },
          { label: jobPost.title },
        ]}
      />

      <AdminPageHeader
        eyebrow="구인공고 상세"
        title={jobPost.title}
        description="구인공고의 현장 조건, 모집 상태, 작업자 매칭 결과를 확인합니다."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/jobs/new"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              새 공고 등록
            </Link>

            <Link
              href="/admin/workers"
              className="inline-flex items-center justify-center rounded-2xl border border-white/30 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              작업자 목록
            </Link>

            <AdminLogoutButton />
          </div>
        }
      />

      <AdminContent>
        <section className="grid gap-4 md:grid-cols-3">
          <AdminCard>
            <p className="text-sm font-medium text-slate-500">모집 상태</p>
            <div className="mt-3">
              <span
                className={[
                  "inline-flex rounded-full border px-3 py-1 text-sm font-bold",
                  JOB_POST_STATUS_CLASS_NAMES[jobPost.status] ??
                    "border-slate-200 bg-slate-100 text-slate-600",
                ].join(" ")}
              >
                {formatJobStatus(jobPost.status)}
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              상태 변경은 아래 상태 저장 영역에서 처리합니다.
            </p>
          </AdminCard>

          <AdminCard>
            <p className="text-sm font-medium text-slate-500">전체 후보</p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {workerMatches.length.toLocaleString("ko-KR")}명
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              등록된 작업자 중 조건 비교 대상입니다.
            </p>
          </AdminCard>

          <AdminCard>
            <p className="text-sm font-medium text-slate-500">완전 일치</p>
            <p className="mt-3 text-2xl font-bold tracking-tight text-slate-950">
              {exactMatchCount.toLocaleString("ko-KR")}명
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              지역, 공종, 경력, 차량, 숙소 조건이 맞는 작업자입니다.
            </p>
          </AdminCard>
        </section>

        <AdminJobStatusForm
          jobPostId={jobPost.id}
          currentStatus={jobPost.status}
        />

        <AdminSection eyebrow="기본 정보" title="현장과 공고 정보">
          <AdminInfoGrid>
            <AdminInfoItem label="공고명" value={jobPost.title} />
            <AdminInfoItem label="현장명" value={jobPost.siteName || "-"} />
            <AdminInfoItem label="지역" value={jobPost.region || "-"} />
            <AdminInfoItem label="주소" value={jobPost.address || "-"} />
            <AdminInfoItem label="상태" value={formatJobStatus(jobPost.status)} />
            <AdminInfoItem
              label="등록 방식"
              value={
                JOB_POST_SOURCE_LABELS[jobPost.sourceType] ??
                jobPost.sourceType
              }
            />
            <AdminInfoItem label="등록일" value={formatDate(jobPost.createdAt)} />
          </AdminInfoGrid>
        </AdminSection>

        <AdminSection eyebrow="모집 조건" title="작업자 매칭 조건">
          <AdminInfoGrid>
            <AdminInfoItem
              label="필요 공종"
              value={
                jobPost.jobTypes.length > 0 ? jobPost.jobTypes.join(", ") : "-"
              }
            />
            <AdminInfoItem
              label="필요 인원"
              value={formatNeededCount(jobPost.neededCount)}
            />
            <AdminInfoItem label="일당" value={formatPay(jobPost.pay)} />
            <AdminInfoItem label="시작일" value={formatDate(jobPost.startDate)} />
            <AdminInfoItem label="종료일" value={formatDate(jobPost.endDate)} />
            <AdminInfoItem
              label="필요 경력"
              value={formatCareerYears(jobPost.careerYears)}
            />
            <AdminInfoItem label="차량" value={formatVehicle(jobPost.requiresVehicle)} />
            <AdminInfoItem label="숙소" value={formatLodging(jobPost.providesLodging)} />
          </AdminInfoGrid>
        </AdminSection>

        <AdminSection eyebrow="메모" title="관리자 참고사항">
          <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
              {jobPost.memo || "등록된 메모가 없습니다."}
            </p>
          </div>
        </AdminSection>

        <AdminCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <AdminSectionHeader
              eyebrow="매칭 작업자"
              title="작업자 조건 비교"
              description="지역, 공종, 경력, 차량, 숙소 조건으로 작업자를 비교합니다."
            />

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
                완전 일치 {exactMatchCount}명
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                전체 후보 {workerMatches.length}명
              </span>
            </div>
          </div>

          {workerMatches.length === 0 ? (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
              <p className="text-base font-semibold text-slate-900">
                등록된 작업자가 없습니다.
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                /register 화면에서 작업자를 등록하면 이곳에 매칭 결과가 표시됩니다.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4">
              {workerMatches.map((match) => (
                <article
                  key={match.worker.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span
                          className={
                            match.isMatch
                              ? "rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700"
                              : "rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700"
                          }
                        >
                          {match.isMatch ? "완전 일치" : "조건 확인 필요"}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                          점수 {match.score}
                        </span>
                        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                          {formatWorkerStatus(match.worker.status)}
                        </span>
                      </div>

                      <h3 className="mt-3 text-xl font-bold text-slate-950">
                        {match.worker.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {match.worker.phone}
                      </p>
                    </div>

                    <Link
                      href={`/admin/workers/${match.worker.id}`}
                      className="inline-flex items-center justify-center rounded-2xl bg-blue-700 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
                    >
                      작업자 상세
                    </Link>
                  </div>

                  <div className="mt-5">
                    <AdminInfoGrid>
                      <AdminInfoItem
                        label="주 근무지역"
                        value={match.worker.mainRegion || "-"}
                      />
                      <AdminInfoItem
                        label="가능 지역"
                        value={
                          match.worker.availableRegions.length > 0
                            ? match.worker.availableRegions.join(", ")
                            : "-"
                        }
                      />
                      <AdminInfoItem
                        label="공종"
                        value={
                          match.worker.jobTypes.length > 0
                            ? match.worker.jobTypes.join(", ")
                            : "-"
                        }
                      />
                      <AdminInfoItem
                        label="경력"
                        value={
                          match.worker.careerYears === null
                            ? "-"
                            : `${match.worker.careerYears}년`
                        }
                      />
                      <AdminInfoItem
                        label="희망 일당"
                        value={formatPay(match.worker.desiredPay)}
                      />
                      <AdminInfoItem
                        label="차량"
                        value={formatWorkerVehicle(match.worker.hasVehicle)}
                      />
                      <AdminInfoItem
                        label="숙소"
                        value={formatWorkerLodging(match.worker.canLodging)}
                      />
                    </AdminInfoGrid>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <MatchReasonBox
                      label="맞는 조건"
                      tone="blue"
                      value={
                        match.matchedReasons.length > 0
                          ? match.matchedReasons.join(", ")
                          : "-"
                      }
                    />

                    <MatchReasonBox
                      label="확인할 조건"
                      tone="amber"
                      value={
                        match.unmatchedReasons.length > 0
                          ? match.unmatchedReasons.join(", ")
                          : "-"
                      }
                    />
                  </div>
                </article>
              ))}
            </div>
          )}
        </AdminCard>

        <AdminJobDangerZone jobPostId={jobPost.id} />
      </AdminContent>
    </AdminPageShell>
  );
}