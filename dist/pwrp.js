import { PublicKey } from "@solana/web3.js";
import { TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
export const POWERPAY_TOKEN = {
    name: "PowerPay",
    symbol: "PWRP",
    decimals: 6,
    maximumSupply: 1000000000n,
    tokenProgram: TOKEN_2022_PROGRAM_ID,
};
/**
 * Resolves the deployed PWRP mint without depending on Vite-specific globals.
 *
 * Browser applications should pass `import.meta.env.VITE_POWERPAY_TOKEN_MINT`
 * as `mint`. Node applications may pass `process.env` as `env`.
 */
export function getPowerPayMint(options = {}) {
    const normalized = typeof options === "string" ? { mint: options } : options;
    const value = normalized.mint?.trim() ??
        normalized.env?.VITE_POWERPAY_TOKEN_MINT?.trim() ??
        normalized.env?.VITE_PWRP_MINT?.trim();
    if (!value) {
        throw new Error("PWRP mint is not configured. Pass getPowerPayMint({ mint }) or provide VITE_POWERPAY_TOKEN_MINT.");
    }
    return new PublicKey(value);
}
export function pwrpToAtomic(amount) {
    const raw = String(amount).trim();
    if (!/^\d+(\.\d+)?$/.test(raw))
        throw new Error("PWRP amount must be a positive decimal");
    const [whole, fraction = ""] = raw.split(".");
    if (fraction.length > POWERPAY_TOKEN.decimals)
        throw new Error("PWRP supports at most 6 decimals");
    return BigInt(whole) * 10n ** 6n + BigInt((fraction + "000000").slice(0, 6));
}
export function atomicToPwrp(amount) {
    const whole = amount / 1000000n;
    const fraction = (amount % 1000000n).toString().padStart(6, "0").replace(/0+$/, "");
    return fraction ? `${whole}.${fraction}` : whole.toString();
}
//# sourceMappingURL=pwrp.js.map