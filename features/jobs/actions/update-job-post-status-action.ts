"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  JOB_POST_STATUS_VALUES,
} from "../constants/job-post-status";
import { updateJobPostStatus } from "../server/update-job-post-status";
import type { JobPostStatus } from "../types/job-post.types";
import { requireAdminAuth } from "../../../server/security/admin-auth";

export async function updateJobPostStatusAction(
  formData: FormData,
): Promise<void> {
  await requireAdminAuth();

  const jobPostId = String(formData.get("jobPostId") ?? "").trim();
  const status = String(formData.get("status") ?? "");

  if (!jobPostId) {
    throw new Error("Job post id is required.");
  }

  if (!isJobPostStatus(status)) {
    throw new Error("Invalid job post status.");
  }

  await updateJobPostStatus({
    jobPostId,
    status,
  });

  revalidatePath("/admin/jobs");
  revalidatePath(`/admin/jobs/${jobPostId}`);

  redirect(`/admin/jobs/${jobPostId}`);
}

function isJobPostStatus(value: string): value is JobPostStatus {
  return JOB_POST_STATUS_VALUES.includes(value as JobPostStatus);
}