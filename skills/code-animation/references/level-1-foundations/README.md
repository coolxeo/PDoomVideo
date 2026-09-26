# Level 1 — Foundations

Browser canvas animation for LAN. Read this before any draw.

## Stack we ship

- **Default engine:** p5.js + p5.brush (this repo), watercolor wash + ink outline.
- **Host page:** `studio.html` loads core → cast → chapters → timeline.
- **Time:** chapters register `(name, start, end, shots, opts)`. Prefer `opts.quiet`
  to hide karaoke for Soft Montessori openers.
- **Bake:** `render.mjs` + system Chrome. On sandboxed Linux use SwiftShader flags
  already patched in this fork. Serve via HTTP, never `file://` (WebGL crash risk).

## Timing model

- Think in **seconds on the timeline**, not wall clock.
- One calm shot beats cutting every 0.5s for toddler mood.
- Wipe / transition colors should match the style palette (meadow → moss, not neon).

## Drawing contract

```text
draw(t, env) -> pixels
```

- `t` is media time (seconds) or frame index derived from fps.
- `env` holds size, seed, reduced-motion, optional input log for interactive pieces.
- No `Date.now()` inside paint. Seed with a fixed seed for stills.

## Cast API (soft-felt)

| Fn | Who |
| --- | --- |
| `chestnut(x,y,u,o)` | Felt hedgehog lead |
| `bunny(x,y,s,o)` | Unnamed white bunny |
| `duckling(x,y,s,o)` | Unnamed yellow duckling |
| `feltBall(x,y,r,spin,o)` | Soft striped ball |
| `clawd` / `researcher` | Aliases → chestnut / bunny |

Share option vocabulary with legacy clawd where possible (`eyes`, `mouth`, `aL`/`aR`,
`walk`, `dy`, `sq`, `rot`, `flip`, `blush`, `noShadow`, `emote`).

## Performance tricks (learned on SwiftShader)

1. Watercolor **fills** are the expensive part. Limit to big character mounds and a
   few background washes.
2. Flat wash + ink for small features (eyes, paws, beak).
3. Meadow frames ~20–30s/frame under SwiftShader is acceptable vs lab baseline.
4. One WebGL `uniform1i` warning on first meadow load can be harmless if frames OK.

## Headless bake

```bash
# from repo root
./skills/code-animation/scripts/serve-studio.sh   # if not already up
./skills/code-animation/scripts/bake-stills.sh 1.5,2.6,4.6,6.9,7.6 out/lan
```

Chrome path on this box: `/usr/bin/google-chrome`.

## First win

1. Studio loads (`window.ready`).
2. Still at a known time shows the intended cast.
3. Detail-pass faces and joins on a crop before adding more chapters.
