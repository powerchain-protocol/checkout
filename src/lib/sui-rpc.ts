import axios, { type AxiosInstance } from "axios";
import type { SuiNetwork } from "../clusters/types.js";
import { SUI_CLUSTERS } from "../clusters/sui.js";

interface SuiRpcResponse<T> {
  jsonrpc: "2.0";
  id: string | number;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
}

export class SuiRpcClient {
  readonly network: SuiNetwork;
  readonly endpoint: string;
  readonly http: AxiosInstance;

  constructor(options: {
    network?: SuiNetwork;
    endpoint?: string;
    timeoutMs?: number;
  } = {}) {
    this.network = options.network ?? "testnet";
    this.endpoint =
      options.endpoint ?? SUI_CLUSTERS[this.network].rpcUrl;
    this.http = axios.create({
      baseURL: this.endpoint,
      timeout: options.timeoutMs ?? 15_000,
      headers: { "content-type": "application/json" },
    });
  }

  async request<T>(method: string, params: unknown[] = []): Promise<T> {
    const { data } = await this.http.post<SuiRpcResponse<T>>("", {
      jsonrpc: "2.0",
      id: crypto.randomUUID(),
      method,
      params,
    });

    if (data.error) {
      throw new Error(
        `Sui RPC ${data.error.code}: ${data.error.message}`,
      );
    }
    if (data.result === undefined) {
      throw new Error(`Sui RPC ${method} returned no result`);
    }
    return data.result;
  }

  getLatestCheckpointSequenceNumber(): Promise<string> {
    return this.request("sui_getLatestCheckpointSequenceNumber");
  }

  getBalance(owner: string, coinType?: string): Promise<{
    coinType: string;
    coinObjectCount: number;
    totalBalance: string;
    lockedBalance: Record<string, string>;
  }> {
    return this.request("suix_getBalance", [owner, coinType]);
  }

  getAllBalances(owner: string): Promise<Array<{
    coinType: string;
    coinObjectCount: number;
    totalBalance: string;
    lockedBalance: Record<string, string>;
  }>> {
    return this.request("suix_getAllBalances", [owner]);
  }

  getCoinMetadata(coinType: string): Promise<{
    decimals: number;
    name: string;
    symbol: string;
    description: string;
    iconUrl?: string;
    id?: string;
  } | null> {
    return this.request("suix_getCoinMetadata", [coinType]);
  }

  getTransactionBlock(digest: string): Promise<unknown> {
    return this.request("sui_getTransactionBlock", [
      digest,
      {
        showEffects: true,
        showEvents: true,
        showInput: true,
        showBalanceChanges: true,
      },
    ]);
  }
}
