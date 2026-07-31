import { describe, expect, it } from "vitest";
import { routeApiV1 } from "../app/api/v1/router.js";

describe("API v1 router", () => {
  it("routes health with or without a trailing slash", async () => {
    expect(
      (await routeApiV1({ method: "GET", path: "/api/v1/health" })).status,
    ).toBe(200);
    expect(
      (await routeApiV1({ method: "GET", path: "/api/v1/health/" })).status,
    ).toBe(200);
  });

  it("supports CORS preflight for every v1 route", async () => {
    const response = await routeApiV1({
      method: "OPTIONS",
      path: "/api/v1/sessions/",
      headers: { origin: "https://merchant.example" },
    });
    expect(response.status).toBe(204);
    expect(response.headers["access-control-allow-methods"]).toContain("POST");
  });

  it("returns a typed route error", async () => {
    const response = await routeApiV1({
      method: "GET",
      path: "/api/v1/unknown",
    });
    expect(response.status).toBe(404);
  });
});
