export const REGIONS = [
  "서울",
  "경기",
  "인천",
  "세종",
  "대전",
  "충북",
  "충남",
  "강원",
  "대구",
  "경북",
  "부산",
  "울산",
  "경남",
  "광주",
  "전북",
  "전남",
  "제주",
  "전국",
] as const;

export type Region = (typeof REGIONS)[number];