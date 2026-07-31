import { PublicKey } from "@solana/web3.js";
import type { PowerPayCluster } from "./clusters.js";
export interface ClusterProgramIds {
    powerpay?: PublicKey;
    powerchain?: PublicKey;
    pwrpMint?: PublicKey;
    usdcMint?: PublicKey;
}
export declare function programIdsForCluster(cluster: PowerPayCluster, env?: Record<string, string | undefined>): ClusterProgramIds;
//# sourceMappingURL=programs.d.ts.map