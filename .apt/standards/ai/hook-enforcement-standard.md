---
title: Hook Enforcement Standard
version: v1
last_updated: 2026-08-30
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles-agents/standards/ai/hook-enforcement-standard.md"]
---

# Hook Enforcement Standard

Hooks turn advisory doctrine into enforced gates: they are how a harness stage is
actually made unskippable in a tool that supports them (Claude Code today).
Because a hook is code that runs on every matching tool call, and a distributed
hook runs on every contributor's machine, hooks carry their own contract.

## What a hook may do

- Enforce that a gate ran, that a file is canonically managed, or that
  validation passed — binary, checkable facts.
- Inject compact context (a domain's context pack, the principle/agent
  crosswalk) at `UserPromptSubmit`.
- Record evidence at `SubagentStop` / `Stop`.

## What a hook must not do

- Judge review *quality* — that is the agent's job. A hook checks "was the
  review run", not "was it good".
- Make a network call, or any slow (>~200 ms typical) or non-deterministic
  operation, in `PreToolUse`.
- Fail closed on its own infrastructure error. A hook that cannot parse its
  input, read a file, or run a subprocess **allows** the action and logs why.
  It fails closed only on an actual policy match.

## Distribution and review

- Canonical hooks live in `hooks/`. `apt-assets.mjs` installs `hooks/<name>.mjs`
  into a claude target's `.claude/hooks/<name>.mjs`, hash-tracked in
  `installation.json` like any managed file.
- A hook is reviewed like a dependency: it is code that will run unattended in
  every consumer. Changes go through the same review as `scripts/`.
- `settings.json` distributes only the non-destructive `SessionStart` notice by
  default. The blocking `PreToolUse` guards and the `Stop` gate are opt-in per
  repo — a maintainer adds the `hooks` entry once they accept the behavior.

## The hook set

| Hook | Event | Default | Effect |
| --- | --- | --- | --- |
| `session-sync-check.mjs` | SessionStart | distributed | Prints a notice if the repo is behind canonical or has untracked agents. Never blocks. |
| `pretooluse-managed-file-guard.mjs` | PreToolUse (Edit\|Write\|MultiEdit) | opt-in | Blocks writes to `.apt/**`, generated adapters, installed `.claude/agents/**`, generated catalogs — points at the canonical source. Fails open. |
| `pretooluse-bash-guard.mjs` | PreToolUse (Bash) | opt-in | Blocks deploy / publish / force-push / `curl \| sh` / `.env` reads unless `APT_APPROVED=1`. Fails open. |
| `stop-verify-gate.mjs` | Stop | opt-in | If the dirty tree touches an enforceable domain, prints which reviews the change implies. Blocks only when `APT_STOP_GATE=block`. |
| `subagentstop-evidence.mjs` | SubagentStop | opt-in | Appends each sub-agent's final message to `.apt/council-evidence/<session>.md`. Never blocks. |

## Per-repo activation

```jsonc
// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit",
        "hooks": [{ "type": "command", "command": "node .claude/hooks/pretooluse-managed-file-guard.mjs" }] },
      { "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "node .claude/hooks/pretooluse-bash-guard.mjs" }] }
    ],
    "Stop": [{ "hooks": [{ "type": "command", "command": "node .claude/hooks/stop-verify-gate.mjs" }] }],
    "SubagentStop": [{ "hooks": [{ "type": "command", "command": "node .claude/hooks/subagentstop-evidence.mjs" }] }]
  }
}
```

## Other platforms

Codex, Cursor, and generic runners have no hook engine. The same policies ship
there as a pre-commit config and a CI job that call the equivalent checks
(`apt-assets.mjs scan`, `npm run check`) on the merge path. Same policy,
different trigger surface.

## Related

- `agent-harness-standard.md`
- `ai-orchestration-standard.md`
- `../../principles/ai/agent-design.md`
- `../../docs/plan-gates.md`
