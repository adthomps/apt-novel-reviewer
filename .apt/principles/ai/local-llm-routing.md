---
title: Local LLM Routing
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "ai"
source_paths: ["apt-principles-agents/principles/ai/local-llm-routing.md"]
---

# Local LLM Routing

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

- Treat **Local Llm Routing** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: task packet, sources, routing, tool boundaries, evaluation, review, approval.
- Route locally only when measured capability, context capacity, latency, structured-output reliability, tool support, and data-handling behavior satisfy the task—not merely because local execution appears cheaper or private.
- Keep high-impact architecture, security, privacy, health, payment, compliance, irreversible migration, and final approval decisions behind stronger evaluation and accountable human or specialist review.
- Define confidence, validation, context-overflow, tool-failure, and unsupported-format triggers that automatically escalate the same task packet without losing provenance.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Ai canonical hub](README.md) and linked standards/checklists before making final claims.
## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
