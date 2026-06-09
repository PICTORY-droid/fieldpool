export const WORKER_ERRORS = {
  NAME_REQUIRED: "이름을 입력해 주세요.",
  PHONE_REQUIRED: "연락처를 입력해 주세요.",
  PHONE_INVALID: "연락처 형식이 올바르지 않습니다.",
  JOB_TYPE_REQUIRED: "가능한 공종을 1개 이상 선택해 주세요.",
  REGION_REQUIRED: "근무 가능 지역을 선택해 주세요.",
  CONSENT_REQUIRED: "개인정보 수집 및 이용 동의가 필요합니다.",
  SAVE_FAILED: "인력 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.",
} as const;

export type WorkerErrorCode = keyof typeof WORKER_ERRORS;