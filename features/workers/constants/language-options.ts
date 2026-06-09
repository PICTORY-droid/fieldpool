export const LANGUAGE_OPTIONS = [
  "한국어",
  "영어",
  "중국어",
  "베트남어",
  "태국어",
  "러시아어",
  "우즈베크어",
  "캄보디아어",
] as const;

export type LanguageOption = (typeof LANGUAGE_OPTIONS)[number];