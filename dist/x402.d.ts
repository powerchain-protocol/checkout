export declare const X402_NETWORKS: {
    readonly solanaMainnet: "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp";
    readonly solanaDevnet: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1";
};
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
export declare function createPaymentRequired(requirement: X402PaymentRequirement): Response;
export declare class X402FacilitatorClient {
    private options;
    private endpoint;
    private fetchImpl;
    constructor(options?: X402FacilitatorOptions);
    private headers;
    verify(paymentPayload: unknown, requirement: X402PaymentRequirement): Promise<unknown>;
    settle(paymentPayload: unknown, requirement: X402PaymentRequirement): Promise<unknown>;
}
//# sourceMappingURL=x402.d.ts.map