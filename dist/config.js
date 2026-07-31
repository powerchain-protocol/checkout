import { PublicKey } from "@solana/web3.js";
function optionalPublicKey(value) {
    if (!value?.trim())
        return undefined;
    return new PublicKey(value);
}
export function runtimeConfig(env = {}) {
    const cluster = (env.VITE_SOLANA_CLUSTER ?? "devnet");
    return {
        environment: (env.VITE_POWERPAY_ENV ?? "sandbox"),
        apiUrl: env.VITE_POWERPAY_API_URL ?? "/api",
        publishableKey: env.VITE_POWERPAY_PUBLISHABLE_KEY,
        cluster,
        rpcUrl: env.VITE_HELIUS_RPC_URL ??
            env.VITE_SOLANA_RPC_URL ??
            (cluster === "mainnet-beta"
                ? "https://api.mainnet-beta.solana.com"
                : "https://api.devnet.solana.com"),
        wsUrl: env.VITE_SOLANA_WS_URL,
        programId: optionalPublicKey(env.VITE_SOLANA_PROGRAM_ID),
        powerchainProgramId: optionalPublicKey(env.VITE_POWERCHAIN_PROGRAM_ID),
        usdcMint: optionalPublicKey(env.VITE_USDC_MINT),
        pwrpMint: optionalPublicKey(env.VITE_PWRP_MINT),
        pyth: {
            hermesUrl: env.VITE_PYTH_HERMES_URL ?? "https://pyth.dourolabs.app/hermes",
            apiKey: env.PYTH_API_KEY,
            maxPriceAgeSeconds: Number(env.PYTH_MAX_PRICE_AGE_SECONDS ?? 30),
            feeds: {
                solUsd: env.VITE_PYTH_SOL_USD_FEED_ID,
                usdcUsd: env.VITE_PYTH_USDC_USD_FEED_ID,
                eurUsd: env.VITE_PYTH_EUR_USD_FEED_ID,
            },
        },
    };
}
//# sourceMappingURL=config.js.map