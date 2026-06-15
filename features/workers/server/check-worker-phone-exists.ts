import { createNeonServerClient } from "../../../server/db/neon-server";

export async function checkWorkerPhoneExists(phone: string): Promise<boolean> {
  const normalizedPhone = phone.trim();

  if (!normalizedPhone) {
    return false;
  }

  const sql = createNeonServerClient();

  const rows = (await sql`
    select id
    from public.workers
    where phone = ${normalizedPhone}
    limit 1;
  `) as { id: string }[];

  return rows.length > 0;
}