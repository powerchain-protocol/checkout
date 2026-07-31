import type { FeePolicy } from "./config/payments.js";
export interface FeeCalculation {
    amountAtomic: bigint;
    percentageFeeAtomic: bigint;
    fixedFeeAtomic: bigint;
    totalFeeAtomic: bigint;
    merchantReceivesAtomic: bigint;
}
export declare function calculateFees(amountAtomic: bigint, policy: FeePolicy): FeeCalculation;
//# sourceMappingURL=fees.d.ts.map