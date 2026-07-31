import { PublicKey } from "@solana/web3.js";

export function asPublicKey(
  value: string | PublicKey,
  label = "address",
): PublicKey {
  if (value instanceof PublicKey) return value;
  try {
    return new PublicKey(value);
  } catch (cause) {
    throw new Error(`${label} is not a valid Solana public key`, { cause });
  }
}

export function requiredString(
  value: string | undefined,
  label: string,
): string {
  const normalized = value?.trim();
  if (!normalized) throw new Error(`${label} is required`);
  return normalized;
}

export function unixTimestamp(date = new Date()): number {
  return Math.floor(date.getTime() / 1_000);
}

export function futureIso(seconds: number): string {
  return new Date(Date.now() + seconds * 1_000).toISOString();
}
