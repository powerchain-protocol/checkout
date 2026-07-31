import type {
  ApiErrorBody,
  ApiFallbackBody,
} from "../types/api.js";

export function isApiErrorBody(
  value: unknown,
): value is ApiErrorBody | ApiFallbackBody {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as { error?: unknown }).error === "object"
  );
}

export function apiErrorMessage(
  value: unknown,
  fallback = "PowerPay request failed",
): string {
  if (!isApiErrorBody(value)) return fallback;
  return value.error.message || fallback;
}

export function websocketUrl(
  baseUrl: string,
  path = "/api/v1/ws",
): string {
  const url = new URL(baseUrl);
  url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = path;
  url.search = "";
  url.hash = "";
  return url.toString();
}
