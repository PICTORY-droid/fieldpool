"use server";

import { redirect } from "next/navigation";

import { requireAdminAuth } from "../../../server/security/admin-auth";
import { deleteJobPost } from "../server/delete-job-post";

export async function deleteJobPostAction(formData: FormData): Promise<void> {
  await requireAdminAuth();

  const jobPostId = String(formData.get("jobPostId") ?? "");
  const confirmDelete = formData.get("confirmDelete");

  if (!jobPostId) {
    throw new Error("jobPostId is required.");
  }

  if (confirmDelete !== "on") {
    throw new Error("Delete confirmation is required.");
  }

  await deleteJobPost(jobPostId);

  redirect("/admin/jobs");
}