import Link from "next/link";

import { getConstructionJobList } from "../../../features/external-jobs/server/get-construction-job-list";
import type { ExternalConstructionJobListItem } from "../../../features/external-jobs/types/construction-job-api.types";
import { requireAdminAuth } from "../../../server/security/admin-auth";
import { AdminCard } from "../_components/AdminCard";
import { AdminContent } from "../_components/AdminContent";
import { AdminInfoItem } from "../_components/AdminInfoItem";
import { AdminLogoutButton } from "../_components/AdminLogoutButton";
import { AdminPageHeader } from "../_components/AdminPageHeader";
import { AdminPageShell } from "../_components/AdminPageShell";
import { AdminSection } from "../_components/AdminSection";

export const dynamic = "force-dynamic";

export default async function AdminExternalJobsPage() {
  await requireAdminAuth();

  const result = await getExternalJobsSafely();

  return (
    <AdminPageShell>
      <AdminPageHeader
        eyebrow="건설근로자공제회 OpenAPI"
        title="외부 구인 공고 후보"
        description="외부 API에서 가져온 건설 구인 공고입니다. 아직 Fieldpool 내부 공고로 저장된 데이터는 아닙니다."
        actions={
          <>
            <Link
              href="/admin/workers"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              작업자 목록
            </Link>
            <Link
              href="/admin/jobs"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
            >
              구인 공고 목록
            </Link>
            <AdminLogoutButton />
          </>
        }
      />

      <AdminContent>
        {result.error ? (
          <AdminCard tone="red">
            <h2 className="text-lg font-bold text-red-700">
              외부 공고를 불러오지 못했습니다.
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              API 인증키, 공공데이터포털 승인 상태, 네트워크 연결을
              확인하세요.
            </p>
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
              {result.error}
            </p>
          </AdminCard>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-3">
              <SummaryCard label="전체 조회 건수" value={result.totalCount} />
              <SummaryCard label="현재 페이지" value={result.pageNo} />
              <SummaryCard label="표시 개수" value={result.items.length} />
            </section>

            <AdminSection
              title="외부 공고 목록"
              description="공공 API에서 조회한 원본 공고 후보입니다. 내부 구인공고로 저장된 데이터와 구분해서 확인하세요."
            >
              {result.items.length === 0 ? (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  조회된 외부 공고가 없습니다.
                </p>
              ) : (
                <div className="grid gap-4">
                  {result.items.map((job) => (
                    <ExternalJobCard key={job.externalId} job={job} />
                  ))}
                </div>
              )}
            </AdminSection>
          </>
        )}
      </AdminContent>
    </AdminPageShell>
  );
}

type ExternalJobsPageResult = {
  totalCount: number;
  pageNo: number;
  numOfRows: number;
  items: ExternalConstructionJobListItem[];
  error: string | null;
};

async function getExternalJobsSafely(): Promise<ExternalJobsPageResult> {
  try {
    const result = await getConstructionJobList({
      pageNo: 1,
      numOfRows: 10,
    });

    return {
      ...result,
      error: null,
    };
  } catch (error) {
    return {
      totalCount: 0,
      pageNo: 1,
      numOfRows: 10,
      items: [],
      error:
        error instanceof Error
          ? error.message
          : "알 수 없는 오류가 발생했습니다.",
    };
  }
}

type SummaryCardProps = {
  label: string;
  value: string | number;
};

function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <AdminCard>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
    </AdminCard>
  );
}

type ExternalJobCardProps = {
  job: ExternalConstructionJobListItem;
};

function ExternalJobCard({ job }: ExternalJobCardProps) {
  return (
    <AdminCard>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-500">
            {job.companyName || "회사명 없음"}
          </p>
          <h3 className="mt-2 text-lg font-bold text-slate-950">
            {job.title || "공고명 없음"}
          </h3>
        </div>

        <span className="w-fit rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
          {job.region || "지역 없음"}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <AdminInfoItem label="외부 공고번호" value={job.externalId} />
        <AdminInfoItem label="직종번호" value={job.jobCode || "-"} />
        <AdminInfoItem label="임금종류" value={job.wageType || "-"} />
        <AdminInfoItem label="희망임금" value={formatPay(job.wageAmount)} />
        <AdminInfoItem label="경력" value={formatCareer(job)} />
        <AdminInfoItem label="LH공사" value={job.isLhProject ? "Y" : "N"} />
        <AdminInfoItem label="주소1" value={job.address1 || "-"} />
        <AdminInfoItem label="주소2" value={job.address2 || "-"} />
        <AdminInfoItem label="등록일" value={job.registeredDate || "-"} />
        <AdminInfoItem label="마감일" value={job.deadlineDate || "-"} />
      </dl>
    </AdminCard>
  );
}

function formatPay(value: number | null) {
  if (value === null) {
    return "-";
  }

  return `${value.toLocaleString("ko-KR")}원`;
}

function formatCareer(job: ExternalConstructionJobListItem) {
  if (job.careerYear === null && job.careerMonth === null) {
    return job.careerType || "-";
  }

  return `${job.careerYear ?? 0}년 ${job.careerMonth ?? 0}개월`;
}