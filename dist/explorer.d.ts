export type SolanaCluster = "mainnet-beta" | "devnet" | "testnet" | "localnet";
export type ExplorerKind = "solana" | "solscan";
export declare function explorerUrl(args: {
    type: "tx" | "address" | "block";
    value: string | number;
    cluster?: SolanaCluster;
    explorer?: ExplorerKind;
    customRpc?: string;
}): string;
export declare const transactionExplorerUrl: (signature: string, cluster?: SolanaCluster) => string;
export declare const addressExplorerUrl: (address: string, cluster?: SolanaCluster) => string;
