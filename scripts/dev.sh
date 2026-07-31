#!/usr/bin/env sh
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPOSITORY_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"

if [ ! -f "$REPOSITORY_ROOT/package.json" ]; then
  printf >&2 'PowerPay repository not found at %s\n' "$REPOSITORY_ROOT"
  exit 1
fi

cd "$REPOSITORY_ROOT"
printf 'PowerPay development root: %s\n' "$REPOSITORY_ROOT"

exec node "$REPOSITORY_ROOT/scripts/run-vite-safe.mjs" "$@"
