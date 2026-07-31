import { describe, expect, it } from "vitest";
import { runtimeConfig } from "../src/config.js";
describe("runtimeConfig", () => {
  it("prefers Helius RPC", () => {
    const config = runtimeConfig({
      VITE_SOLANA_CLUSTER: "devnet",
      VITE_SOLANA_RPC_URL: "https://api.devnet.solana.com",
      VITE_HELIUS_RPC_URL: "https://devnet.helius-rpc.com/?api-key=test",
    });
    expect(config.rpcUrl).toContain("helius-rpc.com");
  });
});
