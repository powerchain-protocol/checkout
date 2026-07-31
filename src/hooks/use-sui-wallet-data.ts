import { useCallback, useEffect, useState } from "react";
import type { SuiNetwork } from "../clusters/types.js";
import {
  fetchSuiWalletData,
  type SuiWalletData,
} from "../lib/sui.js";

export function useSuiWalletData(
  address: string | null,
  network: SuiNetwork = "testnet",
) {
  const [data, setData] = useState<SuiWalletData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!address) {
      setData(null);
      return null;
    }

    setLoading(true);
    setError(null);
    try {
      const value = await fetchSuiWalletData({ address, network });
      setData(value);
      return value;
    } catch (cause) {
      const normalized =
        cause instanceof Error ? cause : new Error(String(cause));
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [address, network]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { data, loading, error, refresh };
}
