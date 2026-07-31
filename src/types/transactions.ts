import type { ChainFamily } from "../clusters/types.js";
import type { TransactionLifecycle } from "./status.js";

export interface ChainTransactionResult {
  chain: ChainFamily;
  network: string;
  digest: string;
  status: TransactionLifecycle;
  sender: string;
  recipient?: string;
  asset: string;
  amountAtomic?: string;
  checkpointOrSlot?: string;
  explorerUrl?: string;
  error?: string;
}

export interface WalletTransactionRequest {
  chain: ChainFamily;
  network: string;
  sender: string;
  recipient: string;
  asset: string;
  amountAtomic: string;
  metadata?: Record<string, unknown>;
}
