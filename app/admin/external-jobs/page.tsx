import Link from "next/link";

import { getConstructionJobList } from "../../../features/external-jobs/server/get-construction-job-list";
import type { ExternalConstructionJobListItem } from "../../../features/external-jobs/types/construction-job-api.types";
import { requireAdminAuth } from "../../../server/security/admin-auth";
import { AdminLogoutButton } from "../_components/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminExternalJobsPage() {
  await requireAdminAuth();

  const result = await getExternalJobsSafely();

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 text-neutral-950">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
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

          <div className="mt-4">
            <p className="text-sm font-semibold text-neutral-500">
              건설근로자공제회 OpenAPI
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight">
              외부 구인 공고 후보
            </h1>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              외부 API에서 가져온 건설 구인 공고입니다. 아직 Fieldpool 내부
              공고로 저장된 데이터는 아닙니다.
            </p>
          </div>
        </header>

        {result.error ? (
          <section className="rounded-3xl border border-red-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-red-700">
              외부 공고를 불러오지 못했습니다.
            </h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">
              API 인증키, 공공데이터포털 승인 상태, 네트워크 연결을 확인하세요.
            </p>
            <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold leading-6 text-red-800">
              {result.error}
            </p>
          </section>
        ) : (
          <>
            <section className="grid gap-3 sm:grid-cols-3">
              <SummaryCard label="전체 조회 건수" value={result.totalCount} />
              <SummaryCard label="현재 페이지" value={result.pageNo} />
              <SummaryCard label="표시 개수" value={result.items.length} />
            </section>

            <section className="rounded-3xl bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold">외부 공고 목록</h2>

              {result.items.length === 0 ? (
                <p className="mt-4 rounded-2xl bg-neutral-50 p-4 text-sm leading-6 text-neutral-600">
                  조회된 외부 공고가 없습니다.
                </p>
              ) : (
                <div className="mt-4 grid gap-4">
                  {result.items.map((job) => (
                    <ExternalJobCard key={job.externalId} job={job} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
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
    <div className="rounded-3xl bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-neutral-950">{value}</p>
    </div>
  );
}

type ExternalJobCardProps = {
  job: ExternalConstructionJobListItem;
};

function ExternalJobCard({ job }: ExternalJobCardProps) {
  return (
    <article className="rounded-3xl border border-neutral-200 p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-neutral-500">
            {job.companyName || "회사명 없음"}
          </p>
          <h3 className="mt-2 text-lg font-bold text-neutral-950">
            {job.title || "공고명 없음"}
          </h3>
        </div>

        <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
          {job.region || "지역 없음"}
        </span>
      </div>

      <dl className="mt-4 grid gap-3 sm:grid-cols-2">
        <InfoItem label="외부 공고번호" value={job.externalId} />
        <InfoItem label="직종번호" value={job.jobCode || "-"} />
        <InfoItem label="임금종류" value={job.wageType || "-"} />
        <InfoItem label="희망임금" value={formatPay(job.wageAmount)} />
        <InfoItem label="경력" value={formatCareer(job)} />
        <InfoItem label="LH공사" value={job.isLhProject ? "Y" : "N"} />
        <InfoItem label="주소1" value={job.address1 || "-"} />
        <InfoItem label="주소2" value={job.address2 || "-"} />
        <InfoItem label="등록일" value={job.registeredDate || "-"} />
        <InfoItem label="마감일" value={job.deadlineDate || "-"} />
      </dl>
    </article>
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