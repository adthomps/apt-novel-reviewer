---
title: apt-novel-reviewer Project Profile
version: v1
last_updated: 2026-04-26
owner: APT
status: draft
---

# apt-novel-reviewer Project Profile

## Context

`apt-novel-reviewer` is a local-first desktop app for manuscript analysis and comparison. It combines Electron, SQLite, and Ollama to run structured review modes over imported `.docx` manuscripts while keeping the workflow offline and operator-controlled.

## Schema-Compatible Profile Data

```yaml
project: apt-novel-reviewer
purpose: Local-first desktop manuscript review app that imports `.docx` manuscripts, runs structured local review modes, and tracks findings across versions.
audience:
  - authors
  - editors
  - manuscript reviewers
  - APT builders
adoption_mode: apply
principles_demonstrated:
  - thinking
  - architecture
  - system-standards
  - execution
  - quality-testing
  - knowledge-system
  - ai-agent-framework
architecture_pattern: Electron desktop app with shared parsing/domain packages, local SQLite persistence, and Ollama-based review execution
ai_agent_usage: Local Ollama review modes with JSON validation and explicit non-chat scope boundaries
security_model: Local-first execution with no cloud AI dependency, desktop preload boundaries, and operator-controlled manuscript storage
learning_value: Demonstrates how APT can govern a local AI-assisted desktop workflow without drifting into chat-assistant ambiguity
reusable_artifacts:
  - local review-mode scope boundaries
  - structured JSON validation flow
  - manuscript diff and finding comparison logic
  - desktop architecture split across app and shared packages
maturity: active
showcase:
  include: true
  summary: Local-first APT desktop product showing structured AI-assisted review, strict scope boundaries, and operator-visible outputs.
```

## Related Documents

- `adoption.md`
- `references/project-profile.json`
- `reports/apt-principles-audit-2026-04-26.md`
