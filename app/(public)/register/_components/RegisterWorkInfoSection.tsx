import { JOB_TYPES } from "@/features/workers/constants/job-types";
import { REGIONS } from "@/features/workers/constants/regions";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Select } from "@/shared/ui/Select";

export function RegisterWorkInfoSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-neutral-950">근무 정보</h2>
        <p className="text-sm leading-6 text-neutral-600">
          가능한 공종과 주 근무 지역을 입력받는 영역입니다.
        </p>
      </div>

      <Select id="mainRegion" label="주 근무 지역" name="mainRegion" defaultValue="">
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
              id={`jobType-${jobType}`}
              label={jobType}
              name="jobTypes"
              value={jobType}
            />
          ))}
        </div>
      </div>
    </section>
  );
}