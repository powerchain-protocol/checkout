import type {
  PublicKey,
  Transaction,
  VersionedTransaction,
} from "@solana/web3.js";

export interface ConnectedSolanaWallet {
  publicKey: PublicKey | null;
  connected?: boolean;
  connect?: () => Promise<void>;
  sendTransaction(
    transaction: Transaction | VersionedTransaction,
    connection: import("@solana/web3.js").Connection,
    options?: import("@solana/web3.js").SendOptions,
  ): Promise<string>;
  signTransaction?: <T extends Transaction | VersionedTransaction>(
    transaction: T,
  ) => Promise<T>;
}

export async function requireConnectedWallet(
  wallet: ConnectedSolanaWallet,
): Promise<PublicKey> {
  if (!wallet.publicKey && wallet.connect) {
    await wallet.connect();
  }
  if (!wallet.publicKey) {
    throw new Error("Connect a Solana wallet before creating a payment");
  }
  return wallet.publicKey;
}

export function walletAddress(wallet: ConnectedSolanaWallet): string | null {
  return wallet.publicKey?.toBase58() ?? null;
}
