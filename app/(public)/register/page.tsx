import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { RegisterPageHeader } from "./_components/RegisterPageHeader";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <RegisterPageHeader />

        <Card>
          <CardHeader>
            <CardTitle>등록 화면 준비 중</CardTitle>
            <CardDescription>
              현재는 화면 구조를 먼저 만드는 단계입니다. 다음 단계에서 이름,
              연락처, 공종, 지역, 개인정보 동의 입력 영역을 나눠서 추가합니다.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="rounded-xl bg-neutral-100 p-4 text-sm leading-6 text-neutral-700">
              아직 입력값 저장 기능은 연결하지 않았습니다. 먼저 화면을 작게
              나누고, 이후 검증 로직과 저장 로직을 연결합니다.
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}