import { describe, expect, it } from "vitest";
import { u32LE, u64LE, utf8 } from "../src/solana/bytes.js";

describe("browser-safe instruction bytes", () => {
  it("encodes UTF-8 without Buffer", () => {
    expect([...utf8("pay")]).toEqual([112, 97, 121]);
  });

  it("encodes little-endian integers", () => {
    expect([...u32LE(258)]).toEqual([2, 1, 0, 0]);
    expect([...u64LE(258n)].slice(0, 3)).toEqual([2, 1, 0]);
  });
});
