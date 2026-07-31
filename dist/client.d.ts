export interface PowerPayConfig {
    publishableKey: string;
    environment?: "sandbox" | "production";
}
export declare class PowerPay {
    private config;
    constructor(config: PowerPayConfig);
    open(session: {
        amount: number;
        currency: string;
        merchant: string;
        reference: string;
    }): Promise<unknown>;
}
