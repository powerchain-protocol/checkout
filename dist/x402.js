export const X402_NETWORKS = {
    solanaMainnet: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    solanaDevnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
};
function base64Json(value) {
    const json = JSON.stringify(value);
    if (typeof btoa === "function")
        return btoa(unescape(encodeURIComponent(json)));
    const NodeBuffer = globalThis.Buffer;
    if (NodeBuffer)
        return NodeBuffer.from(json).toString("base64");
    throw new Error("No base64 encoder is available");
}
export function createPaymentRequired(requirement) {
    return new Response(JSON.stringify({ x402Version: 2, accepts: [requirement] }), {
        status: 402,
        headers: { "content-type": "application/json", "PAYMENT-REQUIRED": base64Json(requirement) },
    });
}
export class X402FacilitatorClient {
    options;
    endpoint;
    fetchImpl;
    constructor(options = {}) {
        this.options = options;
        this.endpoint = (options.endpoint ?? "https://x402.org/facilitator").replace(/\/$/, "");
        this.fetchImpl = options.fetchImpl ?? fetch;
    }
    headers() {
        return { "content-type": "application/json", ...(this.options.authorization ? { Authorization: this.options.authorization } : {}) };
    }
    async verify(paymentPayload, requirement) {
        const response = await this.fetchImpl(`${this.endpoint}/verify`, { method: "POST", headers: this.headers(), body: JSON.stringify({ x402Version: 2, paymentPayload, paymentRequirements: requirement }) });
        if (!response.ok)
            throw new Error(`x402 verify failed (${response.status})`);
        return response.json();
    }
    async settle(paymentPayload, requirement) {
        const response = await this.fetchImpl(`${this.endpoint}/settle`, { method: "POST", headers: this.headers(), body: JSON.stringify({ x402Version: 2, paymentPayload, paymentRequirements: requirement }) });
        if (!response.ok)
            throw new Error(`x402 settle failed (${response.status})`);
        return response.json();
    }
}
