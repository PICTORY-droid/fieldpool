import { createNeonServerClient } from "../../../server/db/neon-server";
import type {
  JobPostSourceType,
  JobPostStatus,
} from "../types/job-post.types";

export type CreateJobPostInput = {
  title: string;
  siteName: string;
  region: string;
  address: string;
  jobTypes: string[];
  neededCount: number | null;
  pay: number | null;
  startDate: string | null;
  endDate: string | null;
  careerYears: number | null;
  requiresVehicle: boolean;
  providesLodging: boolean;
  status: JobPostStatus;
  sourceType?: JobPostSourceType;
  externalSource?: string | null;
  externalId?: string | null;
  memo: string;
};

type CreateJobPostResult = {
  id: string;
};

export async function createJobPost(
  input: CreateJobPostInput,
): Promise<CreateJobPostResult> {
  const sql = createNeonServerClient();

  const rows = (await sql`
    insert into public.job_posts (
      title,
      site_name,
      region,
      address,
      job_types,
      needed_count,
      pay,
      start_date,
      end_date,
      career_years,
      requires_vehicle,
      provides_lodging,
      status,
      source_type,
      external_source,
      external_id,
      memo
    )
    values (
      ${input.title},
      ${input.siteName},
      ${input.region},
      ${input.address},
      ${input.jobTypes},
      ${input.neededCount},
      ${input.pay},
      ${input.startDate},
      ${input.endDate},
      ${input.careerYears},
      ${input.requiresVehicle},
      ${input.providesLodging},
      ${input.status},
      ${input.sourceType ?? "manual"},
      ${input.externalSource ?? null},
      ${input.externalId ?? null},
      ${input.memo}
    )
    returning id
  `) as CreateJobPostResult[];

  const createdJobPost = rows[0];

  if (!createdJobPost) {
    throw new Error("구인 공고 등록에 실패했습니다.");
  }

  return createdJobPost;
}