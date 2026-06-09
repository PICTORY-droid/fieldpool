import { describe, expect, it } from "vitest";

import { normalizePhone, normalizeWorkerInput } from "../../features/workers/server/normalize-worker-input";
import type { CreateWorkerInput } from "../../features/workers/types/worker.types";

describe("normalizePhone", () => {
  it("removes non-numeric characters from a phone number", () => {
    expect(normalizePhone("010-1234-5678")).toBe("01012345678");
  });
});

describe("normalizeWorkerInput", () => {
  it("trims text fields and fills default values", () => {
    const input: CreateWorkerInput = {
      name: " 홍길동 ",
      phone: "010-1234-5678",
      mainRegion: "세종",
      availableRegions: ["세종", "세종"],
      jobTypes: ["형틀", "형틀"],
      consentPrivacy: true,
    };

    expect(normalizeWorkerInput(input)).toEqual({
      name: "홍길동",
      phone: "01012345678",
      mainRegion: "세종",
      availableRegions: ["세종"],
      jobTypes: ["형틀"],
      consentPrivacy: true,
      memo: null,
      languages: [],
      gender: "unknown",
      careerYears: null,
      desiredPay: null,
      hasVehicle: false,
      canLodging: false,
    });
  });
});