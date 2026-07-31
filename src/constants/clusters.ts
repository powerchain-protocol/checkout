import { clusterApiUrl } from "@solana/web3.js";

export type PowerPayCluster = "devnet" | "mainnet-beta" | "testnet" | "localnet";

export interface ClusterDefinition {
  id: PowerPayCluster;
  label: string;
  rpcUrl: string;
  wsUrl?: string;
  explorerCluster?: "devnet" | "testnet";
  production: boolean;
}

export const DEFAULT_CLUSTER: PowerPayCluster = "devnet";

export const CLUSTERS: Record<PowerPayCluster, ClusterDefinition> = {
  devnet: {
    id: "devnet",
    label: "Devnet",
    rpcUrl: clusterApiUrl("devnet"),
    wsUrl: "wss://api.devnet.solana.com",
    explorerCluster: "devnet",
    production: false,
  },
  "mainnet-beta": {
    id: "mainnet-beta",
    label: "Mainnet",
    rpcUrl: clusterApiUrl("mainnet-beta"),
    wsUrl: "wss://api.mainnet-beta.solana.com",
    production: true,
  },
  testnet: {
    id: "testnet",
    label: "Testnet",
    rpcUrl: clusterApiUrl("testnet"),
    wsUrl: "wss://api.testnet.solana.com",
    explorerCluster: "testnet",
    production: false,
  },
  localnet: {
    id: "localnet",
    label: "Local validator",
    rpcUrl: "http://127.0.0.1:8899",
    wsUrl: "ws://127.0.0.1:8900",
    production: false,
  },
};

export function isPowerPayCluster(value: string): value is PowerPayCluster {
  return value in CLUSTERS;
}
