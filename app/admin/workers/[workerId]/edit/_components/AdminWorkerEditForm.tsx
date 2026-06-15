import Link from "next/link";

import { updateWorkerRecordAction } from "@/features/workers/actions/update-worker-record-action";
import { JOB_TYPES } from "@/features/workers/constants/job-types";
import { LANGUAGE_OPTIONS } from "@/features/workers/constants/language-options";
import { REGIONS } from "@/features/workers/constants/regions";
import type { WorkerRecord } from "@/features/workers/server/get-worker-records";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";
import { Textarea } from "@/shared/ui/Textarea";

import { AdminWorkerEditSubmitButton } from "./AdminWorkerEditSubmitButton";

type AdminWorkerEditFormProps = {
  worker: WorkerRecord;
};

export function AdminWorkerEditForm({ worker }: AdminWorkerEditFormProps) {
  return (
    <form
      action={updateWorkerRecordAction}
      className="grid gap-6 rounded-3xl bg-white p-5 shadow-sm"
    >
      <input type="hidden" name="workerId" value={worker.id} />

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">기본 정보</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            이름, 연락처, 출생연도, 성별을 수정합니다.
          </p>
        </div>

        <div className="grid gap-4">
          <Input
            id="name"
            label="이름"
            name="name"
            defaultValue={worker.name}
            placeholder="예: 홍길동"
          />

          <Input
            id="phone"
            label="연락처"
            name="phone"
            defaultValue={worker.phone}
            placeholder="예: 010-1234-5678"
            inputMode="tel"
          />

          <Input
            id="birthYear"
            label="출생연도"
            name="birthYear"
            defaultValue={worker.birthYear ?? ""}
            placeholder="예: 1980"
            inputMode="numeric"
          />

          <Select
            id="gender"
            label="성별"
            name="gender"
            defaultValue={worker.gender}
          >
            <option value="unknown">선택 안 함</option>
            <option value="male">남성</option>
            <option value="female">여성</option>
          </Select>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">근무 정보</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            주 근무 지역과 가능한 공종을 수정합니다.
          </p>
        </div>

        <Select
          id="mainRegion"
          label="주 근무 지역"
          name="mainRegion"
          defaultValue={worker.mainRegion}
        >
          <option value="" disabled>
            지역을 선택해 주세요
          </option>
          {REGIONS.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </Select>

        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-800">가능 공종</p>

          <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-2">
            {JOB_TYPES.map((jobType) => (
              <Checkbox
                key={jobType}
                id={`edit-jobType-${jobType}`}
                label={jobType}
                name="jobTypes"
                value={jobType}
                defaultChecked={worker.jobTypes.includes(jobType)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-bold">상세 정보</h2>
          <p className="mt-1 text-sm leading-6 text-neutral-600">
            경력, 희망 일당, 차량, 숙소, 언어, 메모를 수정합니다.
          </p>
        </div>

        <div className="grid gap-4">
          <Input
            id="careerYears"
            label="경력연수"
            name="careerYears"
            defaultValue={worker.careerYears ?? ""}
            placeholder="예: 5"
            inputMode="numeric"
          />

          <Input
            id="desiredPay"
            label="희망 일당"
            name="desiredPay"
            defaultValue={worker.desiredPay ?? ""}
            placeholder="예: 160000"
            inputMode="numeric"
          />

          <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
            <Checkbox
              id="hasVehicle"
              label="차량 보유"
              name="hasVehicle"
              defaultChecked={worker.hasVehicle}
            />
            <Checkbox
              id="canLodging"
              label="숙소 생활 가능"
              name="canLodging"
              defaultChecked={worker.canLodging}
            />
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-neutral-800">
              사용 가능 언어
            </p>

            <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-2">
              {LANGUAGE_OPTIONS.map((language) => (
                <Checkbox
                  key={language}
                  id={`edit-language-${language}`}
                  label={language}
                  name="languages"
                  value={language}
                  defaultChecked={worker.languages.includes(language)}
                />
              ))}
            </div>
          </div>

          <Textarea
            id="memo"
            label="메모"
            name="memo"
            defaultValue={worker.memo ?? ""}
            placeholder="예: 가능한 현장, 특이사항, 상담 시 확인할 내용"
          />
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <AdminWorkerEditSubmitButton />

        <Link
          href={`/admin/workers/${worker.id}`}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-neutral-300 px-5 text-sm font-semibold text-neutral-700"
        >
          취소
        </Link>
      </div>
    </form>
  );
}