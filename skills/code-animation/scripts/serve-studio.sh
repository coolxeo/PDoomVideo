#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"
cd "$ROOT"
PORT="${PORT:-8765}"
if curl -sf "http://127.0.0.1:${PORT}/studio.html" >/dev/null 2>&1; then
  echo "studio already up on :${PORT}"
  exit 0
fi
python3 -m http.server "$PORT" >/tmp/pdoom-studio-${PORT}.log 2>&1 &
echo $! >/tmp/pdoom-studio-${PORT}.pid
sleep 0.5
echo "studio http://127.0.0.1:${PORT}/studio.html (pid $(cat /tmp/pdoom-studio-${PORT}.pid))"
