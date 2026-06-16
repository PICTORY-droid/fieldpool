import { LANGUAGE_OPTIONS } from "@/features/workers/constants/language-options";
import { Checkbox } from "@/shared/ui/Checkbox";
import { Input } from "@/shared/ui/Input";
import { Textarea } from "@/shared/ui/Textarea";

export function RegisterDetailInfoSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-neutral-950">상세 정보</h2>
        <p className="text-sm leading-6 text-neutral-600">
          경력, 희망 일당, 차량 보유 여부, 숙소 가능 여부, 사용 언어를 입력해
          주세요.
        </p>
      </div>

      <div className="grid gap-4">
        <Input
          id="careerYears"
          label="경력연수"
          name="careerYears"
          placeholder="예: 5"
          inputMode="numeric"
        />

        <Input
          id="desiredPay"
          label="희망 일당"
          name="desiredPay"
          placeholder="예: 160000"
          inputMode="numeric"
        />

        <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
          <Checkbox id="hasVehicle" label="차량 보유" name="hasVehicle" />
          <Checkbox id="canLodging" label="숙소 생활 가능" name="canLodging" />
        </div>

        <div className="space-y-3">
          <p className="text-sm font-medium text-neutral-800">사용 가능 언어</p>

          <div className="grid gap-3 rounded-2xl border border-neutral-200 bg-white p-4 sm:grid-cols-2">
            {LANGUAGE_OPTIONS.map((language) => (
              <Checkbox
                key={language}
                id={`language-${language}`}
                label={language}
                name="languages"
                value={language}
              />
            ))}
          </div>
        </div>

        <Textarea
          id="memo"
          label="메모"
          name="memo"
          placeholder="예: 가능한 현장, 특이사항, 상담 시 확인할 내용"
        />
      </div>
    </section>
  );
}