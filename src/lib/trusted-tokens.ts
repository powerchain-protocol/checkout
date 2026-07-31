import { PublicKey } from "@solana/web3.js";

export type TrustedTokenStatus =
  | "trusted"
  | "review"
  | "blocked";

export interface TrustedToken {
  symbol: string;
  name: string;
  mint: string;
  decimals: number;
  tokenProgram: "spl" | "token-2022";
  status: TrustedTokenStatus;
  networks: Array<"devnet" | "mainnet-beta">;
  issuer?: string;
  stable?: boolean;
}

const registry = new Map<string, TrustedToken>();

export function registerTrustedToken(token: TrustedToken): void {
  new PublicKey(token.mint);
  if (!Number.isInteger(token.decimals) || token.decimals < 0) {
    throw new Error("Trusted token decimals are invalid");
  }
  registry.set(token.mint, Object.freeze({ ...token }));
}

export function trustedToken(mint: string): TrustedToken | null {
  return registry.get(mint) ?? null;
}

export function requireTrustedToken(mint: string): TrustedToken {
  const token = trustedToken(mint);
  if (!token || token.status !== "trusted") {
    throw new Error("Token mint is not approved for PowerPay payments");
  }
  return token;
}

export function listTrustedTokens(): TrustedToken[] {
  return [...registry.values()];
}

export function clearTrustedTokensForTests(): void {
  registry.clear();
}
