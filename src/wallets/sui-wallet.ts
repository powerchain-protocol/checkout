import type { SuiNetwork } from "../clusters/types.js";

export interface SuiSignAndExecuteInput {
  transaction: unknown;
  options?: {
    showEffects?: boolean;
    showEvents?: boolean;
    showBalanceChanges?: boolean;
  };
}

export interface ConnectedSuiWallet {
  address: string | null;
  network: SuiNetwork;
  connected: boolean;
  connect?: () => Promise<void>;
  signAndExecuteTransaction(
    input: SuiSignAndExecuteInput,
  ): Promise<{
    digest: string;
    effects?: unknown;
    events?: unknown[];
    balanceChanges?: unknown[];
  }>;
}

export async function requireSuiWallet(
  wallet: ConnectedSuiWallet,
): Promise<string> {
  if (!wallet.connected && wallet.connect) {
    await wallet.connect();
  }
  if (!wallet.address) {
    throw new Error("Connect a Sui wallet before creating a transaction");
  }
  return wallet.address;
}
