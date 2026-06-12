import { WORKER_STATUS } from "../constants/worker-status";
import type { CreateWorkerInput } from "../types/worker.types";

export type WorkerDatabaseInsert = {
  name: string;
  phone: string;
  birth_year: number | null;
  gender: CreateWorkerInput["gender"];
  main_region: string;
  available_regions: string[];
  job_types: string[];
  career_years: number | null;
  desired_pay: number | null;
  has_vehicle: boolean;
  can_lodging: boolean;
  languages: string[];
  memo: string | null;
  status: string;
  consent_privacy: boolean;
};

export function mapWorkerToDatabase(
  input: CreateWorkerInput,
): WorkerDatabaseInsert {
  return {
    name: input.name,
    phone: input.phone,
    birth_year: input.birthYear ?? null,
    gender: input.gender ?? "unknown",
    main_region: input.mainRegion,
    available_regions: input.availableRegions,
    job_types: input.jobTypes,
    career_years: input.careerYears ?? null,
    desired_pay: input.desiredPay ?? null,
    has_vehicle: input.hasVehicle ?? false,
    can_lodging: input.canLodging ?? false,
    languages: input.languages ?? [],
    memo: input.memo ?? null,
    status: WORKER_STATUS.NEW,
    consent_privacy: input.consentPrivacy,
  };
}