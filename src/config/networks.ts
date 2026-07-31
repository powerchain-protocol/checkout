export {
  CLUSTERS,
  clusterById,
  SOLANA_CLUSTERS,
  SUI_CLUSTERS,
} from "../clusters/index.js";
export type {
  ChainFamily,
  ClusterDefinition,
  SolanaCluster,
  SuiNetwork,
} from "../clusters/types.js";


import { SOLANA_CLUSTERS as SOLANA_NETWORKS } from "../clusters/solana.js";
import type { SolanaCluster as SolanaNetworkId } from "../clusters/types.js";

export function networkConfig(cluster: SolanaNetworkId) {
  return SOLANA_NETWORKS[cluster];
}
