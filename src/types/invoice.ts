import type { CurrencyCode, PaymentStatus } from "./common.js";

export interface InvoiceLineItem {
  id: string;
  name: string;
  description?: string;
  quantity: number;
  unitAmount: string;
  taxRate?: number;
}

export interface InvoiceFee {
  code: string;
  label: string;
  amount: string;
}

export interface Invoice {
  id: string;
  number: string;
  merchantId: string;
  customerId?: string;
  currency: CurrencyCode;
  lineItems: InvoiceLineItem[];
  subtotal: string;
  tax: string;
  fees: InvoiceFee[];
  total: string;
  status: PaymentStatus;
  dueAt?: string;
  createdAt: string;
  notes?: string;
}
