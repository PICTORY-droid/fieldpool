import { beforeEach, describe, expect, it, vi } from "vitest";

import { createWorkerAction } from "../../features/workers/actions/create-worker-action";
import { WORKER_ERRORS } from "../../features/workers/constants/worker-errors";
import { checkWorkerPhoneExists } from "../../features/workers/server/check-worker-phone-exists";
import { createWorkerRecord } from "../../features/workers/server/create-worker-record";

vi.mock("../../features/workers/server/check-worker-phone-exists", () => ({
  checkWorkerPhoneExists: vi.fn(),
}));

vi.mock("../../features/workers/server/create-worker-record", () => ({
  createWorkerRecord: vi.fn(),
}));

const checkWorkerPhoneExistsMock = vi.mocked(checkWorkerPhoneExists);
const createWorkerRecordMock = vi.mocked(createWorkerRecord);

function createValidWorkerFormData() {
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

  return formData;
}

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

describe("createWorkerAction", () => {
  beforeEach(() => {
    checkWorkerPhoneExistsMock.mockReset();
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
    expect(checkWorkerPhoneExistsMock).not.toHaveBeenCalled();
    expect(createWorkerRecordMock).not.toHaveBeenCalled();
  });

  it("returns duplicate phone error when phone already exists", async () => {
    checkWorkerPhoneExistsMock.mockResolvedValue(true);

    const formData = createValidWorkerFormData();
    const result = await createWorkerAction(formData);

    expect(checkWorkerPhoneExistsMock).toHaveBeenCalledTimes(1);
    expect(checkWorkerPhoneExistsMock).toHaveBeenCalledWith("01011112222");
    expect(createWorkerRecordMock).not.toHaveBeenCalled();
    expect(result).toEqual({
      ok: false,
      errors: ["이미 등록된 연락처입니다."],
      preview: normalizedInput,
    });
  });

  it("creates a worker record for valid form data", async () => {
    checkWorkerPhoneExistsMock.mockResolvedValue(false);
    createWorkerRecordMock.mockResolvedValue({
      id: "worker-test-id",
    });

    const formData = createValidWorkerFormData();
    const result = await createWorkerAction(formData);

    expect(checkWorkerPhoneExistsMock).toHaveBeenCalledTimes(1);
    expect(checkWorkerPhoneExistsMock).toHaveBeenCalledWith("01011112222");
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