---
type: "Principle"
title: "APT Knowledge System"
description: "APT guidance for capturing, maintaining, and reusing source-aware knowledge across humans, agents, and downstream repositories."
status: "stable"
kind: "okf-concept"
domain: "knowledge"
owner: "APT"
last_updated: "2026-07-26"
source_paths: ["apt-principles-agents/principles/execution/knowledge-and-learning.md"]
authority: "derived"
verified: { by: "human:APT", at: "2026-07-26T00:00:00-07:00" }
sources: [{ id: "knowledge-system", resource: "apt-principles-agents/principles/execution/knowledge-and-learning.md", title: "APT Knowledge System" }]
---

# APT Knowledge System

The APT Knowledge System defines how documentation, examples, decisions, and reusable patterns are captured, maintained, and used by humans and AI agents.

## Portable Concept

Knowledge should have one canonical source, clear audience metadata, stable paths, and enough provenance for agents to distinguish verified facts from assumptions. Downstream repositories should consume this concept as routing context, then inspect the canonical source before changing behavior.

## Relationships

- Uses the [Cross-Repo Guidance Sync](../workflows/cross-repo-guidance-sync.md) workflow to keep downstream repositories aligned.
- Provides the knowledge boundary for the [OKF Adoption](../decisions/okf-adoption.md) decision.
- Supports the [Voice Of Customer](../skills/voice-of-customer.md) skill by preserving customer evidence, outcomes, and uncertainty.

## Canonical Source

See [APT Knowledge System](../../../principles/execution/knowledge-and-learning.md) for authoritative guidance.[^knowledge-system]

[^knowledge-system]: APT Knowledge System.
