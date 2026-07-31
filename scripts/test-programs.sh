#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPOSITORY_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPOSITORY_ROOT"

if command -v cargo >/dev/null 2>&1; then
  exec cargo test --workspace
fi

echo "Cargo is unavailable; program tests are limited to structural validation." >&2
node scripts/validate-program-layer.mjs
node scripts/validate-program-registry.mjs
