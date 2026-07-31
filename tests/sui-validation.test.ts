import { describe, expect, it } from "vitest";
import {
  validateAtomicAmount,
  validateCoinType,
  validateSuiAddress,
} from "../src/security/validate.js";

describe("Sui validation", () => {
  it("accepts canonical addresses", () => {
    const address = `0x${"1".repeat(64)}`;
    expect(validateSuiAddress(address)).toBe(address);
  });

  it("accepts Move coin types", () => {
    expect(validateCoinType("0x2::sui::SUI")).toBe("0x2::sui::SUI");
  });

  it("rejects zero atomic amounts", () => {
    expect(() => validateAtomicAmount("0")).toThrow();
  });
});
