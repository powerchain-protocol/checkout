import { dispatchExtendedRoute } from "./routes.js";
import {
  apiError,
  optionsResponse,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";
import { corsHandler } from "./cors.js";
import { createCrossBorderHandler } from "./cross-border.js";
import { healthHandler } from "./health.js";
import { createPaymentHandler } from "./payments.js";
import { sessionHandler, sessionsHandler } from "./sessions.js";
import {
  apiIndexHandler,
  openApiHandler,
  websocketInfoHandler,
} from "./system.js";
import { trustedTokensHandler } from "./trusted-tokens.js";

export const API_V1_PREFIX = "/api/v1";

type Route = {
  pattern: RegExp;
  handler: (request: ApiRequest) => Promise<ApiResponse> | ApiResponse;
  params?: string[];
};

const routes: Route[] = [
  { pattern: /^\/?$/, handler: apiIndexHandler },
  { pattern: /^\/openapi\/?$/, handler: openApiHandler },
  { pattern: /^\/websocket\/?$/, handler: websocketInfoHandler },
  { pattern: /^\/health\/?$/, handler: healthHandler },
  { pattern: /^\/payments\/?$/, handler: createPaymentHandler },
  { pattern: /^\/sessions\/?$/, handler: sessionsHandler },
  {
    pattern: /^\/sessions\/([^/]+)\/?$/,
    handler: sessionHandler,
    params: ["sessionId"],
  },
  { pattern: /^\/cors\/?$/, handler: corsHandler },
  { pattern: /^\/trusted-tokens\/?$/, handler: trustedTokensHandler },
  { pattern: /^\/cross-border\/?$/, handler: createCrossBorderHandler },
];

function normalizePath(path: string): string {
  const withoutQuery = path.split("?")[0] || "/";
  if (withoutQuery === API_V1_PREFIX) return "/";
  if (withoutQuery.startsWith(`${API_V1_PREFIX}/`)) {
    return withoutQuery.slice(API_V1_PREFIX.length);
  }
  return withoutQuery;
}

export async function routeApiV1(
  request: ApiRequest,
): Promise<ApiResponse> {
  const normalizedRequest = {
    ...request,
    method: request.method.toUpperCase(),
  };
  const path = normalizePath(normalizedRequest.path ?? "/");

  if (normalizedRequest.method === "OPTIONS") {
    return optionsResponse(normalizedRequest);
  }

  try {
    const extended = dispatchExtendedRoute({
      ...normalizedRequest,
      path: `${API_V1_PREFIX}${path === "/" ? "" : path}`,
    });
    if (extended) return extended;

    for (const route of routes) {
      const match = route.pattern.exec(path);
      if (!match) continue;

      const params = { ...normalizedRequest.params };
      route.params?.forEach((name, index) => {
        params[name] = decodeURIComponent(match[index + 1]);
      });

      return await route.handler({
        ...normalizedRequest,
        path,
        params,
      });
    }

    return apiError(
      404,
      "ROUTE_NOT_FOUND",
      "The requested API v1 route does not exist",
      {
        path: normalizedRequest.path ?? "/",
        documentation: "/api/v1/openapi",
      },
      normalizedRequest,
      false,
    );
  } catch (cause) {
    return apiError(
      500,
      "API_HANDLER_FAILED",
      "The API handler failed unexpectedly",
      {
        path: normalizedRequest.path ?? "/",
        cause: cause instanceof Error ? cause.message : String(cause),
      },
      normalizedRequest,
      true,
    );
  }
}
