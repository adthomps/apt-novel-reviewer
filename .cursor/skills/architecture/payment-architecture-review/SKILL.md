---
name: payment-architecture-review
description: Use when work must define boundaries, contracts, ownership, failure modes, deployment, observability, modernization paths, and reversibility.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: consolidated APT guidance
title: "Payment Architecture Review"
domain: "architecture"
source_paths: ["apt-principles-agents/skills/architecture/payment-architecture-review/SKILL.md"]
---

# Payment Architecture Review

## Purpose

Produce a reviewable payment architecture review outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must define boundaries, contracts, ownership, failure modes, deployment, observability, modernization paths, and reversibility.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Restate the intended outcome and affected audiences.
2. Inventory exact current behavior and source-backed constraints.
3. Apply the relevant APT principles and identify missing evidence.
4. Compare viable options, including compatibility and operational effects.
5. Produce the required artifacts: context and boundary diagrams, responsibility matrix, contracts, data flow, failure handling, rollout, rollback, and operations.
6. Review unclear ownership, accidental coupling, irreversible migrations, provider leakage, and architecture without operational evidence; separate blockers, recommendations, and open questions.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Payment Architecture Review** as an explicit decision with defined scope, evidence, owner, and validation.
- Trace authorization, capture, settlement, funding, reconciliation, reversal, dispute, and support evidence.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Architecture principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Architecture principles](../../../principles/architecture/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
