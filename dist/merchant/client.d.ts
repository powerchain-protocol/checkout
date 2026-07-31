import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import { MerchantPaymentIntent, MerchantProfile } from "./types.js";
export declare class MerchantClient {
    readonly profile: MerchantProfile;
    constructor(profile: MerchantProfile);
    initializeInstruction(): TransactionInstruction;
    createPaymentInstruction(intent: MerchantPaymentIntent, payer: PublicKey): TransactionInstruction;
    createTokenPayment(args: {
        intent: MerchantPaymentIntent;
        payer: PublicKey;
        payerTokenAccount: PublicKey;
        escrowTokenAccount: PublicKey;
        mint: PublicKey;
        tokenProgram: PublicKey;
        decimals: number;
    }): TransactionInstruction;
    settleSol(args: {
        payment: PublicKey;
        treasury?: PublicKey;
        feeTreasury?: PublicKey;
    }): TransactionInstruction;
    settleToken(args: {
        merchantPda: PublicKey;
        payment: PublicKey;
        escrowTokenAccount: PublicKey;
        treasuryTokenAccount: PublicKey;
        feeTreasuryTokenAccount: PublicKey;
        mint: PublicKey;
        tokenProgram: PublicKey;
    }): TransactionInstruction;
}
