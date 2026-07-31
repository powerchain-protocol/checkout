import { describe, expect, it } from "vitest";
import {
  formatAtomicAmount,
  parseSol,
  parseUiAmount,
} from "../src/solana/amounts.js";

describe("exact amount conversion", () => {
  it("converts SOL without floating-point arithmetic", () => {
    expect(parseSol("1.000000001")).toBe(1_000_000_001n);
  });

  it("converts USDC with six decimals", () => {
    expect(parseUiAmount("12.34", 6)).toBe(12_340_000n);
  });

  it("rejects zero and excessive precision", () => {
    expect(() => parseUiAmount("0", 6)).toThrow();
    expect(() => parseUiAmount("1.0000001", 6)).toThrow();
  });

  it("formats atomic amounts", () => {
    expect(formatAtomicAmount(12_340_000n, 6)).toBe("12.34");
  });
});
