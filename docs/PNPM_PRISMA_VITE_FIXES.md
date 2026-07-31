# pnpm, Prisma 7, and Vite import fixes

## Install and approve dependency builds

```bash
corepack enable
corepack prepare pnpm@11.17.0 --activate
pnpm install
pnpm ignored-builds
pnpm approve-builds
```

Approved dependency build scripts are recorded under `allowBuilds` in
`pnpm-workspace.yaml`.

## Prisma 7

`prisma.config.ts` uses the Prisma 7 configuration API:

```ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";
```

Both imports resolve after installing `dotenv` and the Prisma CLI in the root
workspace:

```bash
pnpm install
pnpm db:deps
pnpm db:generate
pnpm db:validate
pnpm typecheck:prisma
```

Restart the TypeScript language server after installation.

## Vite SDK imports

Application code imports the root SDK through:

```ts
import { ConnectButton } from "@powerpay/sdk";
```

The alias resolves to `../src/index.ts` during development. This avoids
incorrect paths such as `../../../src/index.js`, which resolve inside
`app/src` rather than to the repository root.

The Vite server explicitly allows access to the parent workspace directory.

## Wallet Adapter CSS

Import the wallet stylesheet once from `app/src/main.tsx`:

```ts
import "@solana/wallet-adapter-react-ui/styles.css";
```

`app/src/vite-env.d.ts` declares CSS side-effect modules for TypeScript. The
stylesheet is provided by `@solana/wallet-adapter-react-ui`, which must be
installed in the app workspace.

```bash
pnpm --dir app install
pnpm --dir app typecheck
pnpm --dir app dev
```
