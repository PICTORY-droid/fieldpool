import Link from "next/link";
import { notFound } from "next/navigation";

import { getWorkerRecord } from "../../../../features/workers/server/get-worker-record";

export const dynamic = "force-dynamic";

type AdminWorkerDetailPageProps = {
  params: Promise<{
    workerId: string;
  }>;
};

export default async function AdminWorkerDetailPage({
  params,
}: AdminWorkerDetailPageProps) {
  const { workerId } = await params;
  const worker = await getWorkerRecord(workerId);

  if (!worker) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-neutral-100 px-4 py-6 text-neutral-950">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="rounded-3xl bg-white p-5 shadow-sm">
          <Link
            href="/admin/workers"
            className="text-sm font-semibold text-neutral-600"
          >
            ← 작업자 목록으로
          </Link>

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

            <span className="w-fit rounded-full bg-neutral-100 px-3 py-1 text-sm font-semibold text-neutral-700">
              {worker.status}
            </span>
          </div>
        </header>

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
            <InfoItem label="상태" value={worker.status} />
            <InfoItem
              label="개인정보 동의"
              value={worker.consentPrivacy ? "동의" : "미동의"}
            />
            <InfoItem label="등록일" value={formatDateTime(worker.createdAt)} />
            <InfoItem label="수정일" value={formatDateTime(worker.updatedAt)} />
          </dl>
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

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("ko-KR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}