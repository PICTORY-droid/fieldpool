import Link from "next/link";

import { AdminBreadcrumbs } from "../../_components/AdminBreadcrumbs";
import { AdminContent } from "../../_components/AdminContent";
import { AdminLogoutButton } from "../../_components/AdminLogoutButton";
import { AdminPageHeader } from "../../_components/AdminPageHeader";
import { AdminPageShell } from "../../_components/AdminPageShell";
import { createJobPostAction } from "../../../../features/jobs/actions/create-job-post-action";
import { requireAdminAuth } from "../../../../server/security/admin-auth";
import { AdminJobCreateSubmitButton } from "./_components/AdminJobCreateSubmitButton";

const REGION_OPTIONS = [
  "서울",
  "경기",
  "인천",
  "강원",
  "충북",
  "충남",
  "세종",
  "대전",
  "전북",
  "전남",
  "광주",
  "경북",
  "경남",
  "대구",
  "울산",
  "부산",
  "제주",
];

const JOB_TYPE_OPTIONS = [
  "철근",
  "목수",
  "형틀",
  "비계",
  "타설",
  "미장",
  "방수",
  "도장",
  "전기",
  "설비",
  "용접",
  "안전",
  "보통인부",
];

function FieldSection({
  children,
  description,
  title,
}: {
  children: React.ReactNode;
  description: string;
  title: string;
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div>
        <p className="text-sm font-semibold text-blue-700">입력 항목</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>

      <div className="mt-5">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  name,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function NumberInput({
  label,
  min,
  name,
  placeholder,
}: {
  label: string;
  min: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        type="number"
        min={min}
        placeholder={placeholder}
        className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

function DateInput({ label, name }: { label: string; name: string }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <input
        name={name}
        type="date"
        className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />
    </label>
  );
}

export default async function AdminNewJobPage() {
  await requireAdminAuth();

  return (
    <AdminPageShell>
      <AdminBreadcrumbs
        items={[
          { href: "/admin/jobs", label: "구인공고 목록" },
          { label: "새 구인공고 등록" },
        ]}
      />

      <AdminPageHeader
        eyebrow="구인공고 등록"
        title="새 구인공고 등록"
        description="현장명, 지역, 공종, 인원, 일당 조건을 입력해 내부 구인공고를 등록합니다."
        actions={
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin/jobs"
              className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-2 text-sm font-semibold text-blue-800 shadow-sm transition hover:bg-blue-50"
            >
              구인공고 목록
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
        <form action={createJobPostAction} className="grid gap-5">
          <FieldSection
            title="기본 정보"
            description="관리자 목록과 상세 화면에 먼저 표시되는 현장 기본 정보입니다."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput
                name="title"
                label="공고명"
                required
                placeholder="예, 세종 철근 작업자 모집"
              />

              <TextInput
                name="siteName"
                label="현장명"
                placeholder="예, 세종 공동주택 현장"
              />

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  지역
                </span>
                <select
                  name="region"
                  defaultValue=""
                  className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                >
                  <option value="">지역 선택</option>
                  {REGION_OPTIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>

              <TextInput
                name="address"
                label="주소"
                placeholder="예, 세종특별자치시 조치원읍"
              />
            </div>
          </FieldSection>

          <FieldSection
            title="모집 조건"
            description="작업자 매칭에 사용할 공종, 인원, 기간, 경력 조건입니다."
          >
            <div className="grid gap-5">
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  필요 공종
                </span>
                <div className="grid gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 md:grid-cols-3">
                  {JOB_TYPE_OPTIONS.map((jobType) => (
                    <label
                      key={jobType}
                      className="flex items-center gap-2 text-sm font-medium text-slate-700"
                    >
                      <input
                        name="jobTypes"
                        type="checkbox"
                        value={jobType}
                        className="h-4 w-4 rounded border-slate-300"
                      />
                      <span>{jobType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <NumberInput
                  name="neededCount"
                  label="필요 인원"
                  min="1"
                  placeholder="예, 3"
                />

                <NumberInput
                  name="pay"
                  label="일당"
                  min="0"
                  placeholder="예, 180000"
                />

                <DateInput name="startDate" label="시작일" />

                <DateInput name="endDate" label="종료일" />

                <NumberInput
                  name="careerYears"
                  label="필요 경력"
                  min="0"
                  placeholder="예, 3"
                />

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-700">
                    공고 상태
                  </span>
                  <select
                    name="status"
                    defaultValue="open"
                    className="rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  >
                    <option value="open">모집중</option>
                    <option value="paused">일시중지</option>
                    <option value="closed">마감</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-blue-950">
                  <input
                    name="requiresVehicle"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 rounded border-blue-300"
                  />
                  차량 보유 작업자 필요
                </label>

                <label className="flex items-center gap-3 text-sm font-semibold text-blue-950">
                  <input
                    name="providesLodging"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 rounded border-blue-300"
                  />
                  숙소 제공
                </label>
              </div>
            </div>
          </FieldSection>

          <FieldSection
            title="메모"
            description="관리자만 확인할 현장 조건이나 참고사항을 입력합니다."
          >
            <textarea
              name="memo"
              rows={5}
              placeholder="예, 출근 시간, 준비물, 현장 담당자 참고사항"
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </FieldSection>

          <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:justify-end sm:p-6">
            <Link
              href="/admin/jobs"
              className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-300 hover:text-blue-800"
            >
              취소
            </Link>

            <AdminJobCreateSubmitButton />
          </div>
        </form>
      </AdminContent>
    </AdminPageShell>
  );
}