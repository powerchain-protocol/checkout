export interface FeePolicy {
  platformBps: number;
  fixedFeeAtomic?: bigint;
  minimumFeeAtomic?: bigint;
  maximumFeeAtomic?: bigint;
}

export const DEFAULT_FEE_POLICY: FeePolicy = {
  platformBps: 50,
  fixedFeeAtomic: 0n,
  minimumFeeAtomic: 0n,
};

export const PAYMENT_CONFIG = {
  defaultExpirySeconds: 900,
  minimumExpirySeconds: 60,
  maximumExpirySeconds: 86_400,
  requireSimulation: true,
  requireReference: true,
  confirmationCommitment: "confirmed",
  supportedCurrencies: ["SOL", "USDC", "PWRP"],
} as const;
