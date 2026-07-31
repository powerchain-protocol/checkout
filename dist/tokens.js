import { PublicKey } from "@solana/web3.js";
export const TOKEN_PROGRAM_ID = new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA");
export const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
export function tokenProgramFor(standard) {
    return standard === "token-2022" ? TOKEN_2022_PROGRAM_ID : TOKEN_PROGRAM_ID;
}
export function associatedTokenAddress(owner, token) {
    return PublicKey.findProgramAddressSync([owner.toBuffer(), tokenProgramFor(token.standard).toBuffer(), token.mint.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID)[0];
}
export function tokenFromEnv(symbol, mintValue, decimals, standard) {
    if (!mintValue)
        return undefined;
    return { symbol, mint: new PublicKey(mintValue), decimals, standard };
}
