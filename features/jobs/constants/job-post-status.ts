import type { JobPostStatus } from "../types/job-post.types";

export const JOB_POST_STATUS = {
  OPEN: "open",
  PAUSED: "paused",
  CLOSED: "closed",
} as const satisfies Record<string, JobPostStatus>;

export const JOB_POST_STATUS_LABELS: Record<JobPostStatus, string> = {
  open: "모집중",
  paused: "일시중지",
  closed: "마감",
};

export const JOB_POST_STATUS_VALUES = Object.values(JOB_POST_STATUS);