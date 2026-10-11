---
title: Tradeoff Analysis
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "thinking"
source_paths: ["apt-principles-agents/principles/thinking/tradeoff-analysis.md"]
---

# Tradeoff Analysis

## Purpose

This principle helps APT teams frame the real problem, expose assumptions, compare meaningful options, and explain decisions in beginner-clear language. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: problem statement, desired outcome, constraints, assumptions, options, tradeoffs, decision, and unresolved questions.

## Tradeoffs And Failure Modes

Review for solution-first framing, false certainty, hidden constraints, and decisions without measurable outcomes. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Tradeoff Analysis** as an explicit decision with defined scope, evidence, owner, and validation.
- Compare meaningful alternatives across outcomes, complexity, risk, support, migration, and reversibility.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Thinking canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-wb-faq-writer](../../agents/working-backwards/apt-wb-faq-writer.md) — Sub-agent invoked by the Working Backwards orchestrator to draft or revise Stage 2, the external FAQ (skeptical customer questions) and the internal FAQ (skeptical engineering, leadership, compliance, and operations questions), using the persona's reviewer agents as lenses.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
