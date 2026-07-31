export type PriceAsset = "EUR" | "USD" | "SOL" | "USDC" | "PWRC";
export type QuoteCurrency = "USD" | "EUR";

export interface PricePoint {
  asset: PriceAsset;
  quote: QuoteCurrency;
  price: number;
  confidence: number;
  publishTime: number;
  feedId: string;
  source: "pyth-hermes" | "configured";
}

export interface PriceClientOptions {
  endpoint?: string;
  apiKey?: string;
  maxAgeSeconds?: number;
  pwrcUsdPrice?: number;
  feedIds?: Partial<Record<`${PriceAsset}/${QuoteCurrency}`, string>>;
  fetchImpl?: typeof fetch;
}

type HermesFeed = { id: string; attributes?: { symbol?: string; display_symbol?: string } };
type HermesLatest = {
  parsed?: Array<{
    id: string;
    price: { price: string; conf: string; expo: number; publish_time: number };
  }>;
};

const DEFAULT_ENDPOINT = "https://pyth.dourolabs.app/hermes";

function normalizeFeedId(id: string): string {
  return id.startsWith("0x") ? id.slice(2) : id;
}

function scale(value: string, expo: number): number {
  const result = Number(value) * 10 ** expo;
  if (!Number.isFinite(result)) throw new Error("Invalid oracle value");
  return result;
}

export class PythPriceClient {
  private readonly endpoint: string;
  private readonly apiKey?: string;
  private readonly maxAgeSeconds: number;
  private readonly feedIds: PriceClientOptions["feedIds"];
  private readonly pwrcUsdPrice?: number;
  private readonly fetchImpl: typeof fetch;
  private readonly discovered = new Map<string, string>();

  constructor(options: PriceClientOptions = {}) {
    this.endpoint = (options.endpoint ?? DEFAULT_ENDPOINT).replace(/\/$/, "");
    this.apiKey = options.apiKey;
    this.maxAgeSeconds = options.maxAgeSeconds ?? 60;
    this.feedIds = options.feedIds ?? {};
    this.pwrcUsdPrice = options.pwrcUsdPrice;
    this.fetchImpl = options.fetchImpl ?? fetch;
  }

  private headers(): HeadersInit {
    return this.apiKey ? { Authorization: `Bearer ${this.apiKey}` } : {};
  }

  async discoverFeed(base: PriceAsset, quote: QuoteCurrency): Promise<string> {
    const pair = `${base}/${quote}` as const;
    const configured = this.feedIds?.[pair];
    if (configured) return normalizeFeedId(configured);
    const cached = this.discovered.get(pair);
    if (cached) return cached;

    const url = new URL(`${this.endpoint}/v2/price_feeds`);
    url.searchParams.set("query", pair);
    url.searchParams.set("asset_type", "crypto");
    let response = await this.fetchImpl(url, { headers: this.headers() });
    if (!response.ok) throw new Error(`Pyth feed discovery failed (${response.status})`);
    let feeds = (await response.json()) as HermesFeed[];

    if (!feeds.length && (base === "EUR" || quote === "EUR")) {
      url.searchParams.set("asset_type", "fx");
      response = await this.fetchImpl(url, { headers: this.headers() });
      if (!response.ok) throw new Error(`Pyth FX feed discovery failed (${response.status})`);
      feeds = (await response.json()) as HermesFeed[];
    }

    const exact = feeds.find((feed) => {
      const symbol = feed.attributes?.display_symbol ?? feed.attributes?.symbol ?? "";
      return symbol.toUpperCase().replace("-", "/") === pair;
    }) ?? feeds[0];
    if (!exact?.id) throw new Error(`No Pyth feed found for ${pair}`);
    const id = normalizeFeedId(exact.id);
    this.discovered.set(pair, id);
    return id;
  }

  async fetchPair(base: PriceAsset, quote: QuoteCurrency = "USD"): Promise<PricePoint> {
    if (base === quote) {
      return { asset: base, quote, price: 1, confidence: 0, publishTime: Math.floor(Date.now() / 1000), feedId: "identity", source: "configured" };
    }
    if (base === "PWRC" && quote === "USD" && this.pwrcUsdPrice !== undefined) {
      if (!(this.pwrcUsdPrice > 0)) throw new Error("pwrcUsdPrice must be positive");
      return { asset: base, quote, price: this.pwrcUsdPrice, confidence: 0, publishTime: Math.floor(Date.now() / 1000), feedId: "configured:PWRC/USD", source: "configured" };
    }

    const feedId = await this.discoverFeed(base, quote);
    const url = new URL(`${this.endpoint}/v2/updates/price/latest`);
    url.searchParams.append("ids[]", feedId);
    url.searchParams.set("parsed", "true");
    const response = await this.fetchImpl(url, { headers: this.headers() });
    if (!response.ok) throw new Error(`Pyth price fetch failed (${response.status})`);
    const payload = (await response.json()) as HermesLatest;
    const entry = payload.parsed?.find((item) => normalizeFeedId(item.id) === feedId) ?? payload.parsed?.[0];
    if (!entry) throw new Error(`Pyth returned no price for ${base}/${quote}`);

    const publishTime = entry.price.publish_time;
    const age = Math.floor(Date.now() / 1000) - publishTime;
    if (age > this.maxAgeSeconds) throw new Error(`Stale ${base}/${quote} price (${age}s old)`);

    return {
      asset: base,
      quote,
      price: scale(entry.price.price, entry.price.expo),
      confidence: scale(entry.price.conf, entry.price.expo),
      publishTime,
      feedId,
      source: "pyth-hermes",
    };
  }

  async fetchPrices(assets: PriceAsset[] = ["EUR", "USD", "SOL", "USDC", "PWRC"]): Promise<Partial<Record<PriceAsset, PricePoint>>> {
    const entries = await Promise.all(assets.map(async (asset) => {
      try { return [asset, await this.fetchPair(asset, "USD")] as const; }
      catch (error) {
        if (asset === "PWRC" && this.pwrcUsdPrice === undefined) return [asset, undefined] as const;
        throw error;
      }
    }));
    return Object.fromEntries(entries.filter(([, value]) => value !== undefined));
  }
}

export function convertAmount(amount: number, fromUsd: number, toUsd: number): number {
  if (![amount, fromUsd, toUsd].every(Number.isFinite) || fromUsd <= 0 || toUsd <= 0) throw new RangeError("Invalid conversion inputs");
  return amount * fromUsd / toUsd;
}
