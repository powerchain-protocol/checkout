import type { Commitment, PublicKey } from "@solana/web3.js";

export type MaybePromise<T> = T | Promise<T>;
export type CurrencyCode = "SOL" | "USDC" | "PWRP" | (string & {});
export type SolanaCluster = "devnet" | "testnet" | "mainnet-beta" | "localnet";
export type PaymentStatus =
  | "draft"
  | "pending"
  | "submitted"
  | "confirmed"
  | "finalized"
  | "failed"
  | "expired"
  | "refunded";

export interface ClusterOptions {
  cluster: SolanaCluster;
  commitment?: Commitment;
  rpcUrl?: string;
}

export interface AddressLike {
  address: string | PublicKey;
}

export interface PaginationInput {
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor?: string;
}
