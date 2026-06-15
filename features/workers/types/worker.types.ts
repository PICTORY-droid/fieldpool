import type { JobType } from "../constants/job-types";
import type { LanguageOption } from "../constants/language-options";
import type { Region } from "../constants/regions";
import type { WorkerStatus } from "../constants/worker-status";

export type Worker = {
  id: string;
  name: string;
  phone: string;
  birthYear: number | null;
  gender: "male" | "female" | "unknown";
  mainRegion: Region;
  availableRegions: Region[];
  jobTypes: JobType[];
  careerYears: number | null;
  desiredPay: number | null;
  hasVehicle: boolean;
  canLodging: boolean;
  languages: LanguageOption[];
  memo: string | null;
  status: WorkerStatus;
  consentPrivacy: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateWorkerInput = {
  name: string;
  phone: string;
  birthYear?: number | null;
  gender?: "male" | "female" | "unknown";
  mainRegion: Region;
  availableRegions: Region[];
  jobTypes: JobType[];
  careerYears?: number | null;
  desiredPay?: number | null;
  hasVehicle?: boolean;
  canLodging?: boolean;
  languages?: LanguageOption[];
  memo?: string | null;
  consentPrivacy: boolean;
};

export type UpdateWorkerInput = {
  name: string;
  phone: string;
  birthYear?: number | null;
  gender?: "male" | "female" | "unknown";
  mainRegion: Region;
  availableRegions: Region[];
  jobTypes: JobType[];
  careerYears?: number | null;
  desiredPay?: number | null;
  hasVehicle?: boolean;
  canLodging?: boolean;
  languages?: LanguageOption[];
  memo?: string | null;
};

export type WorkerFilter = {
  keyword?: string;
  region?: Region;
  jobType?: JobType;
  status?: WorkerStatus;
};