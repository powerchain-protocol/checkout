import { describe, expect, it } from "vitest";
import { calculateFees } from "../src/fees.js";

describe("calculateFees", () => {
  it("calculates basis-point fees exactly", () => {
    const result = calculateFees(1_000_000n, { platformBps: 50 });
    expect(result.totalFeeAtomic).toBe(5_000n);
    expect(result.merchantReceivesAtomic).toBe(995_000n);
  });

  it("rejects fees equal to the payment", () => {
    expect(() =>
      calculateFees(100n, {
        platformBps: 0,
        fixedFeeAtomic: 100n,
      }),
    ).toThrow();
  });
});
