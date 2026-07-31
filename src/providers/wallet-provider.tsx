import React from "react";
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider,
} from "@solana/wallet-adapter-react";
import type { Adapter } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  ClusterProvider,
  usePowerPayCluster,
} from "../context/cluster-context.js";
import type { PowerPayCluster } from "../constants/clusters.js";
import type { RpcProvider } from "../rpc/clusters.js";

export interface WalletProviderProps {
  children: React.ReactNode;
  cluster?: PowerPayCluster;
  rpcProvider?: RpcProvider;
  rpcUrl?: string;
  wsUrl?: string;
  heliusApiKey?: string;
  wallets?: Adapter[];
  autoConnect?: boolean;
}

function WalletRuntime({
  children,
  wallets = [],
  autoConnect = true,
}: Omit<
  WalletProviderProps,
  "cluster" | "rpcProvider" | "rpcUrl" | "wsUrl" | "heliusApiKey"
>) {
  const { rpcUrl } = usePowerPayCluster();

  return (
    <ConnectionProvider endpoint={rpcUrl}>
      <SolanaWalletProvider wallets={wallets} autoConnect={autoConnect}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  );
}

export function WalletProvider({
  children,
  cluster = "devnet",
  rpcProvider,
  rpcUrl,
  wsUrl,
  heliusApiKey,
  wallets,
  autoConnect,
}: WalletProviderProps) {
  return (
    <ClusterProvider
      initialCluster={cluster}
      provider={rpcProvider}
      rpcUrl={rpcUrl}
      wsUrl={wsUrl}
      heliusApiKey={heliusApiKey}
    >
      <WalletRuntime wallets={wallets} autoConnect={autoConnect}>
        {children}
      </WalletRuntime>
    </ClusterProvider>
  );
}
