import { PublicKey } from "@solana/web3.js";
import { POWERPAY_PROGRAM_ID, POWERCHAIN_PROGRAM_ID } from "../program-ids.js";
export const powerpayProgramId = new PublicKey(POWERPAY_PROGRAM_ID);
export const powerchainProgramId = new PublicKey(POWERCHAIN_PROGRAM_ID);
export function merchantPda(authority) { return PublicKey.findProgramAddressSync([Buffer.from("merchant"), authority.toBuffer()], powerpayProgramId); }
export function paymentPda(merchant, reference) { if (reference.length !== 32)
    throw new Error("Payment reference must contain exactly 32 bytes"); return PublicKey.findProgramAddressSync([Buffer.from("payment"), merchant.toBuffer(), Buffer.from(reference)], powerpayProgramId); }
export function networkPda(authority) { return PublicKey.findProgramAddressSync([Buffer.from("network"), authority.toBuffer()], powerchainProgramId); }
