export const X402_NETWORKS = {
    solanaMainnet: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
    solanaDevnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",
};
function bytesToBase64(bytes) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
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
function base64Json(value) {
    return bytesToBase64(new TextEncoder().encode(JSON.stringify(value)));
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
//# sourceMappingURL=x402.js.map