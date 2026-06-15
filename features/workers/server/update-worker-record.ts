import { createNeonServerClient } from "../../../server/db/neon-server";
import type { UpdateWorkerInput } from "../types/worker.types";

export type UpdateWorkerRecordInput = {
  workerId: string;
  input: UpdateWorkerInput;
};

export async function updateWorkerRecord({
  workerId,
  input,
}: UpdateWorkerRecordInput): Promise<void> {
  const normalizedWorkerId = workerId.trim();

  if (!normalizedWorkerId) {
    throw new Error("Worker id is required.");
  }

  const sql = createNeonServerClient();

  await sql`
    update public.workers
    set
      name = ${input.name},
      phone = ${input.phone},
      birth_year = ${input.birthYear ?? null},
      gender = ${input.gender ?? "unknown"},
      main_region = ${input.mainRegion},
      available_regions = ${input.availableRegions},
      job_types = ${input.jobTypes},
      career_years = ${input.careerYears ?? null},
      desired_pay = ${input.desiredPay ?? null},
      has_vehicle = ${input.hasVehicle ?? false},
      can_lodging = ${input.canLodging ?? false},
      languages = ${input.languages ?? []},
      memo = ${input.memo ?? null},
      updated_at = now()
    where id = ${normalizedWorkerId};
  `;
}