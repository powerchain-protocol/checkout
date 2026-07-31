import { listTrustedTokens } from "../../../src/lib/trusted-tokens.js";
import { json, type ApiRequest } from "./_shared.js";

export async function trustedTokensHandler(request: ApiRequest) {
  if (request.method !== "GET") {
    return json(405, {
      error: { code: "METHOD_NOT_ALLOWED", message: "Use GET" },
    });
  }
  return json(200, { data: listTrustedTokens() });
}
