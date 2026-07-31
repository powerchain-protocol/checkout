import type { Commitment, Finality } from "@solana/web3.js";

/**
 * Historical transaction RPC methods accept Finality, not the wider
 * Commitment union. A processed request is promoted to confirmed because
 * historical indexing cannot guarantee processed-only observations.
 */
export function toFinality(
  commitment: Commitment | undefined,
  fallback: Finality = "confirmed",
): Finality {
  if (commitment === "finalized" || commitment === "confirmed") {
    return commitment;
  }
  return fallback;
}
