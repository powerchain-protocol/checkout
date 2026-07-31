import type { Connection, PublicKey } from "@solana/web3.js";
import type { AccountPortfolio } from "../types/accounts.js";
import { fetchBalances } from "../balances.js";
import { fetchSuiPortfolio } from "../lib/sui.js";
import type { SuiNetwork } from "../clusters/types.js";

export class AccountService {
  async solana(params: {
    connection: Connection;
    wallet: PublicKey;
    network: string;
  }): Promise<AccountPortfolio> {
    const snapshot = await fetchBalances({
      connection: params.connection,
      wallet: params.wallet,
    });
    return {
      account: {
        chain: "solana",
        address: snapshot.wallet,
        network: params.network,
        connected: true,
      },
      balances: snapshot.balances.map((balance) => ({
        chain: "solana",
        owner: snapshot.wallet,
        symbol: balance.symbol,
        mint: balance.mint,
        decimals: balance.decimals,
        atomicAmount: balance.atomicAmount,
        uiAmount: balance.uiAmount,
        usdValue: balance.usdValue,
      })),
      fetchedAt: snapshot.fetchedAt,
    };
  }

  sui(params: {
    address: string;
    network?: SuiNetwork;
  }): Promise<AccountPortfolio> {
    return fetchSuiPortfolio(params);
  }
}
