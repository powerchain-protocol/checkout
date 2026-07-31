import { PublicKey } from "@solana/web3.js";
export declare const powerpayProgramId: PublicKey;
export declare const powerchainProgramId: PublicKey;
export declare function merchantPda(authority: PublicKey): [PublicKey, number];
export declare function paymentPda(merchant: PublicKey, reference: Uint8Array): [PublicKey, number];
export declare function networkPda(authority: PublicKey): [PublicKey, number];
