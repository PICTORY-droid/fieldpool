import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-6">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
        <section className="space-y-2">
          <p className="text-sm font-medium text-neutral-600">Fieldpool</p>
          <h1 className="text-2xl font-bold tracking-tight text-neutral-950">
            건설 인력풀 등록
          </h1>
          <p className="text-sm leading-6 text-neutral-600">
            현장 소개를 위한 기본 구직 정보를 남기는 페이지입니다. 등록 후
            담당자가 연락처와 가능 공종을 확인합니다.
          </p>
        </section>

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