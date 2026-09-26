# Level 3 — Show pipeline

Turn a Designer brief into a code-drawn LAN show.

## Pipeline

```text
Brief → Cast lock → Style id → Core loop → Chapters → Quiet/audio → Proof stills → Ship
```

### 1) Brief

Capture: title, beats, mood, cast lock, style id, aspect, duration targets.
Example seed: Who Is Sleepy First Soft Montessori (play → sunset → … → sleep).

### 2) Cast lock

Soft Montessori: **Chestnut + white bunny + yellow duckling only**.
Aliases keep older P(doom) chapters alive, but guest clawd-bodies will look like
tinted hedgehogs until those chapters are restaged.

### 3) Core loop (one sentence)

Example meadow opener: pass the soft ball → title in sky → duckling yawns first.

### 4) Chapters

- New file under `src/ch/`.
- Register in `timeline.js` with start/end.
- Use `{ quiet: true }` when karaoke fights the mood.
- When two chapters overlap, shorter wins (meadow covers first seconds of lab).

### 5) Transitions

Move wipes to chapter boundaries. Soft moss colours for meadow→next.

### 6) Proof gates

| Gate | Proof |
| --- | --- |
| Look | One hard still, detail-pass |
| Cast | Trio visible, no guests |
| Timing | Stills at each beat listed in brief |
| Perf | Acceptable seconds/frame on target bake machine |

### 7) Ship

- Branch + PR (no large `out/` files)
- Attach stills in PR body or chat, not git
- Claude Code / Cursor must `@code-animation` or have the skill linked

## Restaging later beats

Designer beat sheets (sunset, bath, dinner, sleep) can be restaged as new
chapters in this stack. Keep one loop sentence per chapter. Do not port
photoreal Flow footage as sprites; re-express in the chosen style.
