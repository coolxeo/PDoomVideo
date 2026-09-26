---
name: code-animation
description: >
  Use for Little Acorn Nest code-drawn animation in the browser (JS/HTML only):
  Chestnut world stills, loops, meadow chapters, style experiments, headless still
  bakes, and show pipelines. Entry for soft-felt watercolor (p5/p5.brush), and for
  choosing among curated experimental styles inspired by public code-art references.
  Also use when Claude Code / Cursor / any frontier model should author deterministic
  canvas animation without Blender or image sprites for cast. Read Level 1 before
  drawing; Level 2 before picking a look; Level 3 before a multi-beat show.
metadata:
  owner: coolxeo
  brand: Little Acorn Nest
  stack: javascript-html-browser
  no: blender,native-apps,cast-sprites
---

# LAN code-animation

Browser-only animation for **Little Acorn Nest** (Chestnut world). Every picture is
functions + time. Same source redraws the same frame. No Blender. No cast sprites.
Optional three.js only for a named experimental style, never as the default.

This skill is **ours**. Public references (anidoodle styles catalog, PDoomVideo
engine patterns, posts) live under `references/sources.md`. We learn from them and
keep a single LAN house style plus a menu of experiments.

## Three levels (always)

| Level | When | Read |
| --- | --- | --- |
| **1 Foundations** | Any draw, still bake, timing, headless Chrome | `references/level-1-foundations/` |
| **2 Styles** | Choosing or inventing a look for Chestnut world | `references/level-2-styles/` |
| **3 Show pipeline** | Multi-beat film / chapter show with cast lock | `references/level-3-show-pipeline/` |

Start at the lowest level the request needs. A style plate still needs Level 1.
A meadow show needs all three.

## Hard laws

1. **JS + HTML in the browser.** Node is fine for bake scripts that drive Chrome.
2. **Cast is code.** Chestnut, unnamed white bunny, unnamed yellow duckling are
   drawers (`chestnut`, `bunny`, `duckling`), not PNGs.
3. **One house style + experiments.** Default LAN look is **soft-felt** (watercolor
   wash + ink). Other styles are explicit experiments, never silent palette swaps.
4. **Deterministic frames.** Pure in `(t, seed, env)`. No wall clock in the paint
   path. Prefer seeded RNG.
5. **Prove on ONE still**, then extend. Detail-pass faces, paws, joins.
6. **Cast lock on Soft Montessori shows:** only the trio unless Dani unlocks guests.
7. **Mood:** calm, unhurried toddler. No slapstick, no doom energy on LAN shows.
8. **No media commits.** Bake stills locally; link or attach, do not git large frames.
9. **Frontier-model friendly.** Spec first (brief → loop → screens), then code.
   Works with Opus 5.5, Claude Code, Cursor agents, Grok. Same files.

## Intake (one question at a time)

1. What are we making? (still / loop / chapter opener / full show / style plate)
2. Which style id? (default `soft-felt` — show `references/level-2-styles/INDEX.md`)
3. Shape? (16:9 studio default, or 9:16 / 1:1)
4. Duration or still time codes?
5. Cast lock confirm (trio only: yes/no)

If the human says "you pick", pick `soft-felt`, 16:9, and say why in one line.

## Repo map (this project)

| Path | Role |
| --- | --- |
| `src/core.js` | `PAL`, wash/ink helpers |
| `src/chestnut.js` | `chestnut()` |
| `src/cast.js` | `bunny()`, `duckling()`, aliases |
| `src/clawd.js` | `clawd()` → chestnut alias |
| `src/props.js` | `feltBall()` and props |
| `src/ch/*.js` | chapters |
| `src/timeline.js` | chapters, `quiet`, wipes |
| `studio.html` | script load order |
| `render.mjs` | headless stills / encode via Chrome |

## Agent checklist

- [ ] Read the level folder(s) for this job
- [ ] Write or update a short `BRIEF.md` before large edits
- [ ] Prefer aliases so old chapters keep running
- [ ] Keep watercolor fills on big shapes only (perf)
- [ ] Serve studio over `http://127.0.0.1:8765` (not `file://`) for headless
- [ ] Proof stills at key beats; do not commit them
- [ ] Name style id in the brief and in chapter comments

## Scripts

- `scripts/serve-studio.sh` — static server on 8765
- `scripts/bake-stills.sh` — wrap `render.mjs` stills
- Repo root `scripts/link-claude-skill.sh` — symlink this skill into Claude Code

## Sources

Credit and learn-from list: `references/sources.md`.
