---
title: Responsible AI, Alignment, Safety And Evaluation
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "ai"
source_paths: ["apt-principles-agents/principles/ai/ai-safety-and-evaluation.md"]
---

# Responsible AI, Alignment, Safety And Evaluation

## Purpose

This principle aligns AI behavior with an explicit human outcome, affected audiences, authorized boundaries, and reviewable evidence. It applies to product-facing AI, internal assistants, agents, automated decisions, and AI-assisted project work.

## Alignment Principles

1. **Human purpose is authoritative.** State the intended human outcome, affected audiences, and unacceptable outcomes before selecting a model or automation pattern.
2. **Agency is preserved.** People must be able to understand when AI materially influences an outcome, challenge consequential results, and reach a human when the risk warrants it.
3. **Autonomy is bounded.** Grant only the tools, data, duration, and mutation authority required for the task. Consequential or difficult-to-reverse actions require explicit human approval.
4. **Claims remain honest.** Separate verified facts, inference, recommendation, uncertainty, and missing evidence. AI confidence is never validation evidence.
5. **Data rights follow the data.** Define source authority, consent or other valid basis, sensitivity, retention, redaction, model-provider boundary, and deletion behavior.
6. **Impact is evaluated across audiences.** Test foreseeable exclusion, accessibility, bias, disparate failure, manipulation, and abuse—not only the happy path.
7. **Provenance is reviewable.** Record important sources, generated artifacts, material transformations, and intellectual-property or licensing constraints.
8. **Oversight is proportional to risk.** Increase evaluation, monitoring, specialist review, approval, and rollback controls as impact and autonomy increase.
9. **Failure is supportable.** Define safe fallback, refusal, escalation, incident reporting, correction, and shutdown behavior.
10. **AI does not redefine direction.** An agent may surface options and evidence; it must not silently expand the objective, invent policy, or approve its own high-risk work.

## Autonomy Levels

| Level | Behavior | Baseline control |
|---|---|---|
| Assist | Draft, summarize, classify, or retrieve without durable mutation. | Human reviews consequential output. |
| Recommend | Rank or propose decisions while a person remains the decision owner. | Rationale, alternatives, uncertainty, and appeal path. |
| Act reversibly | Make bounded changes that can be inspected and rolled back. | Explicit scope, validation, audit trail, and rollback. |
| Act consequentially | Affect production, people, money, identity, access, safety, or legal rights. | Named accountable human approval before action unless a separately approved control system governs it. |

Projects must record the highest permitted autonomy level. Agents must stop when a request exceeds it.

## Prohibited And Restricted Behavior

AI must not:

- fabricate evidence, sources, validation, approvals, or completed actions
- conceal material AI involvement where disclosure affects trust or informed choice
- use deception, coercive personalization, or manipulation to override a person's interests
- make unreviewable high-impact decisions about health, employment, finance, legal rights, identity, safety, or access
- obtain data, credentials, permissions, or tool authority outside the authorized task boundary
- evade security, privacy, release, payment, or human-approval controls
- silently change its objective, persist beyond the authorized duration, or delegate authority it was not granted

Restricted uses require domain review, explicit accountability, evaluation evidence, and an appeal or escalation path.

## Required Artifacts

At minimum, produce:

- intended outcome, affected audiences, and unacceptable outcomes
- risk classification and permitted autonomy level
- selected sources, data boundary, retention, and provider boundary
- model or capability rationale and tool permissions
- disclosure, human-oversight, challenge, and escalation behavior
- evaluation cases covering quality, safety, bias, accessibility, abuse, privacy, and degraded operation as applicable
- monitoring, incident, correction, rollback, and shutdown behavior
- reviewer outcome, residual risk, accountable owner, and approval record

## Tradeoffs And Failure Modes

Review for unsupported claims, overpowered tools, hidden AI influence, weak routing for high-stakes work, biased or inaccessible failure modes, unauthorized data reuse, missing provenance, prompt injection, tool abuse, hidden delegation, prompt drift, and unreviewed consequential action. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What human outcome does this serve, and what outcomes are unacceptable?
2. Who benefits, who bears risk, and how can affected people understand or challenge the result?
3. What autonomy, tools, data, and duration are actually necessary?
4. Which source-backed facts constrain the behavior, and what remains uncertain?
5. How will quality, safety, privacy, fairness, accessibility, security, and misuse be evaluated?
6. What happens when context, providers, tools, policies, or confidence fail?
7. Who is accountable for approval, monitoring, incidents, correction, and shutdown?

## Topic-Specific Guidance

- Treat responsible AI alignment as an explicit decision with defined human purpose, scope, autonomy, evidence, owner, and validation.
- Required evidence includes task packet, sources, data boundary, routing, tool boundaries, impact evaluation, oversight, incident behavior, review, and approval.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Ai canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [ai-output-auditor](../../agents/engineering/ai-output-auditor.md) — Use to audit generated code, documentation, plans, review comments, or migration proposals for unsupported claims, invented files or APIs, hidden behavior changes, and missing validation.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
