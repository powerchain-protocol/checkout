import { z } from "zod";

const optionalUrl = z.string().url().optional().or(z.literal(""));

export const PowerPayEnvSchema = z.object({
  POWERPAY_CLUSTER: z
    .enum(["devnet", "testnet", "mainnet-beta", "localnet"])
    .default("devnet"),
  POWERPAY_RPC_URL: optionalUrl,
  POWERPAY_HELIUS_API_KEY: z.string().optional(),
  POWERPAY_HELIUS_RPC_URL: optionalUrl,
  POWERPAY_PYTH_HERMES_URL: z
    .string()
    .url()
    .default("https://hermes.pyth.network"),
  POWERPAY_PROGRAM_ID: z.string().optional(),
  POWERCHAIN_PROGRAM_ID: z.string().optional(),
  POWERPAY_USDC_MINT: z.string().optional(),
  POWERPAY_TOKEN_MINT: z.string().optional(),
  POWERPAY_MERCHANT_AUTHORITY: z.string().optional(),
  POWERPAY_MERCHANT_TREASURY: z.string().optional(),
  POWERPAY_MERCHANT_FEE_TREASURY: z.string().optional(),
  POWERPAY_API_BASE_URL: optionalUrl,
});

export type PowerPayEnv = z.infer<typeof PowerPayEnvSchema>;

export function readPowerPayEnv(
  source: Record<string, string | undefined>,
): PowerPayEnv {
  const normalized = {
    POWERPAY_CLUSTER:
      source.POWERPAY_CLUSTER ?? source.VITE_POWERPAY_CLUSTER,
    POWERPAY_RPC_URL:
      source.POWERPAY_RPC_URL ??
      source.VITE_SOLANA_RPC_URL,
    POWERPAY_HELIUS_API_KEY:
      source.POWERPAY_HELIUS_API_KEY ??
      source.VITE_HELIUS_API_KEY,
    POWERPAY_HELIUS_RPC_URL:
      source.POWERPAY_HELIUS_RPC_URL ??
      source.VITE_HELIUS_RPC_URL,
    POWERPAY_PYTH_HERMES_URL:
      source.POWERPAY_PYTH_HERMES_URL ??
      source.VITE_PYTH_HERMES_URL,
    POWERPAY_PROGRAM_ID:
      source.POWERPAY_PROGRAM_ID ??
      source.VITE_SOLANA_PROGRAM_ID,
    POWERCHAIN_PROGRAM_ID:
      source.POWERCHAIN_PROGRAM_ID ??
      source.VITE_POWERCHAIN_PROGRAM_ID,
    POWERPAY_USDC_MINT:
      source.POWERPAY_USDC_MINT ??
      source.VITE_USDC_MINT,
    POWERPAY_TOKEN_MINT:
      source.POWERPAY_TOKEN_MINT ??
      source.VITE_POWERPAY_TOKEN_MINT,
    POWERPAY_MERCHANT_AUTHORITY:
      source.POWERPAY_MERCHANT_AUTHORITY ??
      source.VITE_MERCHANT_AUTHORITY,
    POWERPAY_MERCHANT_TREASURY:
      source.POWERPAY_MERCHANT_TREASURY ??
      source.VITE_MERCHANT_TREASURY,
    POWERPAY_MERCHANT_FEE_TREASURY:
      source.POWERPAY_MERCHANT_FEE_TREASURY ??
      source.VITE_MERCHANT_FEE_TREASURY,
    POWERPAY_API_BASE_URL:
      source.POWERPAY_API_BASE_URL ??
      source.VITE_POWERPAY_API_BASE_URL,
  };

  return PowerPayEnvSchema.parse(normalized);
}
