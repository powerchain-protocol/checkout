import { describe, expect, it } from "vitest";
import { Keypair } from "@solana/web3.js";
import { merchantPda, paymentPda } from "../src/solana/pdas.js";
describe("PDA derivation",()=>{it("is deterministic",()=>{const a=Keypair.generate().publicKey;expect(merchantPda(a)[0].equals(merchantPda(a)[0])).toBe(true)});it("requires 32-byte references",()=>expect(()=>paymentPda(new Uint8Array(31))).toThrow());});
