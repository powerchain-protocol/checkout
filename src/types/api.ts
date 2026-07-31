import type { CurrencyCode, PaymentStatus } from "./common.js";

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId?: string;
  };
}

export interface HealthResponse {
  status: "ok" | "degraded";
  version: string;
  timestamp: string;
  cluster: string;
}

export interface CreatePaymentRequest {
  merchant: string;
  amount: string;
  currency: CurrencyCode;
  mint?: string;
  orderId: string;
  label?: string;
  message?: string;
  memo?: string;
  expiresInSeconds?: number;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  merchant: string;
  amount: string;
  currency: CurrencyCode;
  mint?: string;
  status: PaymentStatus;
  reference: string;
  paymentUrl: string;
  qrDataUrl?: string;
  signature?: string;
  createdAt: string;
  expiresAt: string;
}


export type SessionStatus = "active" | "completed" | "expired" | "cancelled";

export interface CreateSessionRequest {
  merchant: string;
  orderId: string;
  amount: string;
  currency: CurrencyCode;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
  expiresInSeconds?: number;
}

export interface SessionResponse {
  id: string;
  status: SessionStatus;
  merchant: string;
  orderId: string;
  amount: string;
  currency: CurrencyCode;
  checkoutUrl: string;
  returnUrl?: string;
  cancelUrl?: string;
  metadata?: Record<string, string>;
  createdAt: string;
  expiresAt: string;
}

export interface CorsResponse {
  allowedOrigins: string[];
  allowedMethods: string[];
  allowedHeaders: string[];
  credentials: boolean;
  maxAgeSeconds: number;
}


export interface ApiMeta {
  requestId: string;
  version: string;
  timestamp: string;
}

export interface ApiSuccessBody<T> {
  data: T;
  meta: ApiMeta;
}

export interface ApiFallbackBody {
  error: {
    code: string;
    message: string;
    details?: unknown;
    requestId: string;
    retryable?: boolean;
  };
  meta?: ApiMeta;
}

export type PowerPayEventType =
  | "system.ready"
  | "system.heartbeat"
  | "payment.created"
  | "payment.updated"
  | "payment.confirmed"
  | "payment.failed"
  | "session.created"
  | "session.updated"
  | "session.completed"
  | "integration.updated";

export interface PowerPayEvent<T = unknown> {
  id: string;
  type: PowerPayEventType;
  createdAt: string;
  resourceId?: string;
  merchantId?: string;
  data: T;
}

export interface WebSocketInfoResponse {
  endpoint: string;
  protocol: "powerpay.v1";
  heartbeatSeconds: number;
  reconnect: {
    initialDelayMs: number;
    maximumDelayMs: number;
    multiplier: number;
  };
  events: PowerPayEventType[];
}
