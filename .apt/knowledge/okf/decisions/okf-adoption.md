---
type: "Decision"
title: "OKF Adoption"
description: "Boundary decision for adopting OKF v0.2 as a portable APT knowledge layer without introducing generated wiki tooling or replacing canonical Markdown sources."
resource: "apt-principles-agents/docs/refactor/okf-design.md"
tags: ["apt", "decision", "knowledge", "okf", "governance"]
status: "stable"
kind: "okf-concept"
domain: "knowledge"
owner: "APT"
last_updated: "2026-08-24"
source_paths: ["apt-principles-agents/docs/refactor/okf-design.md", "apt-principles-agents/docs/refactor/decision-register.md"]
authority: "derived"
verified: { by: "human:APT", at: "2026-08-24T00:00:00-07:00" }
sources: [{ id: "okf-design", resource: "apt-principles-agents/docs/refactor/okf-design.md", title: "OKF Design" }, { id: "decision-register", resource: "apt-principles-agents/docs/refactor/decision-register.md", title: "Refactor Decision Register" }]
---

# OKF Adoption

APT adopts OKF v0.2 as a portable representation for selected knowledge concepts. Generated wiki tooling is not part of this pilot.

## Decision

The pilot creates a small reviewed bundle under `knowledge/okf/` with four concept types: `Principle`, `Skill`, `Workflow`, and `Decision`. The bundle supports downstream repository context and agent routing, but canonical APT Markdown remains authoritative.

## Relationships

- Applies the [APT Knowledge System](../principles/knowledge-system.md) to portable knowledge exchange.
- Defines the boundary for [Cross-Repo Guidance Sync](../workflows/cross-repo-guidance-sync.md): OKF helps consumers understand guidance, while manifests and installation records update target repos.
- Includes [Voice Of Customer](../skills/voice-of-customer.md) as the first skill concept.

## Canonical Sources

See [OKF Design](../../../docs/refactor/okf-design.md) and [Refactor Decision Register](../../../docs/refactor/decision-register.md) for the active boundary and decision context.[^okf-design][^decision-register]

[^okf-design]: OKF Design.
[^decision-register]: Refactor Decision Register.
