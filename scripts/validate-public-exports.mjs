import { readFileSync } from "node:fs";

const source = readFileSync("src/index.ts", "utf8");

const forbidden = [
  'export * from "./constants/clusters.js";',
  'export * from "./clusters/index.js";',
];

for (const value of forbidden) {
  if (source.includes(value)) {
    throw new Error(`Ambiguous wildcard export remains: ${value}`);
  }
}

for (const required of [
  "CLUSTERS as SOLANA_CLUSTER_DEFINITIONS",
  "ClusterDefinition as SolanaClusterDefinition",
  "CLUSTERS,",
  "SOLANA_CLUSTERS",
  "SUI_CLUSTERS",
]) {
  if (!source.includes(required)) {
    throw new Error(`Missing explicit public export: ${required}`);
  }
}

console.log("Public exports: OK");
