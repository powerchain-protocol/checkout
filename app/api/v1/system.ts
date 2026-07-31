import { POWERPAY_API_ROUTES } from "../../../src/constants/routes.js";
import {
  POWERPAY_WEBSOCKET_EVENTS,
  POWERPAY_WEBSOCKET_HEARTBEAT_SECONDS,
  POWERPAY_WEBSOCKET_PROTOCOL,
} from "../../../src/constants/events.js";
import { POWERPAY_SDK_VERSION } from "../../../src/version.js";
import type { WebSocketInfoResponse } from "../../../src/types/api.js";
import {
  json,
  methodNotAllowed,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

export function apiIndexHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  return json(200, {
    name: "PowerPay API",
    version: POWERPAY_SDK_VERSION,
    status: "available",
    documentation: POWERPAY_API_ROUTES.openapi,
    websocket: POWERPAY_API_ROUTES.websocketInfo,
    routes: POWERPAY_API_ROUTES,
  }, request);
}

export function openApiHandler(request: ApiRequest): ApiResponse {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  return json(200, {
    openapi: "3.1.0",
    specification: "/swagger.yaml",
    ui: "/api-docs",
    version: POWERPAY_SDK_VERSION,
  }, request);
}

export function websocketInfoHandler(
  request: ApiRequest,
): ApiResponse<WebSocketInfoResponse | unknown> {
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  const host = request.headers?.host ?? "localhost:5173";
  const forwarded = request.headers?.["x-forwarded-proto"];
  const secure = forwarded === "https" || forwarded === "wss";

  return json(200, {
    endpoint: `${secure ? "wss" : "ws"}://${host}/api/v1/ws`,
    protocol: POWERPAY_WEBSOCKET_PROTOCOL,
    heartbeatSeconds: POWERPAY_WEBSOCKET_HEARTBEAT_SECONDS,
    reconnect: {
      initialDelayMs: 500,
      maximumDelayMs: 15_000,
      multiplier: 1.8,
    },
    events: [...POWERPAY_WEBSOCKET_EVENTS],
  }, request);
}
