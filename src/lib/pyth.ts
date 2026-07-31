import { HermesClient } from "@pythnetwork/hermes-client";

export interface PythPrice {
  id: string;
  price: string;
  confidence: string;
  exponent: number;
  publishTime: number;
}

export class PythPriceClient {
  readonly client: HermesClient;

  constructor(endpoint = "https://hermes.pyth.network") {
    this.client = new HermesClient(endpoint, {});
  }

  async latestPrice(feedId: string): Promise<PythPrice> {
    const response = await this.client.getLatestPriceUpdates(
      [feedId],
      { parsed: true },
    );
    const parsed = response.parsed?.[0];
    if (!parsed?.price) {
      throw new Error(`Pyth price feed ${feedId} returned no parsed price`);
    }
    return {
      id: feedId,
      price: parsed.price.price,
      confidence: parsed.price.conf,
      exponent: parsed.price.expo,
      publishTime: parsed.price.publish_time,
    };
  }

  async latestPrices(feedIds: string[]): Promise<PythPrice[]> {
    return Promise.all(feedIds.map((feedId) => this.latestPrice(feedId)));
  }

  static decimal(price: PythPrice): number {
    return Number(price.price) * 10 ** price.exponent;
  }
}
