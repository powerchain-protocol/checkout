# Build report

Build date: 2026-07-31

## Completed

- TypeScript SDK compiled successfully to `dist/` with TypeScript 5.8.3.
- Declaration files were generated.
- All shell scripts passed `bash -n` syntax validation.
- PowerPay and PowerChain program sources were upgraded with versioned state, stricter ownership/account checks, checked arithmetic, merchant pause controls, deterministic merchant-scoped payment PDAs, explicit fee treasury settlement, and expanded client instruction builders.

## Environment limitation

The container does not include Rust, Cargo, the Solana CLI, or `cargo build-sbf`. Therefore `.so` SBF artifacts could not be produced here. The source workspace and build scripts are included and ready for a Solana/Agave development machine.

The internal npm mirror also did not expose `@solana/spl-token`, so the checked-in `dist/` build was generated with compile-time-only local type shims. Runtime imports remain the official packages declared in `package.json`; install them from a normal npm registry before executing the SDK.

## Production build

```bash
npm install
npm run build:sdk
cargo test --workspace
npm run build:programs
```
