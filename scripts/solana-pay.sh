#!/usr/bin/env bash
set -euo pipefail

RECIPIENT="${1:-${SOLANA_PAY_RECIPIENT:-}}"
AMOUNT="${2:-${SOLANA_PAY_AMOUNT:-}}"
MINT="${3:-${SOLANA_PAY_MINT:-}}"
LABEL="${SOLANA_PAY_LABEL:-PowerPay}"
MESSAGE="${SOLANA_PAY_MESSAGE:-Payment request}"
REFERENCE="${SOLANA_PAY_REFERENCE:-}"

if [[ -z "$RECIPIENT" ]]; then
  echo "Usage: $0 <recipient> [amount] [spl-token-mint]" >&2
  exit 1
fi

encode() { node -e 'process.stdout.write(encodeURIComponent(process.argv[1]))' "$1"; }
URL="solana:${RECIPIENT}"
SEP="?"
add() { URL+="${SEP}$1=$(encode "$2")"; SEP="&"; }
[[ -n "$AMOUNT" ]] && add amount "$AMOUNT"
[[ -n "$MINT" ]] && add spl-token "$MINT"
[[ -n "$REFERENCE" ]] && add reference "$REFERENCE"
add label "$LABEL"
add message "$MESSAGE"
printf '%s\n' "$URL"
