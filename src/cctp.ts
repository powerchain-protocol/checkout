import { PublicKey } from "@solana/web3.js";

export type CctpEnvironment = "mainnet" | "devnet";
export const SOLANA_CCTP_DOMAIN = 5;
export const CCTP_V2_PROGRAMS = {
  mainnet: {
    messageTransmitter: new PublicKey("CCTPV2Sm4AdWt5296sk4P66VBZ7bEhcARwFaaS9YPbeC"),
    tokenMessengerMinter: new PublicKey("CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe"),
  },
  devnet: {
    messageTransmitter: new PublicKey("CCTPV2Sm4AdWt5296sk4P66VBZ7bEhcARwFaaS9YPbeC"),
    tokenMessengerMinter: new PublicKey("CCTPV2vPZJS2u2BBsUoscuikbYjnpFmbFsvVuJdgUMQe"),
  },
} as const;

export interface CctpTransferQuote {
  amount: bigint;
  maxFee: bigint;
  destinationDomain: number;
  minFinalityThreshold: number;
}

export function calculateCctpMaxFee(amount: bigint, feeBps: number, minimumAtomic = 0n): bigint {
  if (amount < 0n) throw new RangeError("amount must be non-negative");
  if (!Number.isInteger(feeBps) || feeBps < 0 || feeBps > 10_000) throw new RangeError("feeBps must be 0..10000");
  const fee = (amount * BigInt(feeBps) + 9_999n) / 10_000n;
  return fee > minimumAtomic ? fee : minimumAtomic;
}

export class CctpAttestationClient {
  constructor(private readonly endpoint = "https://iris-api.circle.com") {}

  async fetchMessage(messageHash: string, fetchImpl: typeof fetch = fetch): Promise<unknown> {
    if (!/^0x[0-9a-fA-F]{64}$/.test(messageHash)) throw new Error("messageHash must be a 32-byte hex value");
    const response = await fetchImpl(`${this.endpoint.replace(/\/$/, "")}/v2/messages/${SOLANA_CCTP_DOMAIN}?transactionHash=${encodeURIComponent(messageHash)}`);
    if (!response.ok) throw new Error(`CCTP message lookup failed (${response.status})`);
    return response.json();
  }
}
