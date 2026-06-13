import { beforeEach, describe, expect, it, vi } from "vitest";

import { createWorkerAction } from "../../features/workers/actions/create-worker-action";
import { WORKER_ERRORS } from "../../features/workers/constants/worker-errors";
import { createWorkerRecord } from "../../features/workers/server/create-worker-record";

vi.mock("../../features/workers/server/create-worker-record", () => ({
  createWorkerRecord: vi.fn(),
}));

const createWorkerRecordMock = vi.mocked(createWorkerRecord);

describe("createWorkerAction", () => {
  beforeEach(() => {
    createWorkerRecordMock.mockReset();
  });

  it("returns validation errors for empty form data", async () => {
    const formData = new FormData();

    const result = await createWorkerAction(formData);

    expect(result.ok).toBe(false);
    expect(result.errors).toEqual([
      WORKER_ERRORS.NAME_REQUIRED,
      WORKER_ERRORS.PHONE_REQUIRED,
      WORKER_ERRORS.JOB_TYPE_REQUIRED,
      WORKER_ERRORS.REGION_REQUIRED,
      WORKER_ERRORS.CONSENT_REQUIRED,
    ]);
    expect(createWorkerRecordMock).not.toHaveBeenCalled();
  });

  it("creates a worker record for valid form data", async () => {
    createWorkerRecordMock.mockResolvedValue({
      id: "worker-test-id",
    });

    const formData = new FormData();

    formData.set("name", " 김서인 ");
    formData.set("phone", "010-1111-2222");
    formData.set("birthYear", "1979");
    formData.set("gender", "female");
    formData.set("mainRegion", "세종");
    formData.append("jobTypes", "철근");
    formData.append("jobTypes", "비계");
    formData.set("careerYears", "7");
    formData.set("desiredPay", "210000");
    formData.set("hasVehicle", "on");
    formData.set("canLodging", "on");
    formData.append("languages", "한국어");
    formData.append("languages", "영어");
    formData.set("memo", "");
    formData.set("consentPrivacy", "on");

    const result = await createWorkerAction(formData);

    const normalizedInput = {
      name: "김서인",
      phone: "01011112222",
      birthYear: 1979,
      gender: "female" as const,
      mainRegion: "세종" as const,
      availableRegions: ["세종" as const],
      jobTypes: ["철근" as const, "비계" as const],
      careerYears: 7,
      desiredPay: 210000,
      hasVehicle: true,
      canLodging: true,
      languages: ["한국어" as const, "영어" as const],
      memo: null,
      consentPrivacy: true,
    };

    expect(createWorkerRecordMock).toHaveBeenCalledTimes(1);
    expect(createWorkerRecordMock).toHaveBeenCalledWith(normalizedInput);
    expect(result).toEqual({
      ok: true,
      errors: [],
      preview: normalizedInput,
      workerId: "worker-test-id",
    });
  });
});