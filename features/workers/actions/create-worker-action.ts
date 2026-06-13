"use server";

import type { JobType } from "../constants/job-types";
import type { LanguageOption } from "../constants/language-options";
import type { Region } from "../constants/regions";
import { createWorkerRecord } from "../server/create-worker-record";
import { normalizeWorkerInput } from "../server/normalize-worker-input";
import { validateWorkerInput } from "../server/validate-worker-input";
import type { CreateWorkerInput } from "../types/worker.types";

export type CreateWorkerActionResult = {
  ok: boolean;
  errors: string[];
  preview: CreateWorkerInput | null;
  workerId?: string;
};

export async function createWorkerAction(
  formData: FormData,
): Promise<CreateWorkerActionResult> {
  const mainRegion = String(formData.get("mainRegion") ?? "") as Region;

  const input: CreateWorkerInput = {
    name: String(formData.get("name") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    birthYear: parseOptionalNumber(formData.get("birthYear")),
    gender: parseGender(formData.get("gender")),
    mainRegion,
    availableRegions: mainRegion ? [mainRegion] : [],
    jobTypes: formData.getAll("jobTypes").map(String) as JobType[],
    careerYears: parseOptionalNumber(formData.get("careerYears")),
    desiredPay: parseOptionalNumber(formData.get("desiredPay")),
    hasVehicle: formData.has("hasVehicle"),
    canLodging: formData.has("canLodging"),
    languages: formData.getAll("languages").map(String) as LanguageOption[],
    memo: String(formData.get("memo") ?? ""),
    consentPrivacy: formData.has("consentPrivacy"),
  };

  const normalizedInput = normalizeWorkerInput(input);
  const errors = validateWorkerInput(normalizedInput);

  if (errors.length > 0) {
    return {
      ok: false,
      errors,
      preview: normalizedInput,
    };
  }

  const savedWorker = await createWorkerRecord(normalizedInput);

  return {
    ok: true,
    errors: [],
    preview: normalizedInput,
    workerId: savedWorker.id,
  };
}

function parseOptionalNumber(value: FormDataEntryValue | null): number | null {
  const textValue = String(value ?? "").trim();

  if (!textValue) {
    return null;
  }

  const numberValue = Number(textValue);

  if (Number.isNaN(numberValue)) {
    return null;
  }

  return numberValue;
}

function parseGender(
  value: FormDataEntryValue | null,
): CreateWorkerInput["gender"] {
  if (value === "male" || value === "female" || value === "unknown") {
    return value;
  }

  return "unknown";
}