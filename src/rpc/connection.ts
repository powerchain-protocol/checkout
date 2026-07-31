import {
  Commitment,
  Connection,
  ConnectionConfig,
} from "@solana/web3.js";
import { runtimeConfig } from "../config.js";

export interface RpcConnectionOptions {
  rpcUrl?: string;
  wsUrl?: string;
  commitment?: Commitment;
  confirmTransactionInitialTimeout?: number;
}

export function createPowerPayConnection(
  options: RpcConnectionOptions = {},
): Connection {
  const config = runtimeConfig();
  const connectionConfig: ConnectionConfig = {
    commitment: options.commitment ?? "confirmed",
    wsEndpoint: options.wsUrl ?? config.wsUrl,
    confirmTransactionInitialTimeout:
      options.confirmTransactionInitialTimeout ?? 60_000,
  };

  return new Connection(options.rpcUrl ?? config.rpcUrl, connectionConfig);
}

export async function rpcHealth(connection = createPowerPayConnection()) {
  const [slot, blockHeight, version] = await Promise.all([
    connection.getSlot("confirmed"),
    connection.getBlockHeight("confirmed"),
    connection.getVersion(),
  ]);
  return { slot, blockHeight, version, rpcEndpoint: connection.rpcEndpoint };
}
