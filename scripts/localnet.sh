#!/usr/bin/env bash
set -euo pipefail
LEDGER="${POWERPAY_LEDGER:-.test-ledger}"
exec solana-test-validator --reset --ledger "$LEDGER" --rpc-port 8899 --faucet-port 9900
