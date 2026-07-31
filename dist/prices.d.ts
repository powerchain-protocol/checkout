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
export declare class PythPriceClient {
    private readonly endpoint;
    private readonly apiKey?;
    private readonly maxAgeSeconds;
    private readonly feedIds;
    private readonly pwrcUsdPrice?;
    private readonly fetchImpl;
    private readonly discovered;
    constructor(options?: PriceClientOptions);
    private headers;
    discoverFeed(base: PriceAsset, quote: QuoteCurrency): Promise<string>;
    fetchPair(base: PriceAsset, quote?: QuoteCurrency): Promise<PricePoint>;
    fetchPrices(assets?: PriceAsset[]): Promise<Partial<Record<PriceAsset, PricePoint>>>;
}
export declare function convertAmount(amount: number, fromUsd: number, toUsd: number): number;
