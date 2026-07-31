export type PowerPayEnvironment = "development" | "staging" | "production";
export type PowerPayApiVersion = "v1";
export type PowerPayChain = "powerchain" | "solana" | "sui";
export type PowerPayPaymentChannel =
  | "checkout"
  | "payment-link"
  | "qr"
  | "pos"
  | "invoice"
  | "subscription";

export interface PowerPayClientIdentity {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  walletAddress?: string;
  metadata?: Record<string, unknown>;
}

export interface PowerPayMerchantIdentity {
  id: string;
  name: string;
  verified?: boolean;
  walletAddress?: string;
  supportEmail?: string;
  metadata?: Record<string, unknown>;
}

export interface PowerPayMoney {
  amount: string;
  currency: string;
}

export interface PowerPaySettlement {
  chain: PowerPayChain;
  asset: string;
  amount?: string;
  walletAddress?: string;
}

export interface PowerPayPagination {
  cursor?: string;
  limit?: number;
}

export interface PowerPayPage<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
}

export interface PowerPayRequestContext {
  requestId?: string;
  idempotencyKey?: string;
  merchantId?: string;
  organizationId?: string;
  signal?: AbortSignal;
}

export interface PowerPaySdkConfig {
  baseUrl: string;
  apiKey?: string;
  apiVersion?: PowerPayApiVersion;
  environment?: PowerPayEnvironment;
  merchantId?: string;
  organizationId?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
}
