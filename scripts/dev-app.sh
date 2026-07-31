#!/usr/bin/env sh
set -eu
SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPOSITORY_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"
cd "$REPOSITORY_ROOT"
exec node "$REPOSITORY_ROOT/scripts/run-vite-safe.mjs" "$@"
