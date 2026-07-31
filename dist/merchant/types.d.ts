import { PublicKey } from "@solana/web3.js";
export interface MerchantProfile {
    id: string;
    displayName: string;
    authority: PublicKey;
    treasury: PublicKey;
    feeTreasury: PublicKey;
    feeBps: number;
    acceptedMints: PublicKey[];
    metadataUri?: string;
    active: boolean;
}
export interface MerchantPaymentIntent {
    id: string;
    merchant: PublicKey;
    payer?: PublicKey;
    reference: Uint8Array;
    amount: bigint;
    currency: "SOL" | "USDC" | "PWRP" | string;
    mint?: PublicKey;
    tokenProgram?: PublicKey;
    expiresAt: bigint;
    metadata?: Record<string, string>;
}
