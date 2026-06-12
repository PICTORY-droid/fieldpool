import { describe, expect, it } from "vitest";

import { createWorkerAction } from "../../features/workers/actions/create-worker-action";
import { WORKER_ERRORS } from "../../features/workers/constants/worker-errors";

describe("createWorkerAction", () => {
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
  });

  it("returns normalized preview for valid form data", async () => {
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

    expect(result).toEqual({
      ok: true,
      errors: [],
      preview: {
        name: "김서인",
        phone: "01011112222",
        birthYear: 1979,
        gender: "female",
        mainRegion: "세종",
        availableRegions: ["세종"],
        jobTypes: ["철근", "비계"],
        careerYears: 7,
        desiredPay: 210000,
        hasVehicle: true,
        canLodging: true,
        languages: ["한국어", "영어"],
        memo: null,
        consentPrivacy: true,
      },
    });
  });
});