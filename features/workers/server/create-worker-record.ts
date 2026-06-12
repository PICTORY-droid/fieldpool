import { createNeonServerClient } from "../../../server/db/neon-server";
import { mapWorkerToDatabase } from "./map-worker-to-database";
import type { CreateWorkerInput } from "../types/worker.types";

export type CreateWorkerRecordResult = {
  id: string;
};

export async function createWorkerRecord(
  input: CreateWorkerInput,
): Promise<CreateWorkerRecordResult> {
  const sql = createNeonServerClient();
  const worker = mapWorkerToDatabase(input);

  const rows = await sql`
    insert into public.workers (
      name,
      phone,
      birth_year,
      gender,
      main_region,
      available_regions,
      job_types,
      career_years,
      desired_pay,
      has_vehicle,
      can_lodging,
      languages,
      memo,
      status,
      consent_privacy
    )
    values (
      ${worker.name},
      ${worker.phone},
      ${worker.birth_year},
      ${worker.gender},
      ${worker.main_region},
      ${worker.available_regions},
      ${worker.job_types},
      ${worker.career_years},
      ${worker.desired_pay},
      ${worker.has_vehicle},
      ${worker.can_lodging},
      ${worker.languages},
      ${worker.memo},
      ${worker.status},
      ${worker.consent_privacy}
    )
    returning id;
  `;

  const savedWorker = rows[0] as { id: string } | undefined;

  if (!savedWorker?.id) {
    throw new Error("Failed to create worker record.");
  }

  return {
    id: savedWorker.id,
  };
}