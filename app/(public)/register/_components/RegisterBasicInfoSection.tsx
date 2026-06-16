import { Input } from "@/shared/ui/Input";
import { Select } from "@/shared/ui/Select";

export function RegisterBasicInfoSection() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold text-neutral-950">기본 정보</h2>
        <p className="text-sm leading-6 text-neutral-600">
          이름과 연락처를 정확히 입력해 주세요.
        </p>
      </div>

      <div className="grid gap-4">
        <Input id="name" label="이름" name="name" placeholder="예: 홍길동" />

        <Input
          id="phone"
          label="연락처"
          name="phone"
          placeholder="예: 010-1234-5678"
          inputMode="tel"
        />

        <Input
          id="birthYear"
          label="출생연도"
          name="birthYear"
          placeholder="예: 1980"
          inputMode="numeric"
        />

        <Select id="gender" label="성별" name="gender" defaultValue="unknown">
          <option value="unknown">선택 안 함</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
        </Select>
      </div>
    </section>
  );
}