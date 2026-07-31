# npm Install-Script Policy

PowerPay uses npm's project-level `allowScripts` field with strict enforcement.

## Why the warning appeared

Recent npm versions require each dependency lifecycle script to be explicitly
approved or denied. The previous `.npmrc` entries such as
`allow-scripts.esbuild=true` were not the repository's authoritative
project-level policy, so npm continued to report unreviewed packages.

The authoritative decisions now live in:

```text
package.json#allowScripts
```

The rationale is maintained in:

```text
packages/config/install-scripts-policy.json
```

## Approved scripts

Only installation scripts required to build PowerPay are approved:

| Package | Reason |
|---|---|
| `esbuild` | Installs and verifies the platform compiler required by Vite |
| `prisma` | Supports Prisma CLI installation and generation |
| `@prisma/engines` | Installs Prisma engine binaries |
| `protobufjs` | Generates protobuf runtime helpers |

## Explicitly denied scripts

Optional native accelerators are denied because their dependencies provide
JavaScript fallbacks:

- `bigint-buffer`
- `tiny-secp256k1`
- `blake-hash`
- `bufferutil`
- `utf-8-validate`

Hardware-specific `usb` compilation is also denied by default.

Registry-package `prepare` hooks used for maintainer builds, Husky, Yarn,
Lefthook, Grunt, or repository compilation are denied. Published packages
should already include their distributable output; consumer installation must
not execute maintainer tooling.

## Commands

Validate policy:

```bash
npm run install:scripts:validate
```

Print decisions and reasons:

```bash
npm run install:scripts:review
```

Ask npm for unreviewed scripts:

```bash
npm run install:scripts:list
```

Rebuild approved packages after changing policy:

```bash
npm run install:scripts:rebuild
```

## Adding a dependency

1. Install the dependency.
2. Run `npm install-scripts ls`.
3. Review the exact lifecycle script.
4. Decide whether it is required for PowerPay runtime or build output.
5. Add `true` or `false` to root `package.json#allowScripts`.
6. Add the rationale to the configuration workspace policy.
7. Run both policy validators.

Never approve a package solely to remove a warning.
