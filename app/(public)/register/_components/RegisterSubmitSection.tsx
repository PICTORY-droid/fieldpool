import { Button } from "@/shared/ui/Button";

export function RegisterSubmitSection() {
  return (
    <section className="space-y-3">
      <Button className="w-full" type="submit">
        인력풀 등록하기
      </Button>

      <p className="text-center text-xs leading-5 text-neutral-500">
        등록 후 담당자가 연락처, 가능 공종, 근무 가능 지역을 확인합니다.
      </p>
    </section>
  );
}