#!/usr/bin/env bash
set -euo pipefail
LOG="${TMPDIR:-/tmp}/powerpay-validator.log"
solana-test-validator --reset --quiet >"$LOG" 2>&1 & PID=$!
trap 'kill $PID 2>/dev/null || true' EXIT
for _ in {1..30}; do solana cluster-version --url http://127.0.0.1:8899 >/dev/null 2>&1 && break; sleep 1; done
bash scripts/deploy-programs.sh localnet
npm run test:sdk
