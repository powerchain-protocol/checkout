#!/usr/bin/env bash
set -euo pipefail
TYPE="${1:-}"
MINT="${2:-${VITE_POWERPAY_TOKEN_MINT:-}}"
PROGRAM="TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnK8w4KkKZf5"
if [[ "$TYPE" != "mint" && "$TYPE" != "freeze" ]]; then echo "Usage: $0 mint|freeze <mint>" >&2; exit 1; fi
if [[ -z "$MINT" ]]; then echo "Mint address required" >&2; exit 1; fi
echo "WARNING: revoking $TYPE authority is permanent. Mint: $MINT"
read -r -p "Type REVOKE to continue: " CONFIRM
[[ "$CONFIRM" == "REVOKE" ]] || { echo "Cancelled"; exit 1; }
spl-token authorize "$MINT" "$TYPE" --disable --program-id "$PROGRAM"
