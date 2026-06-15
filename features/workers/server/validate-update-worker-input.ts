import { WORKER_ERRORS } from "../constants/worker-errors";
import type { UpdateWorkerInput } from "../types/worker.types";
import { isValidKoreanMobilePhone } from "./validate-worker-phone";

export function validateUpdateWorkerInput(input: UpdateWorkerInput): string[] {
  const errors: string[] = [];

  if (!input.name.trim()) {
    errors.push(WORKER_ERRORS.NAME_REQUIRED);
  }

  if (!input.phone.trim()) {
    errors.push(WORKER_ERRORS.PHONE_REQUIRED);
  } else if (!isValidKoreanMobilePhone(input.phone)) {
    errors.push(WORKER_ERRORS.PHONE_INVALID);
  }

  if (input.jobTypes.length === 0) {
    errors.push(WORKER_ERRORS.JOB_TYPE_REQUIRED);
  }

  if (!input.mainRegion) {
    errors.push(WORKER_ERRORS.REGION_REQUIRED);
  }

  return errors;
}