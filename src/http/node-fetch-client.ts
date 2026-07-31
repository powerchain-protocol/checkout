import fetch, {
  Headers,
  Request,
  Response,
  type RequestInit,
} from "node-fetch";

export interface FetchJsonOptions extends RequestInit {
  timeoutMs?: number;
}

export async function fetchJson<T>(
  url: string | URL,
  options: FetchJsonOptions = {},
): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? 12_000,
  );

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `PowerPay fetch failed: ${response.status} ${response.statusText}`,
      );
    }

    return (await response.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

export { fetch, Headers, Request, Response };
