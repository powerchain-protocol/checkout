import { describe, expect, it } from "vitest";
import { explorerUrl } from "../src/explorer.js";

describe("explorer", () => {
  it("adds devnet cluster", () => expect(explorerUrl({ type: "tx", value: "abc", cluster: "devnet" })).toBe("https://explorer.solana.com/tx/abc?cluster=devnet"));
});
