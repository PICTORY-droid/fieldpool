export const WORKER_STATUS = {
  NEW: "new",
  CONTACT_NEEDED: "contact_needed",
  CONSULTED: "consulted",
  READY_TO_REFER: "ready_to_refer",
  REFERRED: "referred",
  INACTIVE: "inactive",
  BLOCKED: "blocked",
} as const;

export const WORKER_STATUS_LABELS = {
  [WORKER_STATUS.NEW]: "신규 등록",
  [WORKER_STATUS.CONTACT_NEEDED]: "연락 필요",
  [WORKER_STATUS.CONSULTED]: "상담 완료",
  [WORKER_STATUS.READY_TO_REFER]: "소개 가능",
  [WORKER_STATUS.REFERRED]: "소개 완료",
  [WORKER_STATUS.INACTIVE]: "비활성",
  [WORKER_STATUS.BLOCKED]: "주의 필요",
} as const;

export type WorkerStatus = (typeof WORKER_STATUS)[keyof typeof WORKER_STATUS];