import { PublicKey } from "@solana/web3.js";
import type { CheckoutRequest } from "./types/checkout.js";
export interface ValidationIssue {
    field: string;
    message: string;
}
export declare class CheckoutValidationError extends Error {
    readonly issues: ValidationIssue[];
    constructor(issues: ValidationIssue[]);
}
export declare function validatePublicKey(value: string | PublicKey, field?: string): PublicKey;
export declare function validateCheckoutRequest(request: CheckoutRequest): CheckoutRequest;
export declare function shortenAddress(address: string | PublicKey, size?: number): string;
