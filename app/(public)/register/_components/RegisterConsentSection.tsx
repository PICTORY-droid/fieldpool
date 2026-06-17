import { Checkbox } from "@/shared/ui/Checkbox";

export function RegisterConsentSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-neutral-950">
          개인정보 동의
        </h2>
        <p className="text-sm leading-6 text-neutral-600">
          현장 소개 상담과 연락을 받으려면 개인정보 수집 및 이용 동의가
          필요합니다.
        </p>
      </div>

      <div className="rounded-2xl border border-neutral-200 bg-white p-4">
        <Checkbox
          id="consentPrivacy"
          label="인력풀 등록과 직업상담을 위한 개인정보 수집 및 이용에 동의합니다."
          name="consentPrivacy"
        />

        <p className="mt-3 text-xs leading-5 text-neutral-500">
          입력한 정보는 구직 상담, 가능 공종 확인, 현장 소개 가능 여부 확인에만
          사용합니다.
        </p>
      </div>
    </section>
  );
}