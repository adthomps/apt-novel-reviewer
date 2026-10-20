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
- Every install also ships `.apt/git-hooks/pre-push` and sets `git config core.hooksPath .apt/git-hooks`.
  This is a git hook rather than an agent hook, so it covers pushes from a terminal, an IDE, or any
  agent tool. Install and sync leave `core.hooksPath` alone when it is already set, when the repo uses
  husky, or when it has its own `.git/hooks` scripts, and report `skipped-git-hooks`. `core.hooksPath`
  is local git config, so a fresh clone gets the gate on its first sync.
- `settings.json` distributes only the non-destructive `SessionStart` notice by
  default. The blocking `PreToolUse` guards and the `Stop` gate are opt-in per
  repo — a maintainer adds the `hooks` entry once they accept the behavior.

## The hook set

| Hook | Event | Default | Effect |
| --- | --- | --- | --- |
| `session-sync-check.mjs` | SessionStart | distributed | Prints a notice when a sync would change managed files (design first, then guidance), when files were edited locally, or when agents are untracked. It uses the same hash scan as the pre-push gate. Never blocks. |
| `git-hooks/pre-push` → `.apt/git-hooks/pre-push` | git pre-push | distributed to every install | Runs `.apt/bin/apt-check.mjs --mode push` ([apt-check](../../docs/apt-check.md): sync, profile, architecture). Blocks the push when the APT design is behind, or when a module set to level `error` goes over its baseline. Everything else only warns. Skips itself in CI and with `APT_SKIP_SYNC_CHECK=1`, and skips when apt-principles-agents can't be found. Bypass once with `git push --no-verify`. |
| `templates/ci/apt-check.yml` → `.github/workflows/apt-check.yml` | CI (push to main, pull request) | distributed to every install | Checks out apt-principles-agents and runs `apt-check --mode ci`, which adds the repo's `apt-design-check`. This is the gate `--no-verify` can't skip. |
| `pretooluse-managed-file-guard.mjs` | PreToolUse (Edit\|Write\|MultiEdit) | opt-in | Blocks writes to `.apt/**`, generated adapters, installed `.claude/agents/**`, generated catalogs — points at the canonical source. Fails open. |
| `pretooluse-bash-guard.mjs` | PreToolUse (Bash) | opt-in | Blocks deploy / publish / force-push / `curl \| sh` / `.env` reads unless `APT_APPROVED=1`. Fails open. |
| `stop-verify-gate.mjs` | Stop | opt-in | If the dirty tree touches an enforceable domain, prints which reviews the change implies. Blocks only when `APT_STOP_GATE=block`. |
| `subagentstop-evidence.mjs` | SubagentStop | opt-in | Appends each sub-agent's final message to `.apt/council-evidence/<session>.md`. Never blocks. |
| `pretooluse-wb-critic-guard.mjs` | PreToolUse (Edit\|Write\|MultiEdit) | opt-in | While `.wb-critic.lock` exists at the repo root, blocks edits to Working Backwards writer artifacts so an in-progress critic review cannot rewrite what it scores. Never writes PASS. Fails open. Installed by any claude target; enable in repos that use the `working-backwards` manifest. Script: `.claude/hooks/pretooluse-wb-critic-guard.mjs`. |

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
