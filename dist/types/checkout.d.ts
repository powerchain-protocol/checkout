import type { PublicKey, TransactionSignature } from "@solana/web3.js";
import type { PowerPayCluster } from "../constants/clusters.js";
export type CheckoutAsset = "SOL" | "USDC" | "PWRP" | string;
export type CheckoutStatus = "idle" | "connecting" | "ready" | "quoting" | "confirming" | "submitting" | "confirmed" | "failed" | "cancelled";
export interface CheckoutLineItem {
    id: string;
    name: string;
    description?: string;
    quantity: number;
    unitAmount: bigint;
    image?: string;
}
export interface CheckoutMerchant {
    id: string;
    name: string;
    authority: PublicKey;
    treasury: PublicKey;
    feeTreasury?: PublicKey;
    logoUrl?: string;
}
export interface CheckoutRequest {
    id: string;
    merchant: CheckoutMerchant;
    cluster: PowerPayCluster;
    amount: bigint;
    asset: CheckoutAsset;
    mint?: PublicKey;
    reference: PublicKey;
    memo?: string;
    expiresAt?: Date;
    lineItems?: CheckoutLineItem[];
    successUrl?: string;
    cancelUrl?: string;
    metadata?: Record<string, string>;
}
export interface CheckoutQuote {
    requestId: string;
    subtotal: bigint;
    platformFee: bigint;
    networkFee: bigint;
    total: bigint;
    asset: CheckoutAsset;
    rate?: number;
    rateTimestamp?: number;
    expiresAt: Date;
}
export interface CheckoutResult {
    requestId: string;
    status: Extract<CheckoutStatus, "confirmed" | "failed" | "cancelled">;
    signature?: TransactionSignature;
    payer?: PublicKey;
    error?: string;
    confirmedAt?: Date;
}
