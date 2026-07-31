import {
  PowerPayApiClient,
  type PowerPayApiClientOptions,
} from "@powerpay/sdk";

const baseUrl =
  import.meta.env.VITE_POWERPAY_API_URL ??
  (typeof window === "undefined" ? "http://localhost:3000" : window.origin);

export function createAppApiClient(
  options?: PowerPayApiClientOptions,
): PowerPayApiClient {
  return new PowerPayApiClient(baseUrl, options);
}

export const powerPayApi = createAppApiClient();
