export function calculateFees(amountAtomic, policy) {
    if (amountAtomic <= 0n) {
        throw new RangeError("Payment amount must be greater than zero");
    }
    if (!Number.isInteger(policy.platformBps) || policy.platformBps < 0) {
        throw new RangeError("platformBps must be a non-negative integer");
    }
    const percentage = (amountAtomic * BigInt(policy.platformBps)) / 10000n;
    const fixed = policy.fixedFeeAtomic ?? 0n;
    let total = percentage + fixed;
    if (policy.minimumFeeAtomic !== undefined) {
        total = total < policy.minimumFeeAtomic ? policy.minimumFeeAtomic : total;
    }
    if (policy.maximumFeeAtomic !== undefined) {
        total = total > policy.maximumFeeAtomic ? policy.maximumFeeAtomic : total;
    }
    if (total >= amountAtomic) {
        throw new RangeError("Total fees must be lower than the payment amount");
    }
    return {
        amountAtomic,
        percentageFeeAtomic: percentage,
        fixedFeeAtomic: fixed,
        totalFeeAtomic: total,
        merchantReceivesAtomic: amountAtomic - total,
    };
}
//# sourceMappingURL=fees.js.map