import type { ApiErrorBody } from "../../../src/types/api.js";
import { createRequestId } from "../../../src/utils/util.js";

export interface ApiRequest {
  method: string;
  path?: string;
  body?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string | undefined>;
  query?: URLSearchParams | Record<string, string | undefined>;
}

export interface ApiResponse<T = unknown> {
  status: number;
  headers: Record<string, string>;
  body: T;
}

const ALLOWED_METHODS = ["GET", "POST", "PATCH", "DELETE", "OPTIONS"] as const;
const DEFAULT_ALLOWED_HEADERS = [
  "authorization",
  "content-type",
  "idempotency-key",
  "x-powerpay-version",
] as const;

function header(
  request: ApiRequest,
  name: string,
): string | undefined {
  const target = name.toLowerCase();
  for (const [key, value] of Object.entries(request.headers ?? {})) {
    if (key.toLowerCase() === target) return value;
  }
  return undefined;
}

function configuredOrigins(): string[] {
  const configured = process.env.POWERPAY_CORS_ORIGINS
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  return configured?.length ? configured : ["*"];
}

function isValidOrigin(origin: string): boolean {
  if (origin === "null") return true;
  try {
    const parsed = new URL(origin);
    return (
      (parsed.protocol === "http:" || parsed.protocol === "https:") &&
      parsed.origin === origin
    );
  } catch {
    return false;
  }
}

function selectedOrigin(origin?: string): string | undefined {
  if (!origin || !isValidOrigin(origin)) return undefined;

  const allowed = configuredOrigins();
  if (allowed.includes("*")) return "*";
  return allowed.includes(origin) ? origin : undefined;
}

function requestedHeaders(request: ApiRequest): string[] {
  const value = header(request, "access-control-request-headers");
  if (!value) return [];

  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function corsHeaders(
  request: ApiRequest = { method: "GET" },
): Record<string, string> {
  const origin = header(request, "origin");
  const allowOrigin = selectedOrigin(origin);
  const headers: Record<string, string> = {
    "access-control-allow-methods": ALLOWED_METHODS.join(", "),
    "access-control-allow-headers": DEFAULT_ALLOWED_HEADERS.join(", "),
    "access-control-max-age": "86400",
  };

  if (allowOrigin) {
    headers["access-control-allow-origin"] = allowOrigin;
  }

  if (configuredOrigins().includes("*")) {
    return headers;
  }

  headers.vary = [
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ].join(", ");
  return headers;
}

export function json<T>(
  status: number,
  body: T,
  request?: ApiRequest,
): ApiResponse<T> {
  return {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...corsHeaders(request),
    },
    body,
  };
}

export function apiError(
  status: number,
  code: string,
  message: string,
  details?: unknown,
  request?: ApiRequest,
): ApiResponse<ApiErrorBody> {
  return json(
    status,
    {
      error: {
        code,
        message,
        details,
        requestId: createRequestId("req"),
      },
    },
    request,
  );
}

export function methodNotAllowed(
  request: ApiRequest,
  allowed: string[],
): ApiResponse<ApiErrorBody> {
  const response = apiError(
    405,
    "METHOD_NOT_ALLOWED",
    `Allowed methods: ${allowed.join(", ")}`,
    undefined,
    request,
  );
  response.headers.allow = allowed.join(", ");
  return response;
}

export function optionsResponse(request: ApiRequest): ApiResponse<null | ApiErrorBody> {
  const origin = header(request, "origin");
  const requestedMethod = header(
    request,
    "access-control-request-method",
  )?.toUpperCase();
  const requested = requestedHeaders(request);

  if (!origin || !selectedOrigin(origin)) {
    return apiError(
      403,
      "CORS_ORIGIN_DENIED",
      "The request origin is not allowed",
      { origin: origin ?? null },
      request,
    );
  }

  if (
    !requestedMethod ||
    !ALLOWED_METHODS.includes(
      requestedMethod as (typeof ALLOWED_METHODS)[number],
    )
  ) {
    return apiError(
      405,
      "CORS_METHOD_DENIED",
      "The requested CORS method is not allowed",
      { method: requestedMethod ?? null },
      request,
    );
  }

  const deniedHeaders = requested.filter(
    (item) => !DEFAULT_ALLOWED_HEADERS.includes(
      item as (typeof DEFAULT_ALLOWED_HEADERS)[number],
    ),
  );
  if (deniedHeaders.length > 0) {
    return apiError(
      400,
      "CORS_HEADERS_DENIED",
      "One or more requested CORS headers are not allowed",
      { headers: deniedHeaders },
      request,
    );
  }

  return {
    status: 204,
    headers: corsHeaders(request),
    body: null,
  };
}
