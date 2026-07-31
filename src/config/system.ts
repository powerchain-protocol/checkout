export const SYSTEM_CONFIG = {
  name: "PowerPay",
  version: "1.0.0-beta.1",
  releaseChannel: "beta",
  defaultCluster: "devnet",
  defaultCommitment: "confirmed",
  paymentTimeoutMs: 120_000,
  requestTimeoutMs: 15_000,
  cacheTtlMs: 30_000,
  maxCartItems: 100,
  maxInvoiceItems: 100,
  feeReserveLamports: 10_000n,
} as const;
