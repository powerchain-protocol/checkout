import { PublicKey } from "@solana/web3.js";
import type { PowerPayCluster } from "./clusters.js";

export interface ClusterProgramIds {
  powerpay?: PublicKey;
  powerchain?: PublicKey;
  pwrpMint?: PublicKey;
  usdcMint?: PublicKey;
}

function optionalKey(value?: string): PublicKey | undefined {
  return value?.trim() ? new PublicKey(value) : undefined;
}

export function programIdsForCluster(
  cluster: PowerPayCluster,
  env: Record<string, string | undefined> = {},
): ClusterProgramIds {
  const suffix = cluster === "mainnet-beta" ? "MAINNET" : cluster.toUpperCase();
  return {
    powerpay: optionalKey(
      env[`VITE_POWERPAY_PROGRAM_ID_${suffix}`] ??
        env.VITE_SOLANA_PROGRAM_ID,
    ),
    powerchain: optionalKey(
      env[`VITE_POWERCHAIN_PROGRAM_ID_${suffix}`] ??
        env.VITE_POWERCHAIN_PROGRAM_ID,
    ),
    pwrpMint: optionalKey(
      env[`VITE_PWRP_MINT_${suffix}`] ?? env.VITE_PWRP_MINT,
    ),
    usdcMint: optionalKey(
      env[`VITE_USDC_MINT_${suffix}`] ?? env.VITE_USDC_MINT,
    ),
  };
}
