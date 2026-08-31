---
title: Beginner Clarity
kind: principle
status: active
owner: APT
last_updated: 2026-06-27
source: apt-principles and apt-agent-standards
domain: "thinking"
source_paths: ["apt-principles-agents/principles/thinking/beginner-clarity.md"]
---

# Beginner Clarity

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

- Treat **Beginner Clarity** as an explicit decision with defined scope, evidence, owner, and validation.
- Remove unexplained terms, show the first action, provide a safe example, and test likely stopping points.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Thinking canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-beginner-user-reviewer](../../agents/beginner-reviewers/apt-beginner-user-reviewer.md) — Use when a deliverable will be seen by someone with no prior context on APT or the product, to confirm it's understandable without assumed background.
- [apt-new-developer-reviewer](../../agents/beginner-reviewers/apt-new-developer-reviewer.md) — Use when reviewing a developer's first-run experience — first API call, first local setup, first error — to confirm nothing assumes prior familiarity with this specific codebase.
- [apt-new-merchant-reviewer](../../agents/beginner-reviewers/apt-new-merchant-reviewer.md) — Use when reviewing a merchant's first-run experience — signup, KYC, first transaction — to confirm a business owner without payments expertise can complete it unassisted.
- [apt-new-support-agent-reviewer](../../agents/beginner-reviewers/apt-new-support-agent-reviewer.md) — Use when reviewing material a support agent will use to help a customer, to confirm a newly trained agent can resolve common cases without escalating.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
