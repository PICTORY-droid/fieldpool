import { describe, expect, it } from "vitest";

import { WORKER_STATUS } from "../../features/workers/constants/worker-status";
import { mapWorkerToDatabase } from "../../features/workers/server/map-worker-to-database";
import type { CreateWorkerInput } from "../../features/workers/types/worker.types";

describe("mapWorkerToDatabase", () => {
  it("maps worker input to database insert shape", () => {
    const input: CreateWorkerInput = {
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
    };

    expect(mapWorkerToDatabase(input)).toEqual({
      name: "김서인",
      phone: "01011112222",
      birth_year: 1979,
      gender: "female",
      main_region: "세종",
      available_regions: ["세종"],
      job_types: ["철근", "비계"],
      career_years: 7,
      desired_pay: 210000,
      has_vehicle: true,
      can_lodging: true,
      languages: ["한국어", "영어"],
      memo: null,
      status: WORKER_STATUS.NEW,
      consent_privacy: true,
    });
  });

  it("fills optional database values with safe defaults", () => {
    const input: CreateWorkerInput = {
      name: "홍길동",
      phone: "01012345678",
      mainRegion: "대전",
      availableRegions: ["대전"],
      jobTypes: ["형틀"],
      consentPrivacy: true,
    };

    expect(mapWorkerToDatabase(input)).toEqual({
      name: "홍길동",
      phone: "01012345678",
      birth_year: null,
      gender: "unknown",
      main_region: "대전",
      available_regions: ["대전"],
      job_types: ["형틀"],
      career_years: null,
      desired_pay: null,
      has_vehicle: false,
      can_lodging: false,
      languages: [],
      memo: null,
      status: WORKER_STATUS.NEW,
      consent_privacy: true,
    });
  });
});