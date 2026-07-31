import axios, { type AxiosInstance } from "axios";
import type { SuiNetwork } from "../clusters/types.js";
import { validateAtomicAmount, validateCoinType } from "../security/validate.js";

export interface CetusQuote {
  provider: "cetus";
  network: SuiNetwork;
  coinIn: string;
  coinOut: string;
  amountIn: string;
  estimatedAmountOut: string;
  minimumAmountOut: string;
  priceImpactPercentage?: string;
  routeData: unknown;
  expiresAt: string;
}

export interface CetusQuoteAdapter {
  quote(params: {
    network: SuiNetwork;
    coinIn: string;
    coinOut: string;
    amountIn: bigint;
    slippageBps: number;
  }): Promise<CetusQuote>;

  buildSwapTransaction(params: {
    quote: CetusQuote;
    sender: string;
  }): Promise<unknown>;
}

export class CetusService {
  constructor(readonly adapter: CetusQuoteAdapter) {}

  async quote(params: {
    network: SuiNetwork;
    coinIn: string;
    coinOut: string;
    amountIn: string | bigint;
    slippageBps?: number;
  }): Promise<CetusQuote> {
    const amountIn = validateAtomicAmount(params.amountIn);
    const coinIn = validateCoinType(params.coinIn);
    const coinOut = validateCoinType(params.coinOut);
    const slippageBps = params.slippageBps ?? 50;

    if (coinIn === coinOut) throw new Error("Swap assets must be different");
    if (!Number.isInteger(slippageBps) || slippageBps < 1 || slippageBps > 1_000) {
      throw new Error("Slippage must be between 1 and 1000 basis points");
    }

    const quote = await this.adapter.quote({
      network: params.network,
      coinIn,
      coinOut,
      amountIn,
      slippageBps,
    });

    if (BigInt(quote.minimumAmountOut) <= 0n) {
      throw new Error("Cetus quote has an invalid minimum output");
    }
    if (Date.parse(quote.expiresAt) <= Date.now()) {
      throw new Error("Cetus quote is already expired");
    }
    return quote;
  }

  buildSwapTransaction(quote: CetusQuote, sender: string): Promise<unknown> {
    if (Date.parse(quote.expiresAt) <= Date.now()) {
      throw new Error("Cetus quote expired before transaction construction");
    }
    return this.adapter.buildSwapTransaction({ quote, sender });
  }
}

/**
 * Creates a Cetus adapter boundary.
 *
 * Instantiate the official SDK in application code with current network
 * package IDs, pool configuration, and RPC transport, then map its quote and
 * swap transaction output to CetusQuoteAdapter. This prevents stale hard-coded
 * package IDs from entering the core SDK.
 */
export function createCetusSdkAdapter(
  adapter: CetusQuoteAdapter,
): CetusQuoteAdapter {
  return adapter;
}
