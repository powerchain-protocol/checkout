import { PublicKey } from "@solana/web3.js";
export declare const POWERPAY_TOKEN: {
    readonly name: "PowerPay";
    readonly symbol: "PWRP";
    readonly decimals: 6;
    readonly maximumSupply: 1000000000n;
    readonly tokenProgram: PublicKey;
};
export interface PowerPayMintOptions {
    /** Explicit mint address. Preferred for reusable SDK code. */
    mint?: string;
    /** Environment map supplied by the host application or server. */
    env?: Record<string, string | undefined>;
}
/**
 * Resolves the deployed PWRP mint without depending on Vite-specific globals.
 *
 * Browser applications should pass `import.meta.env.VITE_POWERPAY_TOKEN_MINT`
 * as `mint`. Node applications may pass `process.env` as `env`.
 */
export declare function getPowerPayMint(options?: PowerPayMintOptions | string): PublicKey;
export declare function pwrpToAtomic(amount: string | number): bigint;
export declare function atomicToPwrp(amount: bigint): string;
//# sourceMappingURL=pwrp.d.ts.map