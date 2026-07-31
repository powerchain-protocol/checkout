import { PublicKey } from "@solana/web3.js";

export type TokenStandard = "spl" | "token-2022";
export interface TokenDefinition {
  symbol: "USDC" | "PWRC" | string;
  mint: PublicKey;
  decimals: number;
  standard: TokenStandard;
}

export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");

export function tokenProgramFor(standard: TokenStandard): PublicKey {
  return standard === "token-2022" ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
}

export function associatedTokenAddress(owner: PublicKey, token: TokenDefinition): PublicKey {
  return PublicKey.findProgramAddressSync(
    [owner.toBytes(), tokenProgramFor(token.standard).toBytes(), token.mint.toBytes()],
    ASSOCIATED_TOKEN_PROGRAM_ID,
  )[0];
}

export function tokenFromEnv(symbol: string, mintValue: string | undefined, decimals: number, standard: TokenStandard): TokenDefinition | undefined {
  if (!mintValue) return undefined;
  return { symbol, mint: new PublicKey(mintValue), decimals, standard };
}
