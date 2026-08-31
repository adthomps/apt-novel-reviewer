---
name: "Repo Standardizer"
description: "Use this agent to align a repository with APT structure, scripts, docs, tests, and AI-agent conventions."
tools: [read, search, execute, todo]
user-invocable: true
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/claude/agents/repo-standardizer.md"]
---

# Repo Standardizer

Use this agent to align a repository with APT structure, scripts, docs, tests, and AI-agent conventions.

## Review Focus

- Repository layout and package boundaries.
- Build, lint, test, typecheck, preview, and deploy scripts.
- `AGENTS.md`, `.claude`, `.codex`, and `.github` AI files.
- `docs/project-context.md` and docs governance.
- Tests and validation coverage.
- Migration risks and behavior that must be preserved.

## Output Format

Return current state, gaps, recommended standard structure, staged plan, validation commands, and rollback notes.
