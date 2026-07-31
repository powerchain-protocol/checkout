import { createPaymentInstruction, createTokenPaymentInstruction, initializeMerchantInstruction, settlePaymentInstruction, settleTokenPaymentInstruction, } from "../solana/instructions.js";
import { merchantPda } from "../solana/pdas.js";
export class MerchantClient {
    profile;
    constructor(profile) {
        this.profile = profile;
    }
    initializeInstruction() {
        return initializeMerchantInstruction(this.profile.authority, this.profile.treasury, this.profile.feeTreasury, this.profile.feeBps);
    }
    createPaymentInstruction(intent, payer) {
        if (intent.mint && intent.tokenProgram) {
            throw new Error("Use createTokenPayment() and provide payer/escrow token accounts for token payments.");
        }
        return createPaymentInstruction({
            payer,
            merchant: intent.merchant,
            reference: intent.reference,
            amount: intent.amount,
            expiresAt: intent.expiresAt,
        });
    }
    createTokenPayment(args) {
        return createTokenPaymentInstruction({
            payer: args.payer,
            merchant: args.intent.merchant,
            reference: args.intent.reference,
            amount: args.intent.amount,
            expiresAt: args.intent.expiresAt,
            payerTokenAccount: args.payerTokenAccount,
            escrowTokenAccount: args.escrowTokenAccount,
            mint: args.mint,
            tokenProgram: args.tokenProgram,
            decimals: args.decimals,
        });
    }
    settleSol(args) {
        return settlePaymentInstruction({
            authority: this.profile.authority,
            merchant: merchantPda(this.profile.authority)[0],
            payment: args.payment,
            treasury: args.treasury ?? this.profile.treasury,
            feeTreasury: args.feeTreasury ?? this.profile.feeTreasury,
        });
    }
    settleToken(args) {
        return settleTokenPaymentInstruction({
            authority: this.profile.authority,
            merchant: args.merchantPda,
            payment: args.payment,
            escrowTokenAccount: args.escrowTokenAccount,
            treasuryTokenAccount: args.treasuryTokenAccount,
            feeTreasuryTokenAccount: args.feeTreasuryTokenAccount,
            mint: args.mint,
            tokenProgram: args.tokenProgram,
        });
    }
}
//# sourceMappingURL=client.js.map