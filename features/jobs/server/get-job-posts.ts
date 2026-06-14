import { createNeonServerClient } from "../../../server/db/neon-server";
import type { JobPost, JobPostDatabaseRow } from "../types/job-post.types";
import { mapJobPostFromDatabase } from "./map-job-post-from-database";

export async function getJobPosts(): Promise<JobPost[]> {
  const sql = createNeonServerClient();

  const rows = await sql`
    select
      id,
      title,
      site_name,
      region,
      address,
      job_types,
      needed_count,
      pay,
      start_date::text as start_date,
      end_date::text as end_date,
      career_years,
      requires_vehicle,
      provides_lodging,
      status,
      source_type,
      external_source,
      external_id,
      memo,
      created_at::text as created_at,
      updated_at::text as updated_at
    from public.job_posts
    order by created_at desc;
  `;

  return (rows as JobPostDatabaseRow[]).map(mapJobPostFromDatabase);
}