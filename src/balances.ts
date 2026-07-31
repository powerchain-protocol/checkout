import {
  Connection,
  PublicKey,
  type Commitment,
} from "@solana/web3.js";
import {
  TOKEN_2022_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import type { BalanceSnapshot, WalletBalance } from "./types/balance.js";
import { formatAtomicAmount } from "./solana/amounts.js";

export async function fetchBalances(params: {
  connection: Connection;
  wallet: PublicKey;
  commitment?: Commitment;
}): Promise<BalanceSnapshot> {
  const commitment = params.commitment ?? "confirmed";
  const [slot, lamports, spl, token2022] = await Promise.all([
    params.connection.getSlot(commitment),
    params.connection.getBalance(params.wallet, commitment),
    params.connection.getParsedTokenAccountsByOwner(
      params.wallet,
      { programId: TOKEN_PROGRAM_ID },
      commitment,
    ),
    params.connection.getParsedTokenAccountsByOwner(
      params.wallet,
      { programId: TOKEN_2022_PROGRAM_ID },
      commitment,
    ),
  ]);

  const balances: WalletBalance[] = [{
    symbol: "SOL",
    decimals: 9,
    atomicAmount: String(lamports),
    uiAmount: formatAtomicAmount(BigInt(lamports), 9),
  }];

  for (const tokenAccount of [...spl.value, ...token2022.value]) {
    const info = (tokenAccount.account.data as any).parsed?.info;
    const tokenAmount = info?.tokenAmount;
    if (!info?.mint || !tokenAmount) continue;

    balances.push({
      symbol: String(info.mint).slice(0, 4),
      mint: info.mint,
      decimals: tokenAmount.decimals,
      atomicAmount: tokenAmount.amount,
      uiAmount:
        tokenAmount.uiAmountString ??
        formatAtomicAmount(BigInt(tokenAmount.amount), tokenAmount.decimals),
    });
  }

  return {
    wallet: params.wallet.toBase58(),
    slot,
    balances,
    fetchedAt: new Date().toISOString(),
  };
}
