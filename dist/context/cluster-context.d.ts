import type { Connection } from "@solana/web3.js";
import type { PowerPayCluster } from "../constants/clusters.js";
import { type ResolveRpcOptions, type ResolvedRpc } from "../rpc/clusters.js";
export interface ClusterContextValue extends ResolvedRpc {
    connection: Connection;
    setCluster(cluster: PowerPayCluster): void;
}
export interface ClusterProviderProps extends Omit<ResolveRpcOptions, "cluster"> {
    initialCluster?: PowerPayCluster;
    children: React.ReactNode;
}
export declare function ClusterProvider({ initialCluster, children, ...options }: ClusterProviderProps): any;
export declare function usePowerPayCluster(): ClusterContextValue;
