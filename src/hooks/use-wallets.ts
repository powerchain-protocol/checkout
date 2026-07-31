import { useMemo } from "react";
import type { PublicKey } from "@solana/web3.js";
import type { ConnectedSolanaWallet } from "../solana/wallet.js";

export interface WalletView {
  address: string | null;
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  canSign: boolean;
}

export function useWallets(wallet: ConnectedSolanaWallet & {
  connecting?: boolean;
}): WalletView {
  return useMemo(() => ({
    address: wallet.publicKey?.toBase58() ?? null,
    publicKey: wallet.publicKey,
    connected: Boolean(wallet.publicKey && wallet.connected !== false),
    connecting: wallet.connecting ?? false,
    canSign: Boolean(wallet.signTransaction || wallet.sendTransaction),
  }), [
    wallet.publicKey,
    wallet.connected,
    wallet.connecting,
    wallet.signTransaction,
    wallet.sendTransaction,
  ]);
}
