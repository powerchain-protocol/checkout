# Public cluster exports

PowerPay previously exposed two different values named `CLUSTERS`:

- a legacy Solana-only registry from `src/constants/clusters.ts`;
- the newer multichain registry from `src/clusters/index.ts`.

The multichain registry is now the canonical public export:

```ts
import {
  CLUSTERS,
  SOLANA_CLUSTERS,
  SUI_CLUSTERS,
  clusterById,
} from "@powerchain-protocol/powerpay-checkout-sdk";
```

The legacy Solana-only registry remains available under an explicit name:

```ts
import {
  SOLANA_CLUSTER_DEFINITIONS,
  DEFAULT_CLUSTER,
  isPowerPayCluster,
} from "@powerchain-protocol/powerpay-checkout-sdk";
```

Type migration:

```ts
import type {
  ClusterDefinition,
  SolanaClusterDefinition,
  PowerPayCluster,
} from "@powerchain-protocol/powerpay-checkout-sdk";
```

`ClusterDefinition` describes the multichain model.
`SolanaClusterDefinition` describes the legacy Solana RPC model.
