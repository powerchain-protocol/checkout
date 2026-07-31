import { PublicKey } from "@solana/web3.js";
export type PowerPaySolanaCluster = "mainnet-beta" | "devnet" | "testnet" | "localnet";
export interface PowerPayRuntimeConfig {
    environment: "development" | "sandbox" | "production";
    apiUrl: string;
    publishableKey?: string;
    cluster: PowerPaySolanaCluster;
    rpcUrl: string;
    wsUrl?: string;
    programId?: PublicKey;
    powerchainProgramId?: PublicKey;
    usdcMint?: PublicKey;
    pwrpMint?: PublicKey;
    pyth: {
        hermesUrl: string;
        apiKey?: string;
        maxPriceAgeSeconds: number;
        feeds: {
            solUsd?: string;
            usdcUsd?: string;
            eurUsd?: string;
        };
    };
}
export declare function runtimeConfig(env?: Record<string, string | undefined>): PowerPayRuntimeConfig;
