import { createNeonServerClient } from "../../../server/db/neon-server";
import {
  WORKER_STATUS,
  type WorkerStatus,
} from "../constants/worker-status";

export type UpdateWorkerStatusInput = {
  workerId: string;
  status: WorkerStatus;
};

const WORKER_STATUS_VALUES = Object.values(WORKER_STATUS);

export async function updateWorkerStatus({
  workerId,
  status,
}: UpdateWorkerStatusInput): Promise<void> {
  if (!workerId.trim()) {
    throw new Error("Worker id is required.");
  }

  if (!isWorkerStatus(status)) {
    throw new Error("Invalid worker status.");
  }

  const sql = createNeonServerClient();

  await sql`
    update public.workers
    set
      status = ${status},
      updated_at = now()
    where id = ${workerId};
  `;
}

function isWorkerStatus(value: string): value is WorkerStatus {
  return WORKER_STATUS_VALUES.includes(value as WorkerStatus);
}