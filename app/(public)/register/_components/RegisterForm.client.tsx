"use client";

import { useState, type FormEvent, type ReactNode } from "react";

import { RegisterFormMessage } from "./RegisterFormMessage";

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

      {preview ? <RegisterFormMessage preview={preview} /> : null}
    </form>
  );
}