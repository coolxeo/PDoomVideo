# Headless Chrome notes

## Why HTTP

`file://` studio can crash Chromium WebGL in headless. Always:

```bash
python3 -m http.server 8765
# studio: http://127.0.0.1:8765/studio.html
```

## Flags used on sandboxed boxes

This fork’s `render.mjs` enables SwiftShader / unsafe SwiftShader and `--no-sandbox`
when needed. Prefer those over inventing new flag sets.

## Still vs encode

- **Stills first** for craft gates.
- Full encode only after cast + timing sign-off.
- Do not commit `out/` frames.
