---
title: Customer Journey Design
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "design"
source_paths: ["apt-principles-agents/principles/design/customer-journey-design.md"]
---

# Customer Journey Design

## Purpose

This principle helps APT teams start from user intent and align journeys, roles, permissions, states, accessibility, UI, API, documentation, and demos. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: audience and intent map, journey, state model, permission matrix, UI/API alignment, accessibility checks, and demo flow.

## Tradeoffs And Failure Modes

Review for screen-first design, missing states, inaccessible interactions, role leakage, and demos that hide operational reality. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Customer Journey Design** as an explicit decision with defined scope, evidence, owner, and validation.
- Show actor intent, touchpoints, states, decisions, handoffs, failure recovery, and measurable outcome.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Design canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
