import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

export interface PowerPayHttpClientOptions {
  baseURL?: string;
  timeoutMs?: number;
  headers?: Record<string, string>;
}

export function createPowerPayHttpClient(
  options: PowerPayHttpClientOptions = {},
): AxiosInstance {
  const client = axios.create({
    baseURL: options.baseURL,
    timeout: options.timeoutMs ?? 12_000,
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const message =
        error.response?.status
          ? `PowerPay API request failed with HTTP ${error.response.status}`
          : error.message;
      return Promise.reject(new Error(message, { cause: error }));
    },
  );

  return client;
}

export async function requestJson<T>(
  client: AxiosInstance,
  config: AxiosRequestConfig,
): Promise<T> {
  const response = await client.request<T>(config);
  return response.data;
}
