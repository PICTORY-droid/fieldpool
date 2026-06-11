type RegisterFormErrorsProps = {
  errors: string[];
};

export function RegisterFormErrors({ errors }: RegisterFormErrorsProps) {
  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
      <p className="font-semibold">입력값을 다시 확인해 주세요.</p>

      <ul className="mt-2 list-disc space-y-1 pl-5 leading-6">
        {errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  );
}