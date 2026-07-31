import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";
import {
  POWERPAY_DEFAULT_TIMEOUT_MS,
  POWERPAY_IDEMPOTENCY_HEADER,
  POWERPAY_REQUEST_ID_HEADER,
  POWERPAY_SDK_VERSION,
  POWERPAY_VERSION_HEADER,
} from "../constants/sdk.js";
import type {
  PowerPayRequestContext,
  PowerPaySdkConfig,
} from "../types/sdk.js";
import { PowerPayApiError } from "./errors.js";

export class PowerPayHttpTransport {
  readonly http: AxiosInstance;

  constructor(config: PowerPaySdkConfig) {
    this.http = axios.create({
      baseURL: config.baseUrl.replace(/\/$/, ""),
      timeout: config.timeoutMs ?? POWERPAY_DEFAULT_TIMEOUT_MS,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        [POWERPAY_VERSION_HEADER]: POWERPAY_SDK_VERSION,
        ...(config.apiKey
          ? { Authorization: `Bearer ${config.apiKey}` }
          : {}),
        ...(config.merchantId
          ? { "X-PowerPay-Merchant-Id": config.merchantId }
          : {}),
        ...(config.organizationId
          ? { "X-PowerPay-Organization-Id": config.organizationId }
          : {}),
        ...config.headers,
      },
    });
  }

  async request<T>(
    options: AxiosRequestConfig,
    context: PowerPayRequestContext = {},
  ): Promise<T> {
    try {
      const response = await this.http.request<T>({
        ...options,
        signal: context.signal,
        headers: {
          ...options.headers,
          ...(context.requestId
            ? { [POWERPAY_REQUEST_ID_HEADER]: context.requestId }
            : {}),
          ...(context.idempotencyKey
            ? {
                [POWERPAY_IDEMPOTENCY_HEADER]:
                  context.idempotencyKey,
              }
            : {}),
          ...(context.merchantId
            ? { "X-PowerPay-Merchant-Id": context.merchantId }
            : {}),
          ...(context.organizationId
            ? {
                "X-PowerPay-Organization-Id":
                  context.organizationId,
              }
            : {}),
        },
      });
      return response.data;
    } catch (error) {
      throw normalizeApiError(error);
    }
  }
}

function normalizeApiError(error: unknown): PowerPayApiError {
  if (!(error instanceof AxiosError)) {
    return new PowerPayApiError({
      message:
        error instanceof Error ? error.message : "Unknown API error",
      status: 0,
      cause: error,
    });
  }

  const body = error.response?.data as
    | {
        error?: {
          code?: string;
          message?: string;
          details?: unknown;
          requestId?: string;
        };
      }
    | undefined;

  return new PowerPayApiError({
    message:
      body?.error?.message ??
      error.message ??
      "PowerPay API request failed",
    status: error.response?.status ?? 0,
    code: body?.error?.code,
    details: body?.error?.details,
    requestId: body?.error?.requestId,
    cause: error,
  });
}
