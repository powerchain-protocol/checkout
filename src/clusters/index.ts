export * from "./types.js";
export * from "./solana.js";
export * from "./sui.js";

import { SOLANA_CLUSTERS } from "./solana.js";
import { SUI_CLUSTERS } from "./sui.js";
import type { ClusterDefinition } from "./types.js";

export const CLUSTERS: Record<string, ClusterDefinition> = {
  ...Object.fromEntries(
    Object.values(SOLANA_CLUSTERS).map((cluster) => [cluster.id, cluster]),
  ),
  ...Object.fromEntries(
    Object.values(SUI_CLUSTERS).map((cluster) => [cluster.id, cluster]),
  ),
};

export function clusterById(id: string): ClusterDefinition {
  const cluster = CLUSTERS[id];
  if (!cluster) throw new Error(`Unsupported cluster: ${id}`);
  return cluster;
}
