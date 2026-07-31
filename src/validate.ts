import { PublicKey } from "@solana/web3.js";
import type { CheckoutRequest } from "./types/checkout.js";

export interface ValidationIssue {
  field: string;
  message: string;
}

export class CheckoutValidationError extends Error {
  readonly issues: ValidationIssue[];
  constructor(issues: ValidationIssue[]) {
    super(issues.map((issue) => `${issue.field}: ${issue.message}`).join("; "));
    this.name = "CheckoutValidationError";
    this.issues = issues;
  }
}

export function validatePublicKey(
  value: string | PublicKey,
  field = "publicKey",
): PublicKey {
  try {
    return value instanceof PublicKey ? value : new PublicKey(value);
  } catch {
    throw new CheckoutValidationError([
      { field, message: "must be a valid Solana public key" },
    ]);
  }
}

export function validateCheckoutRequest(
  request: CheckoutRequest,
): CheckoutRequest {
  const issues: ValidationIssue[] = [];

  if (!request.id.trim()) issues.push({ field: "id", message: "is required" });
  if (request.amount <= 0n)
    issues.push({ field: "amount", message: "must be greater than zero" });
  if (!request.asset.trim())
    issues.push({ field: "asset", message: "is required" });
  if (!request.merchant.id.trim())
    issues.push({ field: "merchant.id", message: "is required" });
  if (!request.merchant.name.trim())
    issues.push({ field: "merchant.name", message: "is required" });
  if (request.expiresAt && request.expiresAt.getTime() <= Date.now())
    issues.push({ field: "expiresAt", message: "must be in the future" });
  if (request.lineItems) {
    request.lineItems.forEach((item, index) => {
      if (!item.name.trim())
        issues.push({
          field: `lineItems.${index}.name`,
          message: "is required",
        });
      if (!Number.isInteger(item.quantity) || item.quantity <= 0)
        issues.push({
          field: `lineItems.${index}.quantity`,
          message: "must be a positive integer",
        });
      if (item.unitAmount < 0n)
        issues.push({
          field: `lineItems.${index}.unitAmount`,
          message: "cannot be negative",
        });
    });
  }

  if (issues.length) throw new CheckoutValidationError(issues);
  return request;
}

export function shortenAddress(address: string | PublicKey, size = 4): string {
  const value = address.toString();
  return `${value.slice(0, size)}…${value.slice(-size)}`;
}
