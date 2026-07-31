import { describe, expect, it } from "vitest";
import { toFinality } from "../src/solana/finality.js";

describe("toFinality", () => {
  it("preserves confirmed and finalized", () => {
    expect(toFinality("confirmed")).toBe("confirmed");
    expect(toFinality("finalized")).toBe("finalized");
  });

  it("promotes processed history reads to confirmed", () => {
    expect(toFinality("processed")).toBe("confirmed");
  });

  it("uses the configured fallback", () => {
    expect(toFinality(undefined, "finalized")).toBe("finalized");
  });
});
