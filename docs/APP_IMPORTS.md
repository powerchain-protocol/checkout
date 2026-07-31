# Application import conventions

## Root SDK

Application components must import root SDK exports through:

```ts
import { ConnectButton, ThemeToggle } from "@powerpay/sdk";
```

Do not use relative paths such as:

```ts
import { ConnectButton } from "../../../src/index.js";
```

Those paths are calculated from the component directory and commonly resolve
inside `app/src` rather than the repository root.

## Application server utilities

Utilities under `app/lib` are exposed to Vite and TypeScript as:

```ts
import { formatCurrency } from "@app-lib/utils";
```

This avoids brittle paths from deeply nested checkout components.

## Validation

Run:

```bash
pnpm imports:validate
pnpm app:doctor
```

The validator scans application relative imports and rejects direct relative
imports of the root SDK entry.
