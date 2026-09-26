# Level 2 — Styles menu (Chestnut world)

Pick a **style id**. Default for LAN product: `soft-felt`.

Experiments borrow **ways of making marks** from public code-art references
(especially [anidoodle](https://github.com/alexgreensh/anidoodle) style ideas).
We do **not** vendor their engine. We re-express the idea in our stack.

## House style

| id | Engine | Notes |
| --- | --- | --- |
| `soft-felt` | p5 + p5.brush | Cream felt, moss meadow, wash + ink. **Ship default.** Palette: `assets/palettes/soft-felt.json` |

## Experimental menu (opt-in)

Each experiment must change **medium, edge, and mark order**, not only hex codes.

| id | Idea (learn-from) | Stack hint | When to try |
| --- | --- | --- | --- |
| `pencil-wash` | Pencil + watercolour plates | p5 wash light→dark then ink | Soft storybook stills |
| `marker-comic` | Flat cel + heavy contour | p5 flat fills | Short loops, stickers |
| `cut-paper` | Torn/cut collage, no pencil line | layered paths | Title cards |
| `riso-spot` | Misregistered spot colours | dual-pass fills | Poster stills |
| `pixel-16` | Fixed 16-colour grid | canvas nearest-neighbour | Toy moments (sparingly) |
| `sumi-stroke` | One loaded brush | few wet strokes | Calm night beats |
| `flat-vector` | Crisp planes + grain | SVG or canvas paths | UI-adjacent mascots |
| `low-poly-lite` | Flat-shaded triangles | **optional** three.js | One hero still only; keep light |

### three.js rule

Allowed only for `low-poly-lite` (or a future named 3D experiment). No Blender.
No GLTF pipeline required for v1. Prefer baking a still, not a full show, until
the look clears a craft gate.

## Style definition checklist

For every style id, keep a short plate file under this folder:

1. Mark order (what is drawn first)
2. Edge behaviour (soft bleed vs hard contour)
3. Palette tokens
4. Forbidden moves (e.g. photoreal fur on soft-felt)
5. One proof still time code after implementation

See `soft-felt.md` as the template.
