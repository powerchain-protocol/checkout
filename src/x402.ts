export const X402_NETWORKS = {
  solanaMainnet: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
  solanaDevnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
} as const;

export interface X402PaymentRequirement {
  scheme: "exact";
  network: string;
  maxAmountRequired: string;
  resource: string;
  description?: string;
  mimeType?: string;
  payTo: string;
  maxTimeoutSeconds?: number;
  asset: string;
  extra?: Record<string, unknown>;
}

export interface X402FacilitatorOptions {
  endpoint?: string;
  authorization?: string;
  fetchImpl?: typeof fetch;
}

function bytesToBase64(bytes: Uint8Array): string {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let output = "";

  for (let index = 0; index < bytes.length; index += 3) {
    const first = bytes[index] ?? 0;
    const second = bytes[index + 1] ?? 0;
    const third = bytes[index + 2] ?? 0;
    const value = (first << 16) | (second << 8) | third;

    output += alphabet[(value >> 18) & 63];
    output += alphabet[(value >> 12) & 63];
    output += index + 1 < bytes.length ? alphabet[(value >> 6) & 63] : "=";
    output += index + 2 < bytes.length ? alphabet[value & 63] : "=";
  }

  return output;
}

function base64Json(value: unknown): string {
  return bytesToBase64(new TextEncoder().encode(JSON.stringify(value)));
}

export function createPaymentRequired(requirement: X402PaymentRequirement): Response {
  return new Response(JSON.stringify({ x402Version: 2, accepts: [requirement] }), {
    status: 402,
    headers: { "content-type": "application/json", "PAYMENT-REQUIRED": base64Json(requirement) },
  });
}

export class X402FacilitatorClient {
  private endpoint: string;
  private fetchImpl: typeof fetch;
  constructor(private options: X402FacilitatorOptions = {}) {
    this.endpoint = (options.endpoint ?? "https://x402.org/facilitator").replace(/\/$/, "");
    this.fetchImpl = options.fetchImpl ?? fetch;
  }
  private headers(): HeadersInit {
    return { "content-type": "application/json", ...(this.options.authorization ? { Authorization: this.options.authorization } : {}) };
  }
  async verify(paymentPayload: unknown, requirement: X402PaymentRequirement): Promise<unknown> {
    const response = await this.fetchImpl(`${this.endpoint}/verify`, { method: "POST", headers: this.headers(), body: JSON.stringify({ x402Version: 2, paymentPayload, paymentRequirements: requirement }) });
    if (!response.ok) throw new Error(`x402 verify failed (${response.status})`);
    return response.json();
  }
  async settle(paymentPayload: unknown, requirement: X402PaymentRequirement): Promise<unknown> {
    const response = await this.fetchImpl(`${this.endpoint}/settle`, { method: "POST", headers: this.headers(), body: JSON.stringify({ x402Version: 2, paymentPayload, paymentRequirements: requirement }) });
    if (!response.ok) throw new Error(`x402 settle failed (${response.status})`);
    return response.json();
  }
}
