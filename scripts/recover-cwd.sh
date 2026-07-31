#!/usr/bin/env sh
set -eu

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPOSITORY_ROOT="$(CDPATH= cd -- "$SCRIPT_DIR/.." && pwd)"

if [ ! -d "$REPOSITORY_ROOT/app" ] || [ ! -f "$REPOSITORY_ROOT/package.json" ]; then
  printf >&2 'PowerPay repository is incomplete at %s\n' "$REPOSITORY_ROOT"
  exit 1
fi

cd "$REPOSITORY_ROOT"
printf 'Recovered PowerPay working directory: %s\n' "$REPOSITORY_ROOT"

if [ "$#" -gt 0 ]; then
  exec "$@"
fi

exec "${SHELL:-/bin/sh}"
