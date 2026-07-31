import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Connection } from "@solana/web3.js";
import type { PowerPayCluster } from "../constants/clusters.js";
import {
  createClusterConnection,
  resolveRpc,
  type ResolveRpcOptions,
  type ResolvedRpc,
} from "../rpc/clusters.js";

export interface ClusterContextValue extends ResolvedRpc {
  connection: Connection;
  setCluster(cluster: PowerPayCluster): void;
}

const ClusterContext = createContext<ClusterContextValue | null>(null);

export interface ClusterProviderProps
  extends Omit<ResolveRpcOptions, "cluster"> {
  initialCluster?: PowerPayCluster;
  children: React.ReactNode;
}

export function ClusterProvider({
  initialCluster = "devnet",
  children,
  ...options
}: ClusterProviderProps) {
  const [cluster, setClusterState] =
    useState<PowerPayCluster>(initialCluster);

  const resolved = useMemo(
    () => resolveRpc({ ...options, cluster }),
    [cluster, options.rpcUrl, options.wsUrl, options.provider, options.heliusApiKey],
  );
  const connection = useMemo(
    () => createClusterConnection({ ...options, cluster }),
    [resolved.rpcUrl, resolved.wsUrl, resolved.commitment],
  );

  const setCluster = useCallback((next: PowerPayCluster) => {
    setClusterState(next);
  }, []);

  const value = useMemo(
    () => ({ ...resolved, connection, setCluster }),
    [resolved, connection, setCluster],
  );

  return (
    <ClusterContext.Provider value={value}>
      {children}
    </ClusterContext.Provider>
  );
}

export function usePowerPayCluster(): ClusterContextValue {
  const context = useContext<ClusterContextValue | null>(ClusterContext);
  if (!context)
    throw new Error("usePowerPayCluster must be used inside ClusterProvider");
  return context;
}
