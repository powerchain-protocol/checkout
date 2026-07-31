import { useCallback, useEffect, useState } from "react";
import {
  PythPriceClient,
  type PythPrice,
} from "../lib/pyth.js";

export function usePythPrice(
  feedId: string | undefined,
  endpoint?: string,
) {
  const [price, setPrice] = useState<PythPrice | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!feedId) return null;
    setLoading(true);
    setError(null);
    try {
      const value = await new PythPriceClient(endpoint).latestPrice(feedId);
      setPrice(value);
      return value;
    } catch (cause) {
      const normalized =
        cause instanceof Error ? cause : new Error(String(cause));
      setError(normalized);
      throw normalized;
    } finally {
      setLoading(false);
    }
  }, [endpoint, feedId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return {
    price,
    decimalPrice: price ? PythPriceClient.decimal(price) : null,
    loading,
    error,
    refresh,
  };
}
