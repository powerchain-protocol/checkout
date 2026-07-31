import { useCallback, useEffect, useState } from "react";
import type { EmbeddedWalletRecord } from "../types/user.js";

export interface EmbeddedWalletAdapter {
  create(userId: string): Promise<EmbeddedWalletRecord>;
  get(userId: string): Promise<EmbeddedWalletRecord | null>;
}

export function useEmbeddedWallets(
  adapter: EmbeddedWalletAdapter,
  userId: string | undefined,
) {
  const [wallet, setWallet] = useState<EmbeddedWalletRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const refresh = useCallback(async () => {
    if (!userId) {
      setWallet(null);
      return null;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await adapter.get(userId);
      setWallet(result);
      return result;
    } catch (cause) {
      const normalized =
        cause instanceof Error ? cause : new Error(String(cause));
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [adapter, userId]);

  const create = useCallback(async () => {
    if (!userId) throw new Error("A user ID is required");
    setLoading(true);
    try {
      const result = await adapter.create(userId);
      setWallet(result);
      return result;
    } finally {
      setLoading(false);
    }
  }, [adapter, userId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return { wallet, loading, error, refresh, create };
}
