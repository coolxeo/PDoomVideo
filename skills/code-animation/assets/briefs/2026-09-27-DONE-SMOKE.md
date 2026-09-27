# DONE-SMOKE — 2026-09-27 Sunday smoke

## Result
**PASS.** Skill linked; two soft-felt meadow stills baked; trio (Chestnut, white bunny, yellow duckling) visible at both times.

## Setup
- Repo: re-cloned (park path missing) → `https://github.com/coolxeo/PDoomVideo.git` @ `0888612` (`main`)
- Path: `/workspace/pdoom/PDoomVideo`
- Claude auth: `coolxeo@gmail.com` (Pro, loggedIn, claude.ai) — no re-login
- Skill symlink: `~/.claude/skills/code-animation` → `/workspace/pdoom/PDoomVideo/skills/code-animation` via `./scripts/link-claude-skill.sh`
- `npm install` (puppeteer-core + p5); Chrome `/usr/bin/google-chrome`

## Commands
```bash
./scripts/link-claude-skill.sh
./skills/code-animation/scripts/bake-stills.sh "1.5,6.9" out/lan-smoke
```

## Outputs
| Time | File | Size | Dims |
| --- | --- | --- | --- |
| 1.5s | `out/lan-smoke/t1_50.png` | ~4.0 MB | 1920×1080 RGBA |
| 6.9s | `out/lan-smoke/t6_90.png` | ~4.0 MB | 1920×1080 RGBA |

Absolute:
- `/workspace/pdoom/PDoomVideo/out/lan-smoke/t1_50.png`
- `/workspace/pdoom/PDoomVideo/out/lan-smoke/t6_90.png`

## Issues (non-blocking)
- Park `/workspace/shared/temp/pdoom-PDoomVideo-nested-clone-2026-09-26/` was gone; re-cloned instead of restore.
- Page console: one 404 resource during studio load; WebGL `uniform*` INVALID_OPERATION warnings under SwiftShader (ANGLE Vulkan SwiftShader). Still bake succeeded.
- No Claude Code usage for this smoke (direct `bake-stills.sh` / `render.mjs` was enough). Claude Pro quota unused for the bake.
- `out/` not committed (gitignored / per brief).

## Not done
- No git push
- anidoodle left alone
