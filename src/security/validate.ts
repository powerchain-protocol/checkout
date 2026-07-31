import { PublicKey } from "@solana/web3.js";

export function validateSolanaAddress(value: string): string {
  const key = new PublicKey(value.trim());
  if (!PublicKey.isOnCurve(key.toBytes())) {
    throw new Error("Solana wallet address must be on curve");
  }
  return key.toBase58();
}

export function validateSuiAddress(value: string): string {
  const normalized = value.trim().toLowerCase();
  if (!/^0x[0-9a-f]{64}$/.test(normalized)) {
    throw new Error("Sui address must be a 32-byte 0x-prefixed hex value");
  }
  return normalized;
}

export function validateCoinType(value: string): string {
  const normalized = value.trim();
  if (
    !/^0x[0-9a-fA-F]+::[A-Za-z_][A-Za-z0-9_]*::[A-Za-z_][A-Za-z0-9_]*(?:<.*>)?$/.test(
      normalized,
    )
  ) {
    throw new Error("Invalid Sui Move coin type");
  }
  return normalized;
}

export function validateAtomicAmount(value: string | bigint): bigint {
  const amount = typeof value === "bigint" ? value : BigInt(value);
  if (amount <= 0n) throw new Error("Atomic amount must be positive");
  return amount;
}

export function validateSameChain(
  senderChain: string,
  recipientChain: string,
): void {
  if (senderChain !== recipientChain) {
    throw new Error(
      "Direct transfers require sender and recipient on the same chain",
    );
  }
}
