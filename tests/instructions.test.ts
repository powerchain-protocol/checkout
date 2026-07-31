import { describe, expect, it } from "vitest";
import { Keypair } from "@solana/web3.js";
import { createPaymentInstruction, initializeMerchantInstruction } from "../src/solana/instructions.js";

describe("PowerPay instruction encoding", () => {
  it("encodes merchant fee as little endian", () => {
    const authority = Keypair.generate().publicKey;
    const ix = initializeMerchantInstruction(authority, Keypair.generate().publicKey, 250);
    expect([...ix.data]).toEqual([0, 250, 0]);
  });
  it("encodes a payment with stable 49-byte payload", () => {
    const ix = createPaymentInstruction({ payer: Keypair.generate().publicKey, merchant: Keypair.generate().publicKey, reference: new Uint8Array(32).fill(9), amount: 42n, expiresAt: 2_000_000_000n });
    expect(ix.data.length).toBe(49); expect(ix.data[0]).toBe(2); expect(ix.data.readBigUInt64LE(33)).toBe(42n);
  });
  it("rejects malformed references", () => {
    expect(() => createPaymentInstruction({ payer: Keypair.generate().publicKey, merchant: Keypair.generate().publicKey, reference: new Uint8Array(4), amount: 1n, expiresAt: 2n })).toThrow(/32 bytes/);
  });
});
