import { Commitment, Connection } from "@solana/web3.js";
import { PowerPayCluster } from "../constants/clusters.js";
export type RpcProvider = "helius" | "custom" | "public";
export interface ResolveRpcOptions {
    cluster?: PowerPayCluster;
    provider?: RpcProvider;
    rpcUrl?: string;
    wsUrl?: string;
    heliusApiKey?: string;
    commitment?: Commitment;
    env?: Record<string, string | undefined>;
}
export interface ResolvedRpc {
    cluster: PowerPayCluster;
    provider: RpcProvider;
    rpcUrl: string;
    wsUrl?: string;
    commitment: Commitment;
}
export declare function resolveCluster(value?: string, fallback?: PowerPayCluster): PowerPayCluster;
export declare function heliusRpcUrl(cluster: PowerPayCluster, apiKey: string): string;
export declare function resolveRpc(options?: ResolveRpcOptions): ResolvedRpc;
export declare function createClusterConnection(options?: ResolveRpcOptions): Connection;
