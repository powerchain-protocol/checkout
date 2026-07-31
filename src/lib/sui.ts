import type { AccountPortfolio, CoinBalance } from "../types/accounts.js";
import type { SuiNetwork } from "../clusters/types.js";
import { SuiRpcClient } from "./sui-rpc.js";
import { validateSuiAddress } from "../security/validate.js";

export interface SuiWalletData {
  address: string;
  network: SuiNetwork;
  checkpoint: string;
  balances: CoinBalance[];
  fetchedAt: string;
}

export async function fetchSuiWalletData(params: {
  address: string;
  network?: SuiNetwork;
  rpc?: SuiRpcClient;
}): Promise<SuiWalletData> {
  const address = validateSuiAddress(params.address);
  const rpc =
    params.rpc ??
    new SuiRpcClient({ network: params.network ?? "testnet" });

  const [checkpoint, rawBalances] = await Promise.all([
    rpc.getLatestCheckpointSequenceNumber(),
    rpc.getAllBalances(address),
  ]);

  const balances = await Promise.all(
    rawBalances.map(async (balance): Promise<CoinBalance> => {
      const metadata = await rpc.getCoinMetadata(balance.coinType);
      const decimals = metadata?.decimals ?? 0;
      const divisor = 10n ** BigInt(decimals);
      const atomic = BigInt(balance.totalBalance);
      const whole = atomic / divisor;
      const fraction =
        decimals === 0
          ? ""
          : (atomic % divisor)
              .toString()
              .padStart(decimals, "0")
              .replace(/0+$/, "");
      return {
        chain: "sui",
        owner: address,
        symbol: metadata?.symbol ?? balance.coinType.split("::").at(-1) ?? "COIN",
        coinType: balance.coinType,
        decimals,
        atomicAmount: balance.totalBalance,
        uiAmount: fraction ? `${whole}.${fraction}` : whole.toString(),
      };
    }),
  );

  return {
    address,
    network: rpc.network,
    checkpoint,
    balances,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchSuiPortfolio(params: {
  address: string;
  network?: SuiNetwork;
  rpc?: SuiRpcClient;
}): Promise<AccountPortfolio> {
  const data = await fetchSuiWalletData(params);
  return {
    account: {
      chain: "sui",
      address: data.address,
      network: data.network,
      connected: true,
    },
    balances: data.balances,
    fetchedAt: data.fetchedAt,
  };
}
