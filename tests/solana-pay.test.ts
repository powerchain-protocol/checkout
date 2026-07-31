import { describe, expect, it } from "vitest";
import { PublicKey } from "@solana/web3.js";
import { createSolanaPayUrl } from "../src/solana-pay.js";

describe("Solana Pay", () => {
  it("creates a transfer URL", () => {
    const recipient = new PublicKey("11111111111111111111111111111111");
    const url = createSolanaPayUrl({ recipient, amount: "1.25", label: "PowerPay" });
    expect(url.toString()).toContain("solana:11111111111111111111111111111111");
    expect(url.searchParams.get("amount")).toBe("1.25");
  });
});
