import {
  apiError,
  json,
  methodNotAllowed,
  optionsResponse,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

const integrations = [
  {
    id: "helius",
    provider: "helius",
    status: "connected",
    configured: Boolean(process.env.HELIUS_API_KEY),
    capabilities: ["solana-rpc", "webhooks", "transactions"],
  },
  {
    id: "pyth",
    provider: "pyth",
    status: "connected",
    configured: true,
    capabilities: ["prices", "confidence-intervals"],
  },
  {
    id: "circle",
    provider: "circle",
    status: process.env.CIRCLE_API_KEY ? "connected" : "disconnected",
    configured: Boolean(process.env.CIRCLE_API_KEY),
    capabilities: ["cctp", "cross-border"],
  },
  {
    id: "cetus",
    provider: "cetus",
    status: "connected",
    configured: true,
    capabilities: ["sui-liquidity", "quotes"],
  },
];

export function integrationsRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  return json(
    200,
    {
      data: integrations.map((integration) => ({
        ...integration,
        lastCheckedAt: new Date().toISOString(),
      })),
      hasMore: false,
    },
    request,
  );
}

export function integrationRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  const integrationId = request.params?.integrationId;
  const integration = integrations.find(
    (item) => item.id === integrationId,
  );

  if (!integration) {
    return apiError(
      404,
      "INTEGRATION_NOT_FOUND",
      "Integration was not found",
      { integrationId },
      request,
    );
  }

  return json(
    200,
    {
      ...integration,
      lastCheckedAt: new Date().toISOString(),
    },
    request,
  );
}
