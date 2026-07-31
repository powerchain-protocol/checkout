import type { ClusterDefinition, SuiNetwork } from "./types.js";

export const SUI_CLUSTERS: Record<SuiNetwork, ClusterDefinition> = {
  devnet: {
    id: "sui:devnet",
    chain: "sui",
    name: "Sui Devnet",
    network: "devnet",
    rpcUrl: "https://fullnode.devnet.sui.io:443",
    explorerUrl: "https://suiscan.xyz/devnet",
    production: false,
    nativeCurrency: "SUI",
  },
  testnet: {
    id: "sui:testnet",
    chain: "sui",
    name: "Sui Testnet",
    network: "testnet",
    rpcUrl: "https://fullnode.testnet.sui.io:443",
    explorerUrl: "https://suiscan.xyz/testnet",
    production: false,
    nativeCurrency: "SUI",
  },
  mainnet: {
    id: "sui:mainnet",
    chain: "sui",
    name: "Sui Mainnet",
    network: "mainnet",
    rpcUrl: "https://fullnode.mainnet.sui.io:443",
    explorerUrl: "https://suiscan.xyz/mainnet",
    production: true,
    nativeCurrency: "SUI",
  },
  localnet: {
    id: "sui:localnet",
    chain: "sui",
    name: "Sui Local Network",
    network: "localnet",
    rpcUrl: "http://127.0.0.1:9000",
    explorerUrl: "http://127.0.0.1:3000",
    production: false,
    nativeCurrency: "SUI",
  },
};
