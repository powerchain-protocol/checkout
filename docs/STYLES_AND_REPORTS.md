# Styles and internal reports

## Public stylesheet

The SDK publishes one stable CSS entry:

```ts
import "@powerchain-protocol/powerpay-checkout-sdk/styles.css";
```

It resolves to:

```text
styles/powerpay.css
```

The source stylesheet is synchronized by:

```bash
pnpm styles:sync
```

## Build reports

Build reports live under:

```text
reports/
```

They are repository artifacts and are not included in npm packages.

Before packaging:

```bash
pnpm reports:organize
pnpm package:validate
pnpm pack --dry-run
```

## TypeScript 7 migration

`app/tsconfig.json` no longer uses deprecated `baseUrl`. The `paths` entry is
resolved relative to the configuration file:

```json
{
  "compilerOptions": {
    "moduleResolution": "Bundler",
    "paths": {
      "@powerpay/sdk": ["../src/index.ts"]
    }
  }
}
```

Vite provides the corresponding runtime alias.
