import {
  Connection,
  PublicKey,
  type Commitment,
  type ParsedAccountData,
} from "@solana/web3.js";
import { fetchWalletTransactions } from "../solana/history.js";

export interface WalletSnapshot {
  address: string;
  lamports: bigint;
  executable: boolean;
  owner: string;
  tokenAccounts: Array<{
    pubkey: string;
    mint?: string;
    amount?: string;
    decimals?: number;
  }>;
}

export async function fetchWalletSnapshot(
  connection: Connection,
  wallet: PublicKey,
  commitment: Commitment = "confirmed",
): Promise<WalletSnapshot> {
  const [account, tokenAccounts] = await Promise.all([
    connection.getAccountInfo(wallet, commitment),
    connection.getParsedTokenAccountsByOwner(
      wallet,
      { programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA") },
      commitment,
    ),
  ]);

  return {
    address: wallet.toBase58(),
    lamports: BigInt(account?.lamports ?? 0),
    executable: account?.executable ?? false,
    owner: account?.owner.toBase58() ?? "11111111111111111111111111111111",
    tokenAccounts: tokenAccounts.value.map(({ pubkey, account }) => {
      const parsed = account.data as ParsedAccountData;
      const info = parsed.parsed?.info;
      return {
        pubkey: pubkey.toBase58(),
        mint: info?.mint,
        amount: info?.tokenAmount?.amount,
        decimals: info?.tokenAmount?.decimals,
      };
    }),
  };
}

export function fetchRecentWalletActivity(
  connection: Connection,
  wallet: PublicKey,
  limit = 20,
) {
  return fetchWalletTransactions({ connection, wallet, limit });
}
