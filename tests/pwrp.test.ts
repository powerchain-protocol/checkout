import { describe, expect, it } from "vitest";
import { atomicToPwrp, pwrpToAtomic, POWERPAY_TOKEN } from "../src/pwrp";

describe("PWRP token helpers", () => {
  it("uses the recommended identity", () => {
    expect(POWERPAY_TOKEN.symbol).toBe("PWRP");
    expect(POWERPAY_TOKEN.decimals).toBe(6);
  });
  it("converts UI amounts without floating-point arithmetic", () => {
    expect(pwrpToAtomic("12.345678")).toBe(12_345_678n);
    expect(atomicToPwrp(12_345_678n)).toBe("12.345678");
  });
  it("rejects excess precision", () => {
    expect(() => pwrpToAtomic("1.0000001")).toThrow();
  });
});
