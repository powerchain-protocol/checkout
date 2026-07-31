const round = (value, digits = 6) => Number(value.toFixed(digits));
const bpsFee = (amount, bps = 0) => amount * bps / 10_000;
export function calculateFees(amountUsd, schedule) {
    if (!Number.isFinite(amountUsd) || amountUsd < 0)
        throw new RangeError("amountUsd must be non-negative");
    for (const bps of [schedule.platformBps, schedule.merchantBps ?? 0]) {
        if (!Number.isFinite(bps) || bps < 0 || bps > 10_000)
            throw new RangeError("fee bps must be 0..10000");
    }
    const platformFeeUsd = bpsFee(amountUsd, schedule.platformBps);
    const merchantFeeUsd = bpsFee(amountUsd, schedule.merchantBps);
    const fixedFeeUsd = schedule.fixedUsd ?? 0;
    const networkFeeUsd = schedule.networkUsd ?? 0;
    const bridgeFeeUsd = schedule.cctpUsd ?? 0;
    let totalFeeUsd = platformFeeUsd + merchantFeeUsd + fixedFeeUsd + networkFeeUsd + bridgeFeeUsd;
    if (schedule.minimumUsd !== undefined)
        totalFeeUsd = Math.max(totalFeeUsd, schedule.minimumUsd);
    if (schedule.maximumUsd !== undefined)
        totalFeeUsd = Math.min(totalFeeUsd, schedule.maximumUsd);
    return {
        subtotalUsd: round(amountUsd),
        platformFeeUsd: round(platformFeeUsd),
        merchantFeeUsd: round(merchantFeeUsd),
        fixedFeeUsd: round(fixedFeeUsd),
        networkFeeUsd: round(networkFeeUsd),
        bridgeFeeUsd: round(bridgeFeeUsd),
        totalFeeUsd: round(totalFeeUsd),
        totalUsd: round(amountUsd + totalFeeUsd),
        effectiveRateBps: amountUsd === 0 ? 0 : round(totalFeeUsd / amountUsd * 10_000, 2),
    };
}
export function quoteTokenPayment(args) {
    if (args.price.quote !== "USD" || args.price.price <= 0)
        throw new Error("A positive USD price is required");
    if (!Number.isInteger(args.decimals) || args.decimals < 0 || args.decimals > 18)
        throw new RangeError("Invalid token decimals");
    const fees = calculateFees(args.amountUsd, args.feeSchedule);
    const tokenAmount = fees.totalUsd / args.price.price;
    const factor = 10 ** args.decimals;
    const atomic = BigInt(Math.ceil(tokenAmount * factor));
    return { asset: args.asset, tokenAmount, tokenAmountAtomic: atomic, decimals: args.decimals, priceUsd: args.price.price, fees };
}
export function calculateRates(prices, base = "USD") {
    const baseUsd = base === "USD" ? 1 : prices[base]?.price;
    if (!baseUsd || baseUsd <= 0)
        throw new Error(`Missing positive USD price for base asset ${base}`);
    const rates = { [base]: 1 };
    for (const asset of ["EUR", "USD", "SOL", "USDC", "PWRC"]) {
        const assetUsd = asset === "USD" ? 1 : prices[asset]?.price;
        if (assetUsd && assetUsd > 0)
            rates[asset] = baseUsd / assetUsd;
    }
    return { base, rates, generatedAt: Math.floor(Date.now() / 1000) };
}
