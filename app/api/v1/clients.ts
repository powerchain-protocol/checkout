import {
  apiError,
  json,
  methodNotAllowed,
  optionsResponse,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

const clients = new Map<string, Record<string, unknown>>();

export function clientsRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);

  if (request.method === "GET") {
    return json(
      200,
      {
        data: [...clients.values()],
        hasMore: false,
      },
      request,
    );
  }

  if (request.method === "POST") {
    const body = request.body as
      | {
          name?: string;
          email?: string;
          company?: string;
          walletAddress?: string;
          metadata?: Record<string, unknown>;
        }
      | undefined;

    if (!body?.name?.trim()) {
      return apiError(
        400,
        "INVALID_CLIENT",
        "Client name is required",
        undefined,
        request,
      );
    }

    const id = `client_${crypto.randomUUID()}`;
    const now = new Date().toISOString();
    const client = {
      id,
      name: body.name.trim(),
      email: body.email,
      company: body.company,
      walletAddress: body.walletAddress,
      metadata: body.metadata,
      createdAt: now,
      updatedAt: now,
      status: "active",
      paymentCount: 0,
    };
    clients.set(id, client);
    return json(201, client, request);
  }

  return methodNotAllowed(request, ["GET", "POST", "OPTIONS"]);
}

export function clientRoute(
  request: ApiRequest,
): ApiResponse {
  if (request.method === "OPTIONS") return optionsResponse(request);
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  const clientId = request.params?.clientId;
  const client = clientId ? clients.get(clientId) : undefined;
  if (!client) {
    return apiError(
      404,
      "CLIENT_NOT_FOUND",
      "Client was not found",
      { clientId },
      request,
    );
  }

  return json(200, client, request);
}
