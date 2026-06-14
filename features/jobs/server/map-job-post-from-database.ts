import type {
  JobPost,
  JobPostDatabaseRow,
} from "../types/job-post.types";

export function mapJobPostFromDatabase(row: JobPostDatabaseRow): JobPost {
  return {
    id: row.id,
    title: row.title,
    siteName: row.site_name,
    region: row.region,
    address: row.address,
    jobTypes: row.job_types,
    neededCount: row.needed_count,
    pay: row.pay,
    startDate: row.start_date,
    endDate: row.end_date,
    careerYears: row.career_years,
    requiresVehicle: row.requires_vehicle,
    providesLodging: row.provides_lodging,
    status: row.status,
    sourceType: row.source_type,
    externalSource: row.external_source,
    externalId: row.external_id,
    memo: row.memo ?? "",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}