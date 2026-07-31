import { useCallback, useMemo } from "react";
import type { PublicKey, Transaction, VersionedTransaction } from "@solana/web3.js";
import type { ConnectedSolanaWallet } from "../solana/wallet.js";

export type WalletConnectionState =
  | "disconnected"
  | "connecting"
  | "connected"
  | "disconnecting"
  | "error";

export interface WalletCapabilities {
  signTransaction: boolean;
  signAllTransactions: boolean;
  sendTransaction: boolean;
}

export interface WalletView {
  address: string | null;
  shortAddress: string | null;
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  disconnecting: boolean;
  state: WalletConnectionState;
  canSign: boolean;
  capabilities: WalletCapabilities;
  refresh(): void;
}

export interface WalletAdapterView extends ConnectedSolanaWallet {
  connecting?: boolean;
  disconnecting?: boolean;
  error?: Error | null;
  signAllTransactions?: (
    transactions: Array<Transaction | VersionedTransaction>,
  ) => Promise<Array<Transaction | VersionedTransaction>>;
}

function shorten(value: string): string {
  return value.length <= 12
    ? value
    : `${value.slice(0, 6)}…${value.slice(-4)}`;
}

export function useWallets(wallet: WalletAdapterView): WalletView {
  const refresh = useCallback(() => {
    // Accessing the latest adapter state is sufficient for adapter-backed hooks.
    // This callback gives consumers a stable action for manual UI refresh flows.
  }, []);

  return useMemo(() => {
    const address = wallet.publicKey?.toBase58() ?? null;
    const connected = Boolean(
      wallet.publicKey && wallet.connected !== false,
    );
    const connecting = wallet.connecting ?? false;
    const disconnecting = wallet.disconnecting ?? false;

    const state: WalletConnectionState = wallet.error
      ? "error"
      : disconnecting
        ? "disconnecting"
        : connecting
          ? "connecting"
          : connected
            ? "connected"
            : "disconnected";

    const capabilities: WalletCapabilities = {
      signTransaction: Boolean(wallet.signTransaction),
      signAllTransactions: Boolean(wallet.signAllTransactions),
      sendTransaction: Boolean(wallet.sendTransaction),
    };

    return {
      address,
      shortAddress: address ? shorten(address) : null,
      publicKey: wallet.publicKey,
      connected,
      connecting,
      disconnecting,
      state,
      canSign:
        capabilities.signTransaction ||
        capabilities.signAllTransactions ||
        capabilities.sendTransaction,
      capabilities,
      refresh,
    };
  }, [
    wallet.publicKey,
    wallet.connected,
    wallet.connecting,
    wallet.disconnecting,
    wallet.error,
    wallet.signTransaction,
    wallet.signAllTransactions,
    wallet.sendTransaction,
    refresh,
  ]);
}
