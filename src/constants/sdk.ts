export const POWERPAY_SDK_NAME =
  "@powerchain-protocol/powerpay-checkout-sdk" as const;
export const POWERPAY_DEFAULT_TIMEOUT_MS = 15_000;
export const POWERPAY_DEFAULT_PAGE_LIMIT = 25;
export const POWERPAY_MAX_PAGE_LIMIT = 100;
export const POWERPAY_IDEMPOTENCY_HEADER = "Idempotency-Key";
export const POWERPAY_VERSION_HEADER = "X-PowerPay-Version";
export const POWERPAY_REQUEST_ID_HEADER = "X-Request-Id";

export const POWERPAY_SUPPORTED_CHANNELS = [
  "checkout",
  "payment-link",
  "qr",
  "pos",
  "invoice",
  "subscription",
] as const;

export const POWERPAY_SUPPORTED_CHAINS = [
  "powerchain",
  "solana",
  "sui",
] as const;
