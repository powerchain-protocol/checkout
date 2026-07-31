import type { CurrencyCode } from "../types/common.js";
import { PythPriceClient } from "../lib/pyth.js";

export interface AssetPrice {
  symbol: CurrencyCode;
  usd: string;
  source: "pyth" | "configured";
  publishTime: number;
}

export interface PriceFeedRegistry {
  [symbol: string]: string | undefined;
}

export class PriceService {
  constructor(
    readonly pyth: PythPriceClient,
    readonly feeds: PriceFeedRegistry,
  ) {}

  async price(symbol: CurrencyCode): Promise<AssetPrice> {
    const feedId = this.feeds[symbol];
    if (!feedId) {
      throw new Error(`No Pyth feed is configured for ${symbol}`);
    }
    const result = await this.pyth.latestPrice(feedId);
    return {
      symbol,
      usd: String(PythPriceClient.decimal(result)),
      source: "pyth",
      publishTime: result.publishTime,
    };
  }

  async prices(symbols: CurrencyCode[]): Promise<AssetPrice[]> {
    return Promise.all(symbols.map((symbol) => this.price(symbol)));
  }
}
