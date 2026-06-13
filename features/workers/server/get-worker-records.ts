import { createNeonServerClient } from "../../../server/db/neon-server";

export type WorkerRecord = {
  id: string;
  name: string;
  phone: string;
  birthYear: number | null;
  gender: string;
  mainRegion: string;
  availableRegions: string[];
  jobTypes: string[];
  careerYears: number | null;
  desiredPay: number | null;
  hasVehicle: boolean;
  canLodging: boolean;
  languages: string[];
  memo: string | null;
  status: string;
  consentPrivacy: boolean;
  createdAt: string;
  updatedAt: string;
};

type WorkerDatabaseRow = {
  id: string;
  name: string;
  phone: string;
  birth_year: number | null;
  gender: string;
  main_region: string;
  available_regions: string[] | null;
  job_types: string[] | null;
  career_years: number | null;
  desired_pay: number | null;
  has_vehicle: boolean;
  can_lodging: boolean;
  languages: string[] | null;
  memo: string | null;
  status: string;
  consent_privacy: boolean;
  created_at: string;
  updated_at: string;
};

export async function getWorkerRecords(): Promise<WorkerRecord[]> {
  const sql = createNeonServerClient();

  const rows = (await sql`
    select
      id,
      name,
      phone,
      birth_year,
      gender,
      main_region,
      available_regions,
      job_types,
      career_years,
      desired_pay,
      has_vehicle,
      can_lodging,
      languages,
      memo,
      status,
      consent_privacy,
      created_at,
      updated_at
    from public.workers
    order by created_at desc
    limit 50;
  `) as WorkerDatabaseRow[];

  return rows.map((worker) => ({
    id: worker.id,
    name: worker.name,
    phone: worker.phone,
    birthYear: worker.birth_year,
    gender: worker.gender,
    mainRegion: worker.main_region,
    availableRegions: worker.available_regions ?? [],
    jobTypes: worker.job_types ?? [],
    careerYears: worker.career_years,
    desiredPay: worker.desired_pay,
    hasVehicle: worker.has_vehicle,
    canLodging: worker.can_lodging,
    languages: worker.languages ?? [],
    memo: worker.memo,
    status: worker.status,
    consentPrivacy: worker.consent_privacy,
    createdAt: worker.created_at,
    updatedAt: worker.updated_at,
  }));
}