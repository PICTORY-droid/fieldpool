type RegisterFormMessageProps = {
  preview: unknown;
};

export function RegisterFormMessage({ preview }: RegisterFormMessageProps) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
      <p className="font-semibold">등록 요청 값이 임시로 확인되었습니다.</p>
      <p className="mt-2 leading-6">
        아직 저장 기능은 연결하지 않았습니다. 다음 단계에서 검증과 서버 액션을
        연결합니다.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-3 text-xs text-neutral-800">
        {JSON.stringify(preview, null, 2)}
      </pre>
    </div>
  );
}