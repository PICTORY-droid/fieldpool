import { createNeonServerClient } from "../../../server/db/neon-server";
import {
  JOB_POST_STATUS_VALUES,
} from "../constants/job-post-status";
import type { JobPostStatus } from "../types/job-post.types";

export type UpdateJobPostStatusInput = {
  jobPostId: string;
  status: JobPostStatus;
};

export async function updateJobPostStatus({
  jobPostId,
  status,
}: UpdateJobPostStatusInput): Promise<void> {
  if (!jobPostId.trim()) {
    throw new Error("Job post id is required.");
  }

  if (!isJobPostStatus(status)) {
    throw new Error("Invalid job post status.");
  }

  const sql = createNeonServerClient();

  await sql`
    update public.job_posts
    set
      status = ${status},
      updated_at = now()
    where id = ${jobPostId};
  `;
}

function isJobPostStatus(value: string): value is JobPostStatus {
  return JOB_POST_STATUS_VALUES.includes(value as JobPostStatus);
}