import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/Card";

export function RegisterIntroCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>등록 전 확인사항</CardTitle>
        <CardDescription>
          입력한 정보는 현장 소개와 구인공고 매칭 확인을 위해 사용됩니다.
          연락 가능한 번호와 실제 근무 가능한 공종, 지역을 기준으로
          작성하세요.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl bg-neutral-100 p-4 text-sm leading-6 text-neutral-700">
          등록 후 담당자가 연락처, 가능 공종, 근무 가능 지역을 확인합니다.
          개인정보 동의 후 인력풀 등록을 진행할 수 있습니다.
        </div>
      </CardContent>
    </Card>
  );
}