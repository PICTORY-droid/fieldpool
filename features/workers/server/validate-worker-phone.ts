export function isValidKoreanMobilePhone(phone: string): boolean {
  const normalizedPhone = phone.replaceAll(/[^\d]/g, "");

  return /^01[016789]\d{7,8}$/.test(normalizedPhone);
}