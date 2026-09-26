#!/usr/bin/env bash
# Symlink the repo skill into Claude Code's user skills dir without duplicating files.
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${REPO_ROOT}/skills/code-animation"
DEST_DIR="${HOME}/.claude/skills"
DEST="${DEST_DIR}/code-animation"

[ -f "${SRC}/SKILL.md" ] || { echo "ERROR: missing ${SRC}/SKILL.md" >&2; exit 1; }
mkdir -p "${DEST_DIR}"

if [ -L "${DEST}" ] || [ -e "${DEST}" ]; then
  rm -rf "${DEST}"
fi
ln -sfn "${SRC}" "${DEST}"
echo "linked ${DEST} -> ${SRC}"
ls -la "${DEST}/SKILL.md"
