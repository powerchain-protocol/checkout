#!/usr/bin/env bash
set -euo pipefail
CLUSTER="${1:-localnet}"
case "$CLUSTER" in localnet) URL="http://127.0.0.1:8899";; devnet|testnet|mainnet-beta) URL="$CLUSTER";; *) URL="$CLUSTER";; esac
bash scripts/build-programs.sh
for PROGRAM in powerpay powerchain; do
  SO="target/deploy/${PROGRAM}_program.so"
  KEYPAIR="target/deploy/${PROGRAM}_program-keypair.json"
  [[ -f "$SO" ]] || { echo "Missing $SO" >&2; exit 1; }
  [[ -f "$KEYPAIR" ]] || solana-keygen new --no-bip39-passphrase --silent --force -o "$KEYPAIR"
  solana program deploy "$SO" --program-id "$KEYPAIR" --url "$URL"
done
node scripts/sync-program-ids.mjs
