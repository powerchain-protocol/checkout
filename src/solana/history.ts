import {
  Connection,
  PublicKey,
  type Commitment,
  type Finality,
  type ParsedTransactionWithMeta,
  type ConfirmedSignatureInfo,
} from "@solana/web3.js";
import { toFinality } from "./finality.js";

export interface WalletTransactionRecord {
  signature: string;
  slot: number;
  blockTime: number | null;
  confirmationStatus: string | null;
  error: unknown;
  transaction: ParsedTransactionWithMeta | null;
}

export async function fetchWalletTransactions(params: {
  connection: Connection;
  wallet: PublicKey;
  limit?: number;
  commitment?: Commitment;
  before?: string;
}): Promise<WalletTransactionRecord[]> {
  const finality: Finality = toFinality(params.commitment);

  const signatures: ConfirmedSignatureInfo[] =
    await params.connection.getSignaturesForAddress(
      params.wallet,
      {
        limit: Math.min(Math.max(params.limit ?? 20, 1), 100),
        before: params.before,
      },
      finality,
    );

  const transactions = await params.connection.getParsedTransactions(
    signatures.map((item) => item.signature),
    {
      commitment: finality,
      maxSupportedTransactionVersion: 0,
    },
  );

  return signatures.map((item, index) => ({
    signature: item.signature,
    slot: item.slot,
    blockTime: item.blockTime ?? null,
    confirmationStatus: item.confirmationStatus ?? null,
    error: item.err,
    transaction: transactions[index] ?? null,
  }));
}

export async function assertConfirmedSignature(params: {
  connection: Connection;
  signature: string;
  commitment?: Commitment;
}): Promise<void> {
  const status = await params.connection.getSignatureStatus(params.signature, {
    searchTransactionHistory: true,
  });
  if (!status.value) throw new Error("Transaction signature was not found");
  if (status.value.err) {
    throw new Error(`Transaction failed: ${JSON.stringify(status.value.err)}`);
  }
  const requested = toFinality(params.commitment);
  if (
    requested === "finalized" &&
    status.value.confirmationStatus !== "finalized"
  ) {
    throw new Error("Transaction has not reached finalized commitment");
  }
}
