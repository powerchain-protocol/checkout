#!/usr/bin/env bash
set -euo pipefail
mkdir -p target/deploy target/idl
if command -v cargo-build-sbf >/dev/null 2>&1; then
  cargo build-sbf --manifest-path programs/powerpay/Cargo.toml --sbf-out-dir target/deploy
  cargo build-sbf --manifest-path programs/powerchain/Cargo.toml --sbf-out-dir target/deploy
elif command -v cargo-build-bpf >/dev/null 2>&1; then
  cargo build-bpf --manifest-path programs/powerpay/Cargo.toml --bpf-out-dir target/deploy
  cargo build-bpf --manifest-path programs/powerchain/Cargo.toml --bpf-out-dir target/deploy
else
  echo "Solana SBF toolchain not found; running host checks only." >&2
  cargo check --workspace
fi
