import type { CreateWorkerInput } from "../types/worker.types";

export function normalizeWorkerInput(input: CreateWorkerInput): CreateWorkerInput {
  return {
    ...input,
    name: input.name.trim(),
    phone: normalizePhone(input.phone),
    memo: input.memo?.trim() || null,
    availableRegions: [...new Set(input.availableRegions)],
    jobTypes: [...new Set(input.jobTypes)],
    languages: [...new Set(input.languages ?? [])],
    gender: input.gender ?? "unknown",
    careerYears: input.careerYears ?? null,
    desiredPay: input.desiredPay ?? null,
    hasVehicle: input.hasVehicle ?? false,
    canLodging: input.canLodging ?? false,
  };
}

export function normalizePhone(phone: string): string {
  return phone.replaceAll(/[^\d]/g, "");
}