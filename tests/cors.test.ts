import { describe, expect, it } from "vitest";
import {
  corsHeaders,
  optionsResponse,
} from "../app/api/v1/_shared.js";

describe("CORS headers", () => {
  it("returns wildcard for the development wildcard policy", () => {
    const headers = corsHeaders({
      method: "GET",
      headers: { Origin: "https://merchant.example" },
    });
    expect(headers["access-control-allow-origin"]).toBe("*");
  });

  it("accepts a valid preflight", () => {
    const response = optionsResponse({
      method: "OPTIONS",
      headers: {
        Origin: "https://merchant.example",
        "Access-Control-Request-Method": "POST",
        "Access-Control-Request-Headers":
          "content-type, idempotency-key",
      },
    });
    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-origin"]).toBe("*");
  });

  it("rejects unsupported request headers", () => {
    const response = optionsResponse({
      method: "OPTIONS",
      headers: {
        origin: "https://merchant.example",
        "access-control-request-method": "POST",
        "access-control-request-headers": "x-not-allowed",
      },
    });
    expect(response.status).toBe(400);
  });
});
