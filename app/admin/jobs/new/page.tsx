import Link from "next/link";

import { AdminLogoutButton } from "../../_components/AdminLogoutButton";
import { requireAdminAuth } from "../../../../server/security/admin-auth";

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

export default async function AdminNewJobPage() {
  await requireAdminAuth();

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-8 text-slate-100">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <header className="flex flex-col gap-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/30">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">
                Fieldpool 관리자
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight">
                새 구인 공고 등록
              </h1>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                현장명, 지역, 공종, 인원, 일당 조건을 입력해 내부 구인 공고
                등록을 준비합니다.
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
              href="/admin/workers"
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              작업자 목록으로
            </Link>
          </div>
        </header>

        <form className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <section className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold">기본 정보</h2>
              <p className="mt-1 text-sm text-slate-400">
                관리자 화면과 매칭 기준에 먼저 쓰이는 정보입니다.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  공고명
                </span>
                <input
                  name="title"
                  type="text"
                  placeholder="예, 세종 철근 작업자 모집"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  현장명
                </span>
                <input
                  name="siteName"
                  type="text"
                  placeholder="예, 세종 공동주택 현장"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                />
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  지역
                </span>
                <select
                  name="region"
                  defaultValue=""
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                >
                  <option value="" disabled>
                    지역 선택
                  </option>
                  {REGION_OPTIONS.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  주소
                </span>
                <input
                  name="address"
                  type="text"
                  placeholder="예, 세종특별자치시 조치원읍"
                  className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                />
              </label>
            </div>
          </section>

          <section className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold">모집 조건</h2>
              <p className="mt-1 text-sm text-slate-400">
                작업자 자동 매칭에 사용할 조건입니다.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-2">
                <span className="text-sm font-semibold text-slate-200">
                  필요 공종
                </span>
                <div className="grid gap-2 rounded-2xl border border-slate-800 bg-slate-950/50 p-4 sm:grid-cols-2 md:grid-cols-3">
                  {JOB_TYPE_OPTIONS.map((jobType) => (
                    <label
                      key={jobType}
                      className="flex items-center gap-2 text-sm text-slate-300"
                    >
                      <input
                        name="jobTypes"
                        type="checkbox"
                        value={jobType}
                        className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                      />
                      <span>{jobType}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    필요 인원
                  </span>
                  <input
                    name="neededCount"
                    type="number"
                    min="1"
                    placeholder="예, 3"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    일당
                  </span>
                  <input
                    name="pay"
                    type="number"
                    min="0"
                    placeholder="예, 180000"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    시작일
                  </span>
                  <input
                    name="startDate"
                    type="date"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    종료일
                  </span>
                  <input
                    name="endDate"
                    type="date"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    필요 경력
                  </span>
                  <input
                    name="careerYears"
                    type="number"
                    min="0"
                    placeholder="예, 3"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
                  />
                </label>

                <label className="grid gap-2">
                  <span className="text-sm font-semibold text-slate-200">
                    공고 상태
                  </span>
                  <select
                    name="status"
                    defaultValue="open"
                    className="rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-300"
                  >
                    <option value="open">모집중</option>
                    <option value="paused">일시중지</option>
                    <option value="closed">마감</option>
                  </select>
                </label>
              </div>

              <div className="grid gap-3 rounded-2xl border border-slate-800 bg-slate-950/50 p-4">
                <label className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <input
                    name="requiresVehicle"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                  />
                  차량 보유 작업자 필요
                </label>

                <label className="flex items-center gap-3 text-sm font-semibold text-slate-200">
                  <input
                    name="providesLodging"
                    type="checkbox"
                    value="true"
                    className="h-4 w-4 rounded border-slate-600 bg-slate-950"
                  />
                  숙소 제공
                </label>
              </div>
            </div>
          </section>

          <section className="grid gap-4">
            <div>
              <h2 className="text-xl font-bold">메모</h2>
              <p className="mt-1 text-sm text-slate-400">
                관리자만 확인할 현장 조건이나 참고사항을 적습니다.
              </p>
            </div>

            <textarea
              name="memo"
              rows={5}
              placeholder="예, 출근 시간, 준비물, 현장 담당자 참고사항"
              className="resize-none rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-cyan-300"
            />
          </section>

          <div className="rounded-2xl border border-amber-400/30 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100">
            현재 화면은 입력 UI 단계입니다. 다음 작업에서 저장 서버 액션을
            연결하면 DB에 실제 공고가 등록됩니다.
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/jobs"
              className="rounded-full border border-slate-700 px-5 py-3 text-center text-sm font-semibold text-slate-200 transition hover:border-cyan-300 hover:text-cyan-200"
            >
              취소
            </Link>
            <button
              type="button"
              disabled
              className="cursor-not-allowed rounded-full bg-slate-700 px-5 py-3 text-sm font-bold text-slate-400"
            >
              저장 기능 연결 전
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}