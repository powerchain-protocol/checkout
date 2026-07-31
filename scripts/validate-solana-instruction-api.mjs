import { readFileSync } from "node:fs";

const source = readFileSync("src/solana/instructions.ts", "utf8");

for (const name of [
  "initializeMerchantInstruction",
  "createPaymentInstruction",
  "createTokenPaymentInstruction",
  "settlePaymentInstruction",
  "settleTokenPaymentInstruction",
]) {
  if (!source.includes(`export function ${name}`)) {
    throw new Error(`Missing instruction export: ${name}`);
  }
}

if (!source.includes("reference: PublicKey | Uint8Array")) {
  throw new Error("Payment reference compatibility type is missing");
}

if (!source.includes("Buffer.concat")) {
  throw new Error("Instruction data must use Buffer at the web3 boundary");
}

console.log("Solana instruction API: OK");
