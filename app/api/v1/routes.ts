import type {
  ApiRequest,
  ApiResponse,
} from "./_shared.js";
import {
  clientRoute,
  clientsRoute,
} from "./clients.js";
import {
  posChargesRoute,
  posTerminalsRoute,
  qrPaymentsRoute,
} from "./checkout.js";
import {
  integrationRoute,
  integrationsRoute,
} from "./integrations.js";

export interface ApiRouteDefinition {
  method: string | "*";
  pattern: RegExp;
  paramNames?: string[];
  handler: (request: ApiRequest) => ApiResponse;
}

export const extendedApiRoutes: ApiRouteDefinition[] = [
  {
    method: "*",
    pattern: /^\/api\/v1\/clients$/,
    handler: clientsRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/clients\/([^/]+)$/,
    paramNames: ["clientId"],
    handler: clientRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/qr-payments$/,
    handler: qrPaymentsRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/pos\/charges$/,
    handler: posChargesRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/pos\/terminals$/,
    handler: posTerminalsRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/integrations$/,
    handler: integrationsRoute,
  },
  {
    method: "*",
    pattern: /^\/api\/v1\/integrations\/([^/]+)$/,
    paramNames: ["integrationId"],
    handler: integrationRoute,
  },
];

export function dispatchExtendedRoute(
  request: ApiRequest,
): ApiResponse | undefined {
  const path = request.path ?? "/";
  for (const route of extendedApiRoutes) {
    if (route.method !== "*" && route.method !== request.method) {
      continue;
    }

    const match = path.match(route.pattern);
    if (!match) continue;

    const params = Object.fromEntries(
      (route.paramNames ?? []).map((name, index) => [
        name,
        decodeURIComponent(match[index + 1]),
      ]),
    );

    return route.handler({
      ...request,
      params: {
        ...request.params,
        ...params,
      },
    });
  }

  return undefined;
}
