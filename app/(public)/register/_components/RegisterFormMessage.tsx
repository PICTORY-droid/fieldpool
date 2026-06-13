type RegisterFormMessageProps = {
  preview: unknown;
};

export function RegisterFormMessage({ preview }: RegisterFormMessageProps) {
  return (
    <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
      <p className="font-semibold">등록 요청이 저장되었습니다.</p>
      <p className="mt-2 leading-6">
        입력한 작업자 정보가 인력풀에 등록되었습니다. 아래 내용으로 저장된
        값을 확인할 수 있습니다.
      </p>

      <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-3 text-xs text-neutral-800">
        {JSON.stringify(preview, null, 2)}
      </pre>
    </div>
  );
}