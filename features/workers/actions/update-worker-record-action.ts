"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { JobType } from "../constants/job-types";
import type { LanguageOption } from "../constants/language-options";
import type { Region } from "../constants/regions";
import { checkWorkerPhoneExistsExcludingWorker } from "../server/check-worker-phone-exists-excluding-worker";
import { normalizeWorkerInput } from "../server/normalize-worker-input";
import { updateWorkerRecord } from "../server/update-worker-record";
import { validateUpdateWorkerInput } from "../server/validate-update-worker-input";
import type {
  CreateWorkerInput,
  UpdateWorkerInput,
} from "../types/worker.types";
import { requireAdminAuth } from "../../../server/security/admin-auth";

const DUPLICATE_PHONE_ERROR_MESSAGE = "이미 등록된 연락처입니다.";

export async function updateWorkerRecordAction(
  formData: FormData,
): Promise<void> {
  await requireAdminAuth();

  const workerId = String(formData.get("workerId") ?? "").trim();
  const mainRegion = String(formData.get("mainRegion") ?? "") as Region;

  if (!workerId) {
    throw new Error("Worker id is required.");
  }

  const input: UpdateWorkerInput = {
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
  };

  const normalizedInput = normalizeUpdateWorkerInput(input);
  const errors = validateUpdateWorkerInput(normalizedInput);

  if (errors.length > 0) {
    throw new Error(errors.join("\n"));
  }

  const phoneExists = await checkWorkerPhoneExistsExcludingWorker({
    phone: normalizedInput.phone,
    workerId,
  });

  if (phoneExists) {
    throw new Error(DUPLICATE_PHONE_ERROR_MESSAGE);
  }

  await updateWorkerRecord({
    workerId,
    input: normalizedInput,
  });

  revalidatePath("/admin/workers");
  revalidatePath(`/admin/workers/${workerId}`);
  revalidatePath(`/admin/workers/${workerId}/edit`);

  redirect(`/admin/workers/${workerId}`);
}

function normalizeUpdateWorkerInput(input: UpdateWorkerInput): UpdateWorkerInput {
  const normalizedInput = normalizeWorkerInput({
    ...input,
    consentPrivacy: true,
  } satisfies CreateWorkerInput);

  return {
    name: normalizedInput.name,
    phone: normalizedInput.phone,
    birthYear: normalizedInput.birthYear,
    gender: normalizedInput.gender,
    mainRegion: normalizedInput.mainRegion,
    availableRegions: normalizedInput.availableRegions,
    jobTypes: normalizedInput.jobTypes,
    careerYears: normalizedInput.careerYears,
    desiredPay: normalizedInput.desiredPay,
    hasVehicle: normalizedInput.hasVehicle,
    canLodging: normalizedInput.canLodging,
    languages: normalizedInput.languages,
    memo: normalizedInput.memo,
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
): UpdateWorkerInput["gender"] {
  if (value === "male" || value === "female" || value === "unknown") {
    return value;
  }

  return "unknown";
}