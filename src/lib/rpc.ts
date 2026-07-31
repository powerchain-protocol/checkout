import {
  Connection,
  type Commitment,
  type ConnectionConfig,
} from "@solana/web3.js";
import type { SolanaCluster } from "../types/common.js";
import { networkConfig } from "../config/networks.js";

export interface RpcClientOptions {
  cluster?: SolanaCluster;
  endpoint?: string;
  commitment?: Commitment;
  config?: ConnectionConfig;
}

export function createRpcConnection(
  options: RpcClientOptions = {},
): Connection {
  const cluster = options.cluster ?? "devnet";
  const endpoint = options.endpoint ?? networkConfig(cluster).rpcUrl;
  return new Connection(endpoint, {
    commitment: options.commitment ?? "confirmed",
    confirmTransactionInitialTimeout: 60_000,
    ...options.config,
  });
}

export async function getRpcHealth(connection: Connection): Promise<{
  ok: boolean;
  slot: number;
  blockHeight: number;
}> {
  const [slot, blockHeight] = await Promise.all([
    connection.getSlot("confirmed"),
    connection.getBlockHeight("confirmed"),
  ]);
  return { ok: slot > 0 && blockHeight > 0, slot, blockHeight };
}
