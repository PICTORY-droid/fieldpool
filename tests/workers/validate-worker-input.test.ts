import { describe, expect, it } from "vitest";

import { WORKER_ERRORS } from "../../features/workers/constants/worker-errors";
import { validateWorkerInput } from "../../features/workers/server/validate-worker-input";
import type { CreateWorkerInput } from "../../features/workers/types/worker.types";

const validInput: CreateWorkerInput = {
  name: "홍길동",
  phone: "010-1234-5678",
  mainRegion: "세종",
  availableRegions: ["세종"],
  jobTypes: ["형틀"],
  consentPrivacy: true,
};

describe("validateWorkerInput", () => {
  it("returns no errors for valid input", () => {
    expect(validateWorkerInput(validInput)).toEqual([]);
  });

  it("returns errors for missing required fields", () => {
    expect(
      validateWorkerInput({
        ...validInput,
        name: "",
        phone: "",
        jobTypes: [],
        consentPrivacy: false,
      }),
    ).toEqual([
      WORKER_ERRORS.NAME_REQUIRED,
      WORKER_ERRORS.PHONE_REQUIRED,
      WORKER_ERRORS.JOB_TYPE_REQUIRED,
      WORKER_ERRORS.CONSENT_REQUIRED,
    ]);
  });

  it("returns an error for invalid phone number", () => {
    expect(
      validateWorkerInput({
        ...validInput,
        phone: "02-123-4567",
      }),
    ).toContain(WORKER_ERRORS.PHONE_INVALID);
  });
});