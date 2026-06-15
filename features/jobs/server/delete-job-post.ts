import { createNeonServerClient } from "../../../server/db/neon-server";

export async function deleteJobPost(jobPostId: string): Promise<void> {
  const sql = createNeonServerClient();

  await sql`
    delete from public.job_posts
    where id = ${jobPostId};
  `;
}