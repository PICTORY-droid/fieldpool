import { createNeonServerClient } from "../../../server/db/neon-server";
import type { JobPost } from "../types/job-post.types";
import { mapJobPostFromDatabase } from "./map-job-post-from-database";

type JobPostDatabaseRow = Parameters<typeof mapJobPostFromDatabase>[0];

export async function getJobPost(jobPostId: string): Promise<JobPost | null> {
  const sql = createNeonServerClient();

  const rows = (await sql`
    select
      id,
      title,
      site_name,
      region,
      address,
      job_types,
      needed_count,
      pay,
      start_date,
      end_date,
      career_years,
      requires_vehicle,
      provides_lodging,
      status,
      source_type,
      external_source,
      external_id,
      memo,
      created_at,
      updated_at
    from public.job_posts
    where id = ${jobPostId}
    limit 1
  `) as JobPostDatabaseRow[];

  const jobPostRow = rows[0];

  if (!jobPostRow) {
    return null;
  }

  return mapJobPostFromDatabase(jobPostRow);
}