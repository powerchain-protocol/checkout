import type { PriceAsset, PricePoint } from "./prices.js";
export interface FeeSchedule {
    platformBps: number;
    merchantBps?: number;
    fixedUsd?: number;
    networkUsd?: number;
    cctpUsd?: number;
    minimumUsd?: number;
    maximumUsd?: number;
}
export interface FeeBreakdown {
    subtotalUsd: number;
    platformFeeUsd: number;
    merchantFeeUsd: number;
    fixedFeeUsd: number;
    networkFeeUsd: number;
    bridgeFeeUsd: number;
    totalFeeUsd: number;
    totalUsd: number;
    effectiveRateBps: number;
}
export declare function calculateFees(amountUsd: number, schedule: FeeSchedule): FeeBreakdown;
export interface TokenQuote {
    asset: PriceAsset;
    tokenAmount: number;
    tokenAmountAtomic: bigint;
    decimals: number;
    priceUsd: number;
    fees: FeeBreakdown;
}
export declare function quoteTokenPayment(args: {
    amountUsd: number;
    asset: PriceAsset;
    price: PricePoint;
    decimals: number;
    feeSchedule: FeeSchedule;
}): TokenQuote;
export interface ExchangeRates {
    base: PriceAsset;
    rates: Partial<Record<PriceAsset, number>>;
    generatedAt: number;
}
export declare function calculateRates(prices: Partial<Record<PriceAsset, PricePoint>>, base?: PriceAsset): ExchangeRates;
