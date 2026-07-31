import { SOLANA_CLUSTERS as SOLANA_NETWORKS } from "../clusters/solana.js";
import type {
  ClusterDefinition,
  SolanaCluster,
} from "../clusters/types.js";

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

export function networkConfig(
  cluster: SolanaCluster,
): ClusterDefinition {
  const configuration = SOLANA_NETWORKS[cluster];
  if (!configuration) {
    throw new RangeError(`Unsupported Solana cluster: ${String(cluster)}`);
  }
  return configuration;
}
