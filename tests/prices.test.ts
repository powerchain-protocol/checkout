import { describe, expect, it } from "vitest";
import { PythPriceClient } from "../src/prices.js";

describe("Pyth prices", () => {
  it("discovers and scales a live-shaped Hermes response", async () => {
    const now = Math.floor(Date.now() / 1000);
    const mockFetch: typeof fetch = async (input) => {
      const url = String(input);
      if (url.includes("price_feeds")) return new Response(JSON.stringify([{ id: "abc", attributes: { display_symbol: "SOL/USD" } }]));
      return new Response(JSON.stringify({ parsed: [{ id: "abc", price: { price: "12550000000", conf: "1000000", expo: -8, publish_time: now } }] }));
    };
    const client = new PythPriceClient({ fetchImpl: mockFetch, maxAgeSeconds: 60 });
    const price = await client.fetchPair("SOL", "USD");
    expect(price.price).toBe(125.5);
    expect(price.source).toBe("pyth-hermes");
  });
});
