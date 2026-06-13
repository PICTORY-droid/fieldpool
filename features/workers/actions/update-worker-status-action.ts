"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  WORKER_STATUS,
  type WorkerStatus,
} from "../constants/worker-status";
import { updateWorkerStatus } from "../server/update-worker-status";

const WORKER_STATUS_VALUES = Object.values(WORKER_STATUS);

export async function updateWorkerStatusAction(
  formData: FormData,
): Promise<void> {
  const workerId = String(formData.get("workerId") ?? "").trim();
  const status = String(formData.get("status") ?? "");

  if (!workerId) {
    throw new Error("Worker id is required.");
  }

  if (!isWorkerStatus(status)) {
    throw new Error("Invalid worker status.");
  }

  await updateWorkerStatus({
    workerId,
    status,
  });

  revalidatePath("/admin/workers");
  revalidatePath(`/admin/workers/${workerId}`);

  redirect(`/admin/workers/${workerId}`);
}

function isWorkerStatus(value: string): value is WorkerStatus {
  return WORKER_STATUS_VALUES.includes(value as WorkerStatus);
}