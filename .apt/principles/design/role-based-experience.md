---
title: Role Based Experience
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "design"
source_paths: ["apt-principles-agents/principles/design/role-based-experience.md"]
---

# Role Based Experience

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

- Treat **Role Based Experience** as an explicit decision with defined scope, evidence, owner, and validation.
- Separate role labels from permissions and test cross-role visibility, delegation, denial, and audit behavior.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Design canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-ai-agent-user-reviewer](../../agents/customer/apt-ai-agent-user-reviewer.md) — Use when an autonomous AI agent (not a human) is the one integrating with or acting on the product, to confirm it can act safely and correctly without human-oriented affordances it can't use.
- [apt-bank-acquirer-reviewer](../../agents/customer/apt-bank-acquirer-reviewer.md) — Use when a deliverable will be reviewed or used by a bank or acquirer partner, to confirm it addresses their risk, compliance, and settlement concerns.
- [apt-business-user-reviewer](../../agents/customer/apt-business-user-reviewer.md) — Use when a deliverable will be used by a business owner or operator (not a developer) to run their business, to confirm it matches how they actually think about their operations.
- [apt-developer-integrator-reviewer](../../agents/customer/apt-developer-integrator-reviewer.md) — Use when reviewing the steady-state integration experience for a developer already familiar with the product, to confirm advanced flows and edge cases are covered, not just the first call.
- [apt-support-operations-reviewer](../../agents/customer/apt-support-operations-reviewer.md) — Use when a change is about to ship, to confirm the support organization can actually operate and troubleshoot it on day one.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
