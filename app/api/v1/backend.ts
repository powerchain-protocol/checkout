import {
  apiError,
  json,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";
import {
  POWERPAY_ROLE_PERMISSIONS,
  POWERPAY_ROLES,
} from "../../../src/constants/roles.js";
import { POWERPAY_SDK_VERSION } from "../../../src/version.js";

const refunds = new Map<string, Record<string, unknown>>();
const webhooks = new Map<string, Record<string, unknown>>();

function resourceId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replaceAll("-", "")}`;
}

export function refundsHandler(request: ApiRequest): ApiResponse {
  if (request.method === "GET") {
    return json(200, { data: [...refunds.values()], hasMore: false }, request);
  }
  if (request.method !== "POST") {
    return methodNotAllowed(request, ["GET", "POST", "OPTIONS"]);
  }
  const body = request.body as Record<string, unknown> | undefined;
  if (typeof body?.paymentId !== "string" || body.amount == null) {
    return apiError(
      400,
      "INVALID_REFUND",
      "paymentId and amount are required",
      undefined,
      request,
      false,
    );
  }
  const refund = {
    id: resourceId("re"),
    paymentId: body.paymentId,
    amount: String(body.amount),
    currency: body.currency ?? "USD",
    reason: body.reason ?? null,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  refunds.set(String(refund.id), refund);
  return json(201, refund, request);
}

export function refundHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }
  const refund = refunds.get(request.params?.refundId ?? "");
  return refund
    ? json(200, refund, request)
    : apiError(
        404,
        "REFUND_NOT_FOUND",
        "Refund not found",
        undefined,
        request,
        false,
      );
}

export function webhooksHandler(request: ApiRequest): ApiResponse {
  if (request.method === "GET") {
    return json(200, { data: [...webhooks.values()], hasMore: false }, request);
  }
  if (request.method !== "POST") {
    return methodNotAllowed(request, ["GET", "POST", "OPTIONS"]);
  }
  const body = request.body as Record<string, unknown> | undefined;
  if (typeof body?.url !== "string") {
    return apiError(
      400,
      "INVALID_WEBHOOK",
      "url is required",
      undefined,
      request,
      false,
    );
  }
  try {
    new URL(body.url);
  } catch {
    return apiError(
      400,
      "INVALID_WEBHOOK_URL",
      "url must be an absolute URL",
      undefined,
      request,
      false,
    );
  }
  const webhook = {
    id: resourceId("wh"),
    url: body.url,
    events: Array.isArray(body.events)
      ? body.events
      : ["payment.confirmed"],
    enabled: true,
    createdAt: new Date().toISOString(),
  };
  webhooks.set(String(webhook.id), webhook);
  return json(201, webhook, request);
}

export function webhookHandler(request: ApiRequest): ApiResponse {
  const id = request.params?.webhookId ?? "";
  const webhook = webhooks.get(id);
  if (!webhook) {
    return apiError(
      404,
      "WEBHOOK_NOT_FOUND",
      "Webhook not found",
      undefined,
      request,
      false,
    );
  }
  if (request.method === "GET") return json(200, webhook, request);
  if (request.method === "DELETE") {
    webhooks.delete(id);
    return json(200, { id, deleted: true }, request);
  }
  return methodNotAllowed(request, ["GET", "DELETE", "OPTIONS"]);
}

export function metricsHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }
  return json(200, {
    status: "ok",
    version: POWERPAY_SDK_VERSION,
    uptimeSeconds: Math.floor(process.uptime()),
    memory: process.memoryUsage(),
    resources: {
      refunds: refunds.size,
      webhooks: webhooks.size,
    },
    timestamp: new Date().toISOString(),
  }, request);
}

export function configHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }
  return json(200, {
    version: POWERPAY_SDK_VERSION,
    apiVersion: "v1",
    websocketProtocol: "powerpay.v1",
    capabilities: [
      "payments",
      "sessions",
      "clients",
      "qr-payments",
      "pos",
      "integrations",
      "refunds",
      "webhooks",
      "cross-border",
    ],
  }, request);
}

export function rolesHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }
  return json(200, {
    data: POWERPAY_ROLES.map((role) => ({
      role,
      permissions: POWERPAY_ROLE_PERMISSIONS[role],
    })),
  }, request);
}
