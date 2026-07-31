import type {
  Invoice,
  InvoiceFee,
  InvoiceLineItem,
} from "../types/invoice.js";

function decimalToMinor(value: string): bigint {
  if (!/^\d+(?:\.\d{1,2})?$/.test(value)) {
    throw new Error("Invoice amounts must use at most two decimal places");
  }
  const [whole, fraction = ""] = value.split(".");
  return BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
}

function minorToDecimal(value: bigint): string {
  const whole = value / 100n;
  const fraction = (value % 100n).toString().padStart(2, "0");
  return `${whole}.${fraction}`;
}

export function calculateInvoiceTotals(params: {
  lineItems: InvoiceLineItem[];
  fees?: InvoiceFee[];
}): Pick<Invoice, "subtotal" | "tax" | "fees" | "total"> {
  if (!params.lineItems.length) {
    throw new Error("Invoice requires at least one line item");
  }

  let subtotal = 0n;
  let tax = 0n;

  for (const item of params.lineItems) {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`Invalid quantity for ${item.name}`);
    }
    const line = decimalToMinor(item.unitAmount) * BigInt(item.quantity);
    subtotal += line;

    if (item.taxRate) {
      tax += BigInt(Math.round(Number(line) * item.taxRate / 100));
    }
  }

  const fees = params.fees ?? [];
  const feeTotal = fees.reduce(
    (sum, fee) => sum + decimalToMinor(fee.amount),
    0n,
  );

  return {
    subtotal: minorToDecimal(subtotal),
    tax: minorToDecimal(tax),
    fees,
    total: minorToDecimal(subtotal + tax + feeTotal),
  };
}

export function createInvoice(params: {
  id: string;
  number: string;
  merchantId: string;
  customerId?: string;
  currency: string;
  lineItems: InvoiceLineItem[];
  fees?: InvoiceFee[];
  dueAt?: string;
  notes?: string;
}): Invoice {
  const totals = calculateInvoiceTotals({
    lineItems: params.lineItems,
    fees: params.fees,
  });

  return {
    ...params,
    currency: params.currency,
    ...totals,
    status: "draft",
    createdAt: new Date().toISOString(),
  };
}
