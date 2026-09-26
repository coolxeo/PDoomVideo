#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"
STILLS="${1:-1.5}"
OUT="${2:-out/lan}"
CHROME="${CHROME:-/usr/bin/google-chrome}"
"$(dirname "$0")/serve-studio.sh"
mkdir -p "$OUT"
node render.mjs --chrome="$CHROME" --stills="$STILLS" --out="$OUT"
echo "stills -> $OUT"
