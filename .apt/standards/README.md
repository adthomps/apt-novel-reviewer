---
title: APT Standards Index
version: v1
last_updated: 2026-06-21
owner: APT
status: stable
kind: "standard"
domain: "navigation"
source_paths: ["apt-principles/standards/README.md"]
---

# APT Standards

This directory contains domain-specific standards that extend the canonical principle docs with enforceable rules per technical area.

## Structure

| Domain | File | Canonical Source |
|--------|------|----------------|
| AI agent harness | [ai/agent-harness-standard.md](ai/agent-harness-standard.md) | `ai-agent-framework.md` |
| AI orchestration | [ai/ai-orchestration-standard.md](ai/ai-orchestration-standard.md) | `ai-agent-framework.md` |
| Model routing | [ai/model-routing-standard.md](ai/model-routing-standard.md) | `ai-agent-framework.md` |
| Token efficiency | [ai/token-efficiency-standard.md](ai/token-efficiency-standard.md) | `ai-agent-framework.md`, `knowledge-system.md` |
| AI verification | [ai/verification-standard.md](ai/verification-standard.md) | `ai-agent-framework.md`, `quality-testing.md` |
| Local-first AI | [ai/local-first-ai-standard.md](ai/local-first-ai-standard.md) | `ai-agent-framework.md` |
| Security harness | [ai/security-harness-standard.md](ai/security-harness-standard.md) | `security.md`, `ai-agent-framework.md` |
| Repository lifecycle | [ai/repository-lifecycle-standard.md](ai/repository-lifecycle-standard.md) | `ai-agent-framework.md`, `knowledge-system.md` |
| API | [api/api-standards.md](api/api-standards.md) | `system-standards.md` |
| Coding | [coding/coding-standards.md](coding/coding-standards.md) | `system-standards.md`, `execution.md` |
| Data | [data/data-standards.md](data/data-standards.md) | `system-standards.md` |
| Documentation | [documentation/documentation-standards.md](documentation/documentation-standards.md) | `system-standards.md`, `knowledge-system.md` |
| Observability | [observability/observability-standards.md](observability/observability-standards.md) | `operations-support.md`, `architecture.md` |
| Testing | [testing/testing-standards.md](testing/testing-standards.md) | `quality-testing.md` |

## Relationship to Canonical Docs

These standards are specific, enforceable rule sets. The canonical docs (`system-standards.md`, `quality-testing.md`, etc.) contain the principles and reasoning. Standards files contain the rules in their most actionable form.

When a standard conflicts with a canonical doc, the canonical doc takes precedence.

AI standards use the same relationship. `ai-agent-framework.md` is the canonical hub for AI doctrine; `standards/ai/` contains enforceable rules for harness design, orchestration, routing, token efficiency, verification, local-first execution, security harnesses, and repository lifecycle management. Implementation-specific routing tables, installer behavior, and tool-native file distribution belong in downstream systems such as APT Agent or `apt-principles-agents`, not in this standards directory.
