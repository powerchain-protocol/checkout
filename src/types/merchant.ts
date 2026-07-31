import type { CurrencyCode, PaymentStatus } from "./common.js";

export interface MerchantConfig {
  authority: string;
  treasury: string;
  feeTreasury?: string;
  name?: string;
}

export interface MerchantPayment {
  id: string;
  orderId: string;
  amount: string;
  currency: CurrencyCode;
  mint?: string;
  payer?: string;
  merchant: string;
  reference: string;
  signature?: string;
  status: PaymentStatus;
  createdAt: string;
  confirmedAt?: string;
}
