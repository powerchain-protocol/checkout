import { PublicKey } from "@solana/web3.js";
function optionalKey(value) {
    return value?.trim() ? new PublicKey(value) : undefined;
}
export function programIdsForCluster(cluster, env = {}) {
    const suffix = cluster === "mainnet-beta" ? "MAINNET" : cluster.toUpperCase();
    return {
        powerpay: optionalKey(env[`VITE_POWERPAY_PROGRAM_ID_${suffix}`] ??
            env.VITE_SOLANA_PROGRAM_ID),
        powerchain: optionalKey(env[`VITE_POWERCHAIN_PROGRAM_ID_${suffix}`] ??
            env.VITE_POWERCHAIN_PROGRAM_ID),
        pwrpMint: optionalKey(env[`VITE_PWRP_MINT_${suffix}`] ?? env.VITE_PWRP_MINT),
        usdcMint: optionalKey(env[`VITE_USDC_MINT_${suffix}`] ?? env.VITE_USDC_MINT),
    };
}
//# sourceMappingURL=programs.js.map