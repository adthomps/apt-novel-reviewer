---
name: implementation-blueprint-writer
description: Use when work must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Implementation Blueprint Writer"
domain: "documentation"
source_paths: ["apt-principles-agents/skills/documentation/implementation-blueprint-writer/SKILL.md"]
---

# Implementation Blueprint Writer

## Purpose

Produce a reviewable implementation blueprint writer outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Verify current architecture, file ownership, commands, contracts, generated boundaries, integrations, constraints, and relevant decisions from exact repository sources.
2. Define outcome, audiences, scope, non-goals, assumptions, dependencies, risks, acceptance criteria, and decisions that require accountable approval.
3. Map proposed changes to exact components and owners, including contract, data, security, compatibility, operational, documentation, support, and generated-output effects.
4. Sequence coherent increments with prerequisites, implementation notes, validation commands, evidence, rollout, monitoring, rollback, and handoff criteria.
5. Distinguish current, proposed, optional, illustrative, and out-of-scope behavior; identify gaps rather than inventing missing paths or product claims.
6. Review the blueprint with implementer, operator, security/risk, documentation/support, and beginner perspectives before marking it ready.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Implementation Blueprint Writer** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Map every change to an exact owner, source boundary, dependency, validation command, rollout/rollback step, and acceptance signal.
- Separate verified current state from proposed or illustrative structure so the blueprint remains executable and auditable.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Documentation principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Documentation principles](../../../principles/documentation/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
