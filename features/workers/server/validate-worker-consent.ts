import { WORKER_ERRORS } from "../constants/worker-errors";
import type { CreateWorkerInput } from "../types/worker.types";

export function validateWorkerConsent(input: CreateWorkerInput): string | null {
  if (!input.consentPrivacy) {
    return WORKER_ERRORS.CONSENT_REQUIRED;
  }

  return null;
}