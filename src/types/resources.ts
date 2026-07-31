import type {
  PowerPayClientIdentity,
  PowerPayMerchantIdentity,
  PowerPayMoney,
  PowerPayPaymentChannel,
  PowerPaySettlement,
} from "./sdk.js";

export type PaymentLifecycleStatus =
  | "draft"
  | "pending"
  | "requires_action"
  | "processing"
  | "confirmed"
  | "settled"
  | "failed"
  | "cancelled"
  | "expired";

export interface PaymentResource {
  id: string;
  status: PaymentLifecycleStatus;
  channel: PowerPayPaymentChannel;
  money: PowerPayMoney;
  settlement: PowerPaySettlement;
  client?: PowerPayClientIdentity;
  merchant?: PowerPayMerchantIdentity;
  reference?: string;
  memo?: string;
  checkoutUrl?: string;
  qrPayload?: string;
  transactionSignature?: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
  metadata?: Record<string, unknown>;
}

export interface CheckoutSessionResource {
  id: string;
  status: "open" | "completed" | "expired" | "cancelled";
  paymentId?: string;
  client?: PowerPayClientIdentity;
  merchant?: PowerPayMerchantIdentity;
  money: PowerPayMoney;
  settlement: PowerPaySettlement;
  returnUrl?: string;
  cancelUrl?: string;
  checkoutUrl: string;
  expiresAt: string;
  createdAt: string;
  metadata?: Record<string, unknown>;
}

export interface ClientResource extends PowerPayClientIdentity {
  createdAt: string;
  updatedAt: string;
  lifetimeValue?: PowerPayMoney;
  paymentCount?: number;
  status?: "active" | "inactive" | "vip" | "new";
}

export interface PosTerminalResource {
  id: string;
  name: string;
  merchantId: string;
  location?: string;
  status: "online" | "offline" | "maintenance";
  capabilities: Array<"qr" | "nfc" | "link" | "wallet">;
  createdAt: string;
  updatedAt: string;
}

export interface IntegrationResource {
  id: string;
  provider:
    | "helius"
    | "pyth"
    | "circle"
    | "cetus"
    | "supabase"
    | "neon"
    | "custom";
  status: "connected" | "degraded" | "disconnected";
  configured: boolean;
  capabilities: string[];
  lastCheckedAt?: string;
}
