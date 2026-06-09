export const JOB_TYPES = [
  "형틀",
  "철근",
  "콘크리트",
  "비계",
  "미장",
  "방수",
  "타일",
  "전기보조",
  "설비보조",
  "잡부",
  "청소",
  "장비보조",
] as const;

export type JobType = (typeof JOB_TYPES)[number];