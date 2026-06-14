export type JobPostStatus = "open" | "closed" | "paused";

export type JobPostSourceType = "manual" | "external";

export type JobPost = {
  id: string;
  title: string;
  siteName: string;
  region: string;
  address: string;
  jobTypes: string[];
  neededCount: number | null;
  pay: number | null;
  startDate: string | null;
  endDate: string | null;
  careerYears: number | null;
  requiresVehicle: boolean;
  providesLodging: boolean;
  status: JobPostStatus;
  sourceType: JobPostSourceType;
  externalSource: string | null;
  externalId: string | null;
  memo: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateJobPostInput = {
  title: string;
  siteName: string;
  region: string;
  address: string;
  jobTypes: string[];
  neededCount: number | null;
  pay: number | null;
  startDate: string | null;
  endDate: string | null;
  careerYears: number | null;
  requiresVehicle: boolean;
  providesLodging: boolean;
  status: JobPostStatus;
  sourceType: JobPostSourceType;
  externalSource: string | null;
  externalId: string | null;
  memo: string;
};

export type JobPostDatabaseRow = {
  id: string;
  title: string;
  site_name: string;
  region: string;
  address: string;
  job_types: string[];
  needed_count: number | null;
  pay: number | null;
  start_date: string | null;
  end_date: string | null;
  career_years: number | null;
  requires_vehicle: boolean;
  provides_lodging: boolean;
  status: JobPostStatus;
  source_type: JobPostSourceType;
  external_source: string | null;
  external_id: string | null;
  memo: string | null;
  created_at: string;
  updated_at: string;
};