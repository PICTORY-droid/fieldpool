import { describe, expect, it } from "vitest";

import { isValidKoreanMobilePhone } from "../../features/workers/server/validate-worker-phone";

describe("isValidKoreanMobilePhone", () => {
  it("accepts valid Korean mobile phone numbers", () => {
    expect(isValidKoreanMobilePhone("010-1234-5678")).toBe(true);
    expect(isValidKoreanMobilePhone("01012345678")).toBe(true);
  });

  it("rejects invalid phone numbers", () => {
    expect(isValidKoreanMobilePhone("02-123-4567")).toBe(false);
    expect(isValidKoreanMobilePhone("1234")).toBe(false);
    expect(isValidKoreanMobilePhone("")).toBe(false);
  });
});