---
title: Implementation Blueprints
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "documentation"
source_paths: ["apt-principles-agents/principles/documentation/implementation-blueprints.md"]
---

# Implementation Blueprints

## Purpose

This principle helps APT teams publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: audience map, canonical source, business and partner guides, developer contract, support runbook, AI examples, diagrams, demos, and freshness owner.

## Tradeoffs And Failure Modes

Review for one guide for every audience, copied truths, non-runnable examples, missing support identifiers, and docs that describe intent instead of behavior. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Implementation Blueprints** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Tie every proposed change to verified current state, intended outcome, exact ownership and file boundaries, dependencies, contract effects, acceptance criteria, and unresolved decisions.
- Sequence work into coherent increments with commands, tests, migration, data/security, documentation, support, rollout, rollback, and evidence capture—not a list of disconnected files to edit.
- Mark current, proposed, optional, and out-of-scope behavior explicitly, and keep assumptions or illustrative paths from masquerading as repository facts.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Documentation canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
