---
title: Cursor Model Map
kind: platform-adapter
domain: platforms
status: draft
owner: APT
last_updated: 2026-09-06
source_paths: ["apt-principles-agents/platforms/cursor/source/routing/cursor-model-map.md"]
---

# Cursor Model Map

Dated, replaceable mapping from APT capability tiers and task classes to current Cursor Task allowlist slugs. Refresh this file when Cursor's allowlist changes. Do not copy these slugs into principles, standards, or the capability matrix.

Allowlist observed 2026-09-06: `inherit`, `claude-opus-5-thinking-high`, `composer-2.5-fast`, `cursor-grok-4.6-medium`, `gpt-5.6-sol-medium`.

| Task class | APT tier | Cursor Task slug | Notes |
| --- | --- | --- | --- |
| Read / explore / grep / inventory | Tier 1 | `composer-2.5-fast` | Use `explore` or `generalPurpose`. Prefer deterministic search first. |
| Request classification / task packet | Tier 1 | `composer-2.5-fast` or parent | Do not escalate because later work is harder. |
| Design / Working Backwards / architecture | Tier 2 or 3 | Parent Plan mode or `cursor-grok-4.6-medium` | Use `claude-opus-5-thinking-high` only for high-risk payments, security, or doctrine. |
| Implementation / code changes | Tier 2 | `inherit` or `cursor-grok-4.6-medium` | Do not attach a frontier model to rewrite a file a mid-tier can change. |
| Targeted tests / verification | Tier 2 | `inherit` or `cursor-grok-4.6-medium` | Command output is evidence. |
| Complex regressions / flaky cross-system failures | Tier 3 | `cursor-grok-4.6-medium` or `claude-opus-5-thinking-high` | Escalate only the failing slice. |
| Security / final independent review | Tier 3 | `claude-opus-5-thinking-high` | Humans still approve. Never let a model issue `PASS` on Working Backwards. |

## Rules

- Parent chat: if direction is unclear, ask and stop. Do not spawn expensive subagents first.
- Mixed sessions split by class. A frontier design step does not keep later reads or edits on that model.
- `inherit` means the parent model. Prefer it for implementation after a cheaper explore pass.
- If a requested slug is not in the current allowlist, use `inherit` and record the fallback.
