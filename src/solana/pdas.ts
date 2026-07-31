import { PublicKey } from "@solana/web3.js";
import { POWERPAY_PROGRAM_ID, POWERCHAIN_PROGRAM_ID } from "../program-ids.js";
import { fixedBytes, utf8 } from "./bytes.js";

export const powerpayProgramId = new PublicKey(POWERPAY_PROGRAM_ID);
export const powerchainProgramId = new PublicKey(POWERCHAIN_PROGRAM_ID);

export function merchantPda(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [utf8("merchant"), authority.toBytes()],
    powerpayProgramId,
  );
}

export function paymentPda(
  merchant: PublicKey,
  reference: Uint8Array,
): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [
      utf8("payment"),
      merchant.toBytes(),
      fixedBytes(reference, 32, "payment reference"),
    ],
    powerpayProgramId,
  );
}

export function networkPda(authority: PublicKey): [PublicKey, number] {
  return PublicKey.findProgramAddressSync(
    [utf8("network"), authority.toBytes()],
    powerchainProgramId,
  );
}
