import { createNeonServerClient } from "../../../server/db/neon-server";

export async function checkWorkerPhoneExistsExcludingWorker({
  phone,
  workerId,
}: {
  phone: string;
  workerId: string;
}): Promise<boolean> {
  const normalizedPhone = phone.trim();
  const normalizedWorkerId = workerId.trim();

  if (!normalizedPhone || !normalizedWorkerId) {
    return false;
  }

  const sql = createNeonServerClient();

  const rows = (await sql`
    select id
    from public.workers
    where phone = ${normalizedPhone}
      and id <> ${normalizedWorkerId}
    limit 1;
  `) as { id: string }[];

  return rows.length > 0;
}