"use server";

import { redirect } from "next/navigation";

import { deleteWorkerRecord } from "../server/delete-worker-record";
import { requireAdminAuth } from "../../../server/security/admin-auth";

export async function deleteWorkerAction(formData: FormData): Promise<void> {
  await requireAdminAuth();

  const workerId = String(formData.get("workerId") ?? "");

  if (!workerId) {
    throw new Error("workerId is required.");
  }

  await deleteWorkerRecord(workerId);

  redirect("/admin/workers");
}