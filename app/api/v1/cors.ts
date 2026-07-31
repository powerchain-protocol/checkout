import type { CorsResponse } from "../../../src/types/api.js";
import {
  corsHeaders,
  json,
  methodNotAllowed,
  optionsResponse,
  type ApiRequest,
  type ApiResponse,
} from "./_shared.js";

export async function corsHandler(
  request: ApiRequest,
): Promise<ApiResponse<CorsResponse | null | unknown>> {
  if (request.method === "OPTIONS") {
    return optionsResponse(request);
  }
  if (request.method !== "GET") {
    return methodNotAllowed(request, ["GET", "OPTIONS"]);
  }

  const headers = corsHeaders(request);
  return json(
    200,
    {
      allowedOrigins: [headers["access-control-allow-origin"]],
      allowedMethods: headers["access-control-allow-methods"].split(", "),
      allowedHeaders: headers["access-control-allow-headers"].split(", "),
      credentials: false,
      maxAgeSeconds: Number(headers["access-control-max-age"]),
    },
    request,
  );
}
