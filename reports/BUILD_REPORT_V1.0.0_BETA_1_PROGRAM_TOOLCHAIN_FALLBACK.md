# PowerPay program toolchain fallback report

Generated: 2026-07-31T06:51:34.181022+00:00

- Build script validator: PASS
- Toolchain doctor: PASS
- Program build: PASS
- Program layer: PASS
- Program registry: PASS

## Corrected

- `build:programs` no longer invokes Cargo when Cargo is missing.
- Solana SBF, legacy BPF, Cargo-only, and no-Cargo environments are handled explicitly.
- No-Cargo environments run structural program validation and exit successfully.
- Program check and test commands now have the same safe fallback.
- Added a program toolchain doctor and build-script validator.
