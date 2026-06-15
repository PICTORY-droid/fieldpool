"use server";

import type { JobType } from "../constants/job-types";
import type { LanguageOption } from "../constants/language-options";
import type { Region } from "../constants/regions";
import { checkWorkerPhoneExists } from "../server/check-worker-phone-exists";
import { createWorkerRecord } from "../server/create-worker-record";
import { normalizeWorkerInput } from "../server/normalize-worker-input";
import { validateWorkerInput } from "../server/validate-worker-input";
import type { CreateWorkerInput } from "../types/worker.types";

const DUPLICATE_PHONE_ERROR_MESSAGE = "이미 등록된 연락처입니다.";

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

  const phoneExists = await checkWorkerPhoneExists(normalizedInput.phone);

  if (phoneExists) {
    return {
      ok: false,
      errors: [DUPLICATE_PHONE_ERROR_MESSAGE],
      preview: normalizedInput,
    };
  }

  try {
    const savedWorker = await createWorkerRecord(normalizedInput);

    return {
      ok: true,
      errors: [],
      preview: normalizedInput,
      workerId: savedWorker.id,
    };
  } catch (error) {
    if (isDuplicatePhoneDatabaseError(error)) {
      return {
        ok: false,
        errors: [DUPLICATE_PHONE_ERROR_MESSAGE],
        preview: normalizedInput,
      };
    }

    throw error;
  }
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

function isDuplicatePhoneDatabaseError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const databaseError = error as {
    code?: unknown;
    constraint?: unknown;
    detail?: unknown;
    message?: unknown;
  };

  const code = getErrorText(databaseError.code);

  if (code !== "23505") {
    return false;
  }

  const errorText = [
    getErrorText(databaseError.constraint),
    getErrorText(databaseError.detail),
    getErrorText(databaseError.message),
  ].join(" ");

  return (
    errorText.includes("workers_phone_unique_idx") ||
    errorText.includes("workers_phone_key") ||
    errorText.includes("phone")
  );
}

function getErrorText(value: unknown) {
  return typeof value === "string" ? value : "";
}