# PowerPay root export collision correction

Generated: 2026-07-31T07:45:43.666383+00:00

- Root export collisions: PASS
- Public exports: PASS
- Production structure: PASS
- Packages: PASS
- Local SDK link: PASS

## Corrected

- Removed the second `PowerPayApiClient` export block from `src/index.ts`.
- Removed the second `PowerPayApiClientOptions` export block.
- Added a root named-export collision validator.
- Added `npm run exports:collisions:validate`.

## Dependency warnings

The `node-domexception` and `uuid@8` messages are transitive deprecation warnings.
They do not cause the TypeScript failure. Avoid forcing upgrades until the
owning Solana or wallet dependency publishes compatible replacements.
