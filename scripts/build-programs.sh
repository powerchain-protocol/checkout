#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPOSITORY_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPOSITORY_ROOT"

mkdir -p target/deploy target/idl

has_command() {
  command -v "$1" >/dev/null 2>&1
}

if has_command cargo-build-sbf; then
  echo "Building PowerPay programs with cargo-build-sbf."
  cargo build-sbf \
    --manifest-path programs/powerpay/Cargo.toml \
    --sbf-out-dir target/deploy
  cargo build-sbf \
    --manifest-path programs/powerchain/Cargo.toml \
    --sbf-out-dir target/deploy
  exit 0
fi

if has_command cargo-build-bpf; then
  echo "Building PowerPay programs with cargo-build-bpf."
  cargo build-bpf \
    --manifest-path programs/powerpay/Cargo.toml \
    --bpf-out-dir target/deploy
  cargo build-bpf \
    --manifest-path programs/powerchain/Cargo.toml \
    --bpf-out-dir target/deploy
  exit 0
fi

if has_command cargo; then
  echo "Solana SBF toolchain not found; running Rust host checks only." >&2
  cargo check --workspace
  exit 0
fi

echo "Cargo and the Solana SBF toolchain are not installed." >&2
echo "Skipping binary compilation and running structural program validation." >&2

node "$REPOSITORY_ROOT/scripts/validate-program-layer.mjs"
node "$REPOSITORY_ROOT/scripts/validate-program-registry.mjs"

cat <<'EOF'

PowerPay program sources are structurally valid, but no Rust/Solana binaries
were produced.

Install Rust:
  curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

Then install the Solana CLI/SBF tools and run:
  npm run build:programs
EOF

exit 0
