import axios, { type AxiosInstance } from "axios";

export interface HeliusClientOptions {
  apiKey: string;
  cluster?: "mainnet-beta" | "devnet";
  rpcUrl?: string;
}

export interface HeliusEnhancedTransaction {
  signature: string;
  type?: string;
  source?: string;
  description?: string;
  fee?: number;
  feePayer?: string;
  timestamp?: number;
  transactionError?: unknown;
}

export class HeliusClient {
  readonly rpcUrl: string;
  readonly api: AxiosInstance;

  constructor(options: HeliusClientOptions) {
    if (!options.apiKey.trim()) throw new Error("Helius API key is required");
    const host =
      options.cluster === "devnet"
        ? "https://devnet.helius-rpc.com"
        : "https://mainnet.helius-rpc.com";
    this.rpcUrl = options.rpcUrl ?? `${host}/?api-key=${options.apiKey}`;
    this.api = axios.create({
      baseURL: "https://api.helius.xyz/v0",
      timeout: 15_000,
      params: { "api-key": options.apiKey },
    });
  }

  async rpc<T>(
    method: string,
    params: unknown[] = [],
  ): Promise<T> {
    const { data } = await axios.post<{
      result?: T;
      error?: { code: number; message: string };
    }>(
      this.rpcUrl,
      {
        jsonrpc: "2.0",
        id: "powerpay",
        method,
        params,
      },
      { timeout: 15_000 },
    );
    if (data.error) {
      throw new Error(`Helius RPC ${data.error.code}: ${data.error.message}`);
    }
    return data.result as T;
  }

  async getTransactions(
    address: string,
    limit = 20,
  ): Promise<HeliusEnhancedTransaction[]> {
    const { data } = await this.api.get<HeliusEnhancedTransaction[]>(
      `/addresses/${address}/transactions`,
      { params: { limit } },
    );
    return data;
  }
}
