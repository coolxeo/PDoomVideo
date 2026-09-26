# Running a style experiment

1. Copy `soft-felt.md` to `<id>.md` and rewrite mark order / edges.
2. Add palette JSON under `assets/palettes/<id>.json` if colours differ.
3. Implement drawers behind a style switch **or** a parallel chapter file.
   Prefer `opts.style = '<id>'` once the timeline supports it; until then, a
   dedicated `src/ch/cXX_<id>_plate.js` still is fine.
4. Bake one plate still. Critique faces and joins in writing.
5. Only then schedule a loop or show in that style.

Learn-from catalog (ideas only): anidoodle’s 31 style table in their README.
Credit in `references/sources.md`. Never paste their proprietary engine code.
