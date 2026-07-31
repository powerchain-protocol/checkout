import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface ApiResourceState<T> {
  data?: T;
  error?: Error;
  loading: boolean;
  refreshing: boolean;
}

export interface UseApiResourceOptions<T> {
  enabled?: boolean;
  initialData?: T;
  keepPreviousData?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useApiResource<T>(
  loader: (signal: AbortSignal) => Promise<T>,
  dependencies: readonly unknown[],
  options: UseApiResourceOptions<T> = {},
) {
  const {
    enabled = true,
    initialData,
    keepPreviousData = true,
    onSuccess,
    onError,
  } = options;

  const mounted = useRef(true);
  const [state, setState] = useState<ApiResourceState<T>>({
    data: initialData,
    loading: enabled,
    refreshing: false,
  });

  const run = useCallback(
    async (refreshing = false) => {
      const controller = new AbortController();
      setState((current) => ({
        data: keepPreviousData ? current.data : undefined,
        error: undefined,
        loading: !refreshing,
        refreshing,
      }));

      try {
        const data = await loader(controller.signal);
        if (!mounted.current) return;
        setState({ data, loading: false, refreshing: false });
        onSuccess?.(data);
      } catch (value) {
        if (controller.signal.aborted || !mounted.current) return;
        const error =
          value instanceof Error ? value : new Error(String(value));
        setState((current) => ({
          data: current.data,
          error,
          loading: false,
          refreshing: false,
        }));
        onError?.(error);
      }

      return () => controller.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    dependencies,
  );

  useEffect(() => {
    mounted.current = true;
    if (!enabled) {
      setState((current) => ({
        ...current,
        loading: false,
        refreshing: false,
      }));
      return;
    }

    const controller = new AbortController();
    setState((current) => ({
      ...current,
      loading: current.data === undefined,
      refreshing: current.data !== undefined,
      error: undefined,
    }));

    loader(controller.signal)
      .then((data) => {
        if (!mounted.current || controller.signal.aborted) return;
        setState({ data, loading: false, refreshing: false });
        onSuccess?.(data);
      })
      .catch((value) => {
        if (!mounted.current || controller.signal.aborted) return;
        const error =
          value instanceof Error ? value : new Error(String(value));
        setState((current) => ({
          data: current.data,
          error,
          loading: false,
          refreshing: false,
        }));
        onError?.(error);
      });

    return () => {
      mounted.current = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return {
    ...state,
    refetch: () => run(true),
  };
}
