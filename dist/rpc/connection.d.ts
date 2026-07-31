import { Commitment, Connection } from "@solana/web3.js";
export interface RpcConnectionOptions {
    rpcUrl?: string;
    wsUrl?: string;
    commitment?: Commitment;
    confirmTransactionInitialTimeout?: number;
}
export declare function createPowerPayConnection(options?: RpcConnectionOptions): Connection;
export declare function rpcHealth(connection?: Connection): Promise<{
    slot: number;
    blockHeight: number;
    version: import("@solana/web3.js").Version;
    rpcEndpoint: string;
}>;
//# sourceMappingURL=connection.d.ts.map