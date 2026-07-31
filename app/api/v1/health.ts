import { POWERPAY_SDK_VERSION } from "../../../src/version.js";
import type { HealthResponse } from "../../../src/types/api.js";
import { json, type ApiRequest, type ApiResponse } from "./_shared.js";

export async function healthHandler(
  _request: ApiRequest,
): Promise<ApiResponse<HealthResponse>> {
  return json(200, {
    status: "ok",
    version: POWERPAY_SDK_VERSION,
    timestamp: new Date().toISOString(),
    cluster: process.env.POWERPAY_CLUSTER ?? "devnet",
  });
}
