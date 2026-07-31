import { useCallback, useState } from "react";

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useAsync<T, Args extends unknown[]>(
  action: (...args: Args) => Promise<T>,
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const execute = useCallback(
    async (...args: Args): Promise<T> => {
      setState({ data: null, error: null, loading: true });
      try {
        const data = await action(...args);
        setState({ data, error: null, loading: false });
        return data;
      } catch (cause) {
        const error =
          cause instanceof Error ? cause : new Error(String(cause));
        setState({ data: null, error, loading: false });
        throw error;
      }
    },
    [action],
  );

  return { ...state, execute };
}
