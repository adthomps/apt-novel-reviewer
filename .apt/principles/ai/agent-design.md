---
title: Agent Design
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "ai"
source_paths: ["apt-principles-agents/principles/ai/agent-design.md"]
---

# Agent Design

## Purpose

This principle helps APT teams route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: task packet, selected sources, model rationale, tool boundaries, evaluation cases, reviewer outcome, residual risk, and approval record.

## Tradeoffs And Failure Modes

Review for unsupported claims, overpowered tools, weak-model routing for high-stakes work, hidden delegation, prompt drift, and unreviewed production action. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Agent Design** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: task packet, sources, routing, tool boundaries, evaluation, review, approval.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Ai canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
