import { useCallback, useEffect, useState } from "react";
import type { Connection, PublicKey } from "@solana/web3.js";
import {
  fetchWalletSnapshot,
  type WalletSnapshot,
} from "../lib/solana.js";

export function useWalletData(
  connection: Connection,
  wallet: PublicKey | null,
) {
  const [data, setData] = useState<WalletSnapshot | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!wallet) {
      setData(null);
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const snapshot = await fetchWalletSnapshot(connection, wallet);
      setData(snapshot);
      return snapshot;
    } catch (cause) {
      const normalized =
        cause instanceof Error ? cause : new Error(String(cause));
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [connection, wallet]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
