import { createNeonServerClient } from "../../../server/db/neon-server";

export async function deleteWorkerRecord(workerId: string): Promise<void> {
  const sql = createNeonServerClient();

  await sql`
    delete from public.workers
    where id = ${workerId};
  `;
}