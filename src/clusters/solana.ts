import type { ClusterDefinition, SolanaCluster } from "./types.js";

export const SOLANA_CLUSTERS: Record<SolanaCluster, ClusterDefinition> = {
  devnet: {
    id: "solana:devnet",
    chain: "solana",
    name: "Solana Devnet",
    network: "devnet",
    rpcUrl: "https://api.devnet.solana.com",
    explorerUrl: "https://explorer.solana.com?cluster=devnet",
    production: false,
    nativeCurrency: "SOL",
  },
  testnet: {
    id: "solana:testnet",
    chain: "solana",
    name: "Solana Testnet",
    network: "testnet",
    rpcUrl: "https://api.testnet.solana.com",
    explorerUrl: "https://explorer.solana.com?cluster=testnet",
    production: false,
    nativeCurrency: "SOL",
  },
  "mainnet-beta": {
    id: "solana:mainnet-beta",
    chain: "solana",
    name: "Solana Mainnet Beta",
    network: "mainnet-beta",
    rpcUrl: "https://api.mainnet-beta.solana.com",
    explorerUrl: "https://explorer.solana.com",
    production: true,
    nativeCurrency: "SOL",
  },
  localnet: {
    id: "solana:localnet",
    chain: "solana",
    name: "Solana Local Validator",
    network: "localnet",
    rpcUrl: "http://127.0.0.1:8899",
    explorerUrl: "https://explorer.solana.com?cluster=custom",
    production: false,
    nativeCurrency: "SOL",
  },
};
