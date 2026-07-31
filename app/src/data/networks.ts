import {
  SOLANA_CLUSTERS,
  SUI_CLUSTERS,
} from "../../../src/clusters/index";

export const applicationNetworks = [
  ...Object.values(SOLANA_CLUSTERS),
  ...Object.values(SUI_CLUSTERS),
];
