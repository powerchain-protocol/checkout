import { PublicKey } from "@solana/web3.js";
export type TokenStandard = "spl" | "token-2022";
export interface TokenDefinition {
    symbol: "USDC" | "PWRC" | string;
    mint: PublicKey;
    decimals: number;
    standard: TokenStandard;
}
export declare const TOKEN_PROGRAM_ID: PublicKey;
export declare const TOKEN_2022_PROGRAM_ID: PublicKey;
export declare const ASSOCIATED_TOKEN_PROGRAM_ID: PublicKey;
export declare function tokenProgramFor(standard: TokenStandard): PublicKey;
export declare function associatedTokenAddress(owner: PublicKey, token: TokenDefinition): PublicKey;
export declare function tokenFromEnv(symbol: string, mintValue: string | undefined, decimals: number, standard: TokenStandard): TokenDefinition | undefined;
