import { SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { merchantPda, paymentPda, powerchainProgramId, powerpayProgramId } from "./pdas.js";
const u64 = (v) => { if (v < 0n || v > 0xffffffffffffffffn)
    throw new RangeError("u64 out of range"); const b = Buffer.alloc(8); b.writeBigUInt64LE(v); return b; };
const i64 = (v) => { if (v < -0x8000000000000000n || v > 0x7fffffffffffffffn)
    throw new RangeError("i64 out of range"); const b = Buffer.alloc(8); b.writeBigInt64LE(v); return b; };
export function initializeMerchantInstruction(authority, treasury, feeTreasury, feeBps) { const [merchant] = merchantPda(authority); if (!Number.isInteger(feeBps) || feeBps < 0 || feeBps > 10000)
    throw new RangeError("feeBps must be 0..10000"); const data = Buffer.alloc(3); data[0] = 0; data.writeUInt16LE(feeBps, 1); return new TransactionInstruction({ programId: powerpayProgramId, keys: [{ pubkey: authority, isSigner: true, isWritable: true }, { pubkey: treasury, isSigner: false, isWritable: false }, { pubkey: feeTreasury, isSigner: false, isWritable: false }, { pubkey: merchant, isSigner: false, isWritable: true }, { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }], data }); }
export function updateMerchantInstruction(authority, feeBps, paused) { const [merchant] = merchantPda(authority); const data = Buffer.alloc(4); data[0] = 1; data.writeUInt16LE(feeBps, 1); data[3] = paused ? 1 : 0; return new TransactionInstruction({ programId: powerpayProgramId, keys: [{ pubkey: authority, isSigner: true, isWritable: false }, { pubkey: merchant, isSigner: false, isWritable: true }], data }); }
export function createPaymentInstruction(args) { if (args.reference.length !== 32)
    throw new Error("reference must be 32 bytes"); const [payment] = paymentPda(args.merchant, args.reference); return new TransactionInstruction({ programId: powerpayProgramId, keys: [{ pubkey: args.payer, isSigner: true, isWritable: true }, { pubkey: args.merchant, isSigner: false, isWritable: false }, { pubkey: payment, isSigner: false, isWritable: true }, { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }], data: Buffer.concat([Buffer.from([2]), Buffer.from(args.reference), u64(args.amount), i64(args.expiresAt)]) }); }
export function settlePaymentInstruction(args) { return new TransactionInstruction({ programId: powerpayProgramId, keys: [{ pubkey: args.authority, isSigner: true, isWritable: false }, { pubkey: args.merchant, isSigner: false, isWritable: false }, { pubkey: args.payment, isSigner: false, isWritable: true }, { pubkey: args.treasury, isSigner: false, isWritable: true }, { pubkey: args.feeTreasury, isSigner: false, isWritable: true }], data: Buffer.from([3]) }); }
export function refundPaymentInstruction(caller, payment, payer) { return new TransactionInstruction({ programId: powerpayProgramId, keys: [{ pubkey: caller, isSigner: true, isWritable: false }, { pubkey: payment, isSigner: false, isWritable: true }, { pubkey: payer, isSigner: false, isWritable: true }], data: Buffer.from([4]) }); }
export function recordSettlementInstruction(network, authority, payment, amount) { return new TransactionInstruction({ programId: powerchainProgramId, keys: [{ pubkey: network, isSigner: false, isWritable: true }, { pubkey: authority, isSigner: true, isWritable: false }, { pubkey: payment, isSigner: false, isWritable: false }], data: Buffer.concat([Buffer.from([2]), u64(amount)]) }); }
export function createTokenPaymentInstruction(args) {
    if (args.reference.length !== 32)
        throw new Error("reference must be 32 bytes");
    if (!Number.isInteger(args.decimals) || args.decimals < 0 || args.decimals > 255)
        throw new RangeError("decimals must be 0..255");
    const [payment] = paymentPda(args.merchant, args.reference);
    const data = Buffer.concat([
        Buffer.from([5]),
        Buffer.from(args.reference),
        u64(args.amount),
        i64(args.expiresAt),
        Buffer.from([args.decimals]),
    ]);
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: args.payer, isSigner: true, isWritable: true },
            { pubkey: args.merchant, isSigner: false, isWritable: false },
            { pubkey: payment, isSigner: false, isWritable: true },
            { pubkey: args.payerTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.escrowTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.mint, isSigner: false, isWritable: false },
            { pubkey: args.tokenProgram, isSigner: false, isWritable: false },
            { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        data,
    });
}
export function settleTokenPaymentInstruction(args) {
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: args.authority, isSigner: true, isWritable: false },
            { pubkey: args.merchant, isSigner: false, isWritable: false },
            { pubkey: args.payment, isSigner: false, isWritable: true },
            { pubkey: args.escrowTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.treasuryTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.feeTreasuryTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.mint, isSigner: false, isWritable: false },
            { pubkey: args.tokenProgram, isSigner: false, isWritable: false },
        ],
        data: Buffer.from([6]),
    });
}
export function refundTokenPaymentInstruction(args) {
    return new TransactionInstruction({
        programId: powerpayProgramId,
        keys: [
            { pubkey: args.caller, isSigner: true, isWritable: false },
            { pubkey: args.payment, isSigner: false, isWritable: true },
            { pubkey: args.payer, isSigner: false, isWritable: false },
            { pubkey: args.escrowTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.payerTokenAccount, isSigner: false, isWritable: true },
            { pubkey: args.mint, isSigner: false, isWritable: false },
            { pubkey: args.tokenProgram, isSigner: false, isWritable: false },
        ],
        data: Buffer.from([7]),
    });
}
