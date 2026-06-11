"use client";

import { useState, type FormEvent, type ReactNode } from "react";

type RegisterFormProps = {
  children: ReactNode;
};

type RegisterFormPreview = {
  name: string;
  phone: string;
  birthYear: string;
  gender: string;
  mainRegion: string;
  jobTypes: string[];
  careerYears: string;
  desiredPay: string;
  hasVehicle: boolean;
  canLodging: boolean;
  languages: string[];
  memo: string;
  consentPrivacy: boolean;
};

export function RegisterForm({ children }: RegisterFormProps) {
  const [preview, setPreview] = useState<RegisterFormPreview | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setPreview({
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      birthYear: String(formData.get("birthYear") ?? ""),
      gender: String(formData.get("gender") ?? ""),
      mainRegion: String(formData.get("mainRegion") ?? ""),
      jobTypes: formData.getAll("jobTypes").map(String),
      careerYears: String(formData.get("careerYears") ?? ""),
      desiredPay: String(formData.get("desiredPay") ?? ""),
      hasVehicle: formData.has("hasVehicle"),
      canLodging: formData.has("canLodging"),
      languages: formData.getAll("languages").map(String),
      memo: String(formData.get("memo") ?? ""),
      consentPrivacy: formData.has("consentPrivacy"),
    });
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      {children}

      {preview ? (
        <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-800">
          <p className="font-semibold">
            등록 요청 값이 임시로 확인되었습니다.
          </p>
          <p className="mt-2 leading-6">
            아직 저장 기능은 연결하지 않았습니다. 다음 단계에서 검증과 서버
            액션을 연결합니다.
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl bg-white p-3 text-xs text-neutral-800">
            {JSON.stringify(preview, null, 2)}
          </pre>
        </div>
      ) : null}
    </form>
  );
}