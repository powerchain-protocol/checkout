export type ChainFamily = "solana" | "sui";

export type SolanaCluster =
  | "devnet"
  | "testnet"
  | "mainnet-beta"
  | "localnet";

export type SuiNetwork =
  | "devnet"
  | "testnet"
  | "mainnet"
  | "localnet";

export interface ClusterDefinition {
  id: string;
  chain: ChainFamily;
  name: string;
  network: string;
  rpcUrl: string;
  explorerUrl: string;
  production: boolean;
  nativeCurrency: "SOL" | "SUI";
}
