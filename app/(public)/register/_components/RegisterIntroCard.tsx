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
          실제 연락 가능한 번호와 근무 가능한 지역, 공종을 기준으로 작성해
          주세요.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="rounded-xl bg-neutral-100 p-4 text-sm leading-6 text-neutral-700">
          등록을 마치면 입력한 내용을 기준으로 현장 소개 가능 여부를 확인합니다.
        </div>
      </CardContent>
    </Card>
  );
}