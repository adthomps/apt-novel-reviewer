---
title: Practical Thinking
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "thinking"
source_paths: ["apt-principles-agents/principles/thinking/practical-thinking.md"]
---

# Practical Thinking

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

- Treat **Practical Thinking** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: problem statement, assumptions, alternatives, decision, measurable outcome.
- Separate the observed problem from the requested solution; restate both and verify that solving one would improve the named outcome.
- Test important assumptions with disconfirming evidence, counterexamples, or a small reversible experiment before committing to an expensive path.
- Match decision depth to consequence: move quickly on reversible low-impact choices and require stronger evidence and accountable approval for irreversible or high-risk choices.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Thinking canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-architecture-lead](../../agents/core/apt-architecture-lead.md) — Use when a change has structural or system-design implications spanning more than one architecture perspective, and someone needs to own the combined structural verdict.
- [apt-design-lead](../../agents/core/apt-design-lead.md) — Use when a change touches UI, UX flow, or customer-facing design decisions spanning more than one audience or perspective, and someone needs to own the combined design verdict.
- [apt-execution-lead](../../agents/core/apt-execution-lead.md) — Use when a change is ready to move from design/architecture into implementation, and someone needs to confirm the plan is buildable, safely sequenced, and verifiable before work starts.
- [apt-principal](../../agents/core/apt-principal.md) — Use as the final synthesis step after specialist perspectives have reported, when scattered concerns, risks, and tradeoffs must be reconciled into one accountable, evidence-backed decision with a clear approval status.
- [apt-router](../../agents/core/apt-router.md) — Use at the start of any review-council engagement, before any specialist perspective agent is invoked, to decide which agents the request actually needs based on domain, audience, and risk.
- [apt-thinking-lead](../../agents/core/apt-thinking-lead.md) — Use before domain-specific perspectives are engaged, whenever the problem statement, assumptions, or tradeoffs behind a proposal haven't yet been made explicit and checkable.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
