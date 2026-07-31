import {
  Commitment,
  Connection,
  ConnectionConfig,
} from "@solana/web3.js";
import {
  CLUSTERS,
  DEFAULT_CLUSTER,
  isPowerPayCluster,
  PowerPayCluster,
} from "../constants/clusters.js";

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

const HELIUS_HOST: Record<"devnet" | "mainnet-beta", string> = {
  devnet: "https://devnet.helius-rpc.com/",
  "mainnet-beta": "https://mainnet.helius-rpc.com/",
};

export function resolveCluster(
  value?: string,
  fallback: PowerPayCluster = DEFAULT_CLUSTER,
): PowerPayCluster {
  return value && isPowerPayCluster(value) ? value : fallback;
}

export function heliusRpcUrl(
  cluster: PowerPayCluster,
  apiKey: string,
): string {
  if (cluster !== "devnet" && cluster !== "mainnet-beta") {
    throw new Error("Helius RPC is configured only for devnet and mainnet-beta");
  }
  if (!apiKey.trim()) throw new Error("A Helius API key is required");
  return `${HELIUS_HOST[cluster]}?api-key=${encodeURIComponent(apiKey)}`;
}

export function resolveRpc(options: ResolveRpcOptions = {}): ResolvedRpc {
  const env = options.env ?? {};
  const cluster = options.cluster ?? resolveCluster(env.VITE_SOLANA_CLUSTER);
  const definition = CLUSTERS[cluster];
  const explicitRpc =
    options.rpcUrl ??
    env[`VITE_SOLANA_RPC_URL_${cluster === "mainnet-beta" ? "MAINNET" : cluster.toUpperCase()}`] ??
    env.VITE_SOLANA_RPC_URL;
  const heliusKey = options.heliusApiKey ?? env.VITE_HELIUS_API_KEY ?? env.HELIUS_API_KEY;
  const requestedProvider =
    options.provider ??
    (env.VITE_SOLANA_RPC_PROVIDER as RpcProvider | undefined) ??
    (heliusKey && (cluster === "devnet" || cluster === "mainnet-beta")
      ? "helius"
      : explicitRpc
        ? "custom"
        : "public");

  let rpcUrl: string;
  if (requestedProvider === "helius") {
    rpcUrl =
      env[`VITE_HELIUS_RPC_URL_${cluster === "mainnet-beta" ? "MAINNET" : "DEVNET"}`] ??
      env.VITE_HELIUS_RPC_URL ??
      (heliusKey ? heliusRpcUrl(cluster, heliusKey) : "");
    if (!rpcUrl) throw new Error("Helius provider selected without an RPC URL or API key");
  } else {
    rpcUrl = explicitRpc ?? definition.rpcUrl;
  }

  return {
    cluster,
    provider: requestedProvider,
    rpcUrl,
    wsUrl: options.wsUrl ?? env.VITE_SOLANA_WS_URL ?? definition.wsUrl,
    commitment: options.commitment ?? "confirmed",
  };
}

export function createClusterConnection(
  options: ResolveRpcOptions = {},
): Connection {
  const resolved = resolveRpc(options);
  const config: ConnectionConfig = {
    commitment: resolved.commitment,
    wsEndpoint: resolved.wsUrl,
    confirmTransactionInitialTimeout: 60_000,
  };
  return new Connection(resolved.rpcUrl, config);
}
