export type PowerPayCluster = "devnet" | "mainnet-beta" | "testnet" | "localnet";
export interface ClusterDefinition {
    id: PowerPayCluster;
    label: string;
    rpcUrl: string;
    wsUrl?: string;
    explorerCluster?: "devnet" | "testnet";
    production: boolean;
}
export declare const DEFAULT_CLUSTER: PowerPayCluster;
export declare const CLUSTERS: Record<PowerPayCluster, ClusterDefinition>;
export declare function isPowerPayCluster(value: string): value is PowerPayCluster;
//# sourceMappingURL=clusters.d.ts.map