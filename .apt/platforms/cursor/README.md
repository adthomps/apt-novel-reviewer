---
title: Cursor Adapter
kind: platform-adapter
status: draft
owner: APT
last_updated: 2026-09-06
domain: platforms
source_paths: ["apt-principles-agents/platforms/cursor/README.md"]
---

# Cursor Adapter

Adapters expose canonical assets in tool-native locations; they do not fork doctrine. Preserve project-owned instructions and review collisions before installation.

Cursor project skills live under `.cursor/skills/`. Cursor rules live under `.cursor/rules/`. Cursor hooks live under `.cursor/hooks.json`. Product-owned hooks and critic locks belong in the **product repo**, not as a second copy of Working Backwards templates.

Vendor model slugs belong only in [the dated Cursor model map](source/routing/cursor-model-map.md). Principles and the capability matrix stay tier-based.

## Session operating layer

Installable when the `cursor` platform is selected:

| Source | Target |
| --- | --- |
| `source/skills/clarify-before-acting/SKILL.md` | `.cursor/skills/clarify-before-acting/SKILL.md` |
| `source/skills/apt-session-router/SKILL.md` | `.cursor/skills/apt-session-router/SKILL.md` |
| `source/skills/working-backwards-critic/SKILL.md` | `.cursor/skills/working-backwards-critic/SKILL.md` |
| `source/rules/apt-session-operating.mdc` | `.cursor/rules/apt-session-operating.mdc` |
| `source/routing/cursor-model-map.md` | `.cursor/routing/cursor-model-map.md` |

Canonical clarify procedure stays in `skills/thinking/clarify-before-acting/`. The Cursor skill is a thin wrapper that tells the agent to ask, then stop.

The always-on rule is short: clarify gate → task packet → cheapest sufficient Task model → Working Backwards before requirements → do not implement from an unapproved package.

Do not overwrite a drifted product copy of the critic skill. Commerce and other products keep their lock and hook.

## Working Backwards critic

Canonical sources:

- `templates/working-backwards/critic-rubric.json`
- `templates/working-backwards/agent-role-contracts.md`

A product may add:

1. A **critic skill** that loads those files, reads the package in stage order, and writes only `critic-review.md` and `session.json`.
2. An **edit-guard hook** that, while critic mode is on, denies edits to writer artifacts (press release, FAQs, requirements, handoff, readiness).

Rules:

- Independence is a **new session**, not a different model.
- Hooks may guard or remind. Hooks must **never** write `PASS`.
- Do not copy the rubric into `apps/` or other runtime source.

Reference implementation (product, not doctrine): `apt-commerce` `.cursor/skills/working-backwards-critic/` and `.cursor/hooks/wb-critic-guard.mjs`. This adapter ships only a stub.

## Improvement notes

- Extend `critic-rubric.json` with engineering-handoff and readiness dimensions so product critics are not inventing those gates.
- Document how `sessionStart` / `stop` hooks should fail open so a stale lock cannot block writers after a crashed critic session.
- Refresh `source/routing/cursor-model-map.md` when the Cursor Task allowlist changes.
