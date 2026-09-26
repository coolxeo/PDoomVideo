# Claude Code runbook (Opus 5.5 and friends)

## Before the run

1. Weekly limit OK (`claude usage`).
2. Skill visible: `~/.claude/skills/code-animation` → this folder (symlink).
3. Working directory: repo root (`PDoomVideo`).
4. BRIEF.md written for the session goal.

## Prompt shape

```text
Read skills/code-animation/SKILL.md and Level 1–3 as needed.
Implement BRIEF.md. JS/HTML only. No Blender. No cast sprites.
Prove with stills at the listed times. Do not commit out/. Write DONE.md.
```

## After the run

1. Review stills.
2. Commit skill/code changes only.
3. Open or update PR.
4. Note token/week usage for Dani.
