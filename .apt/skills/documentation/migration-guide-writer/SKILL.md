---
name: migration-guide-writer
description: Use when work must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Migration Guide Writer"
domain: "documentation"
source_paths: ["apt-principles-agents/skills/documentation/migration-guide-writer/SKILL.md"]
---

# Migration Guide Writer

## Purpose

Produce a reviewable migration guide writer outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Verify source and target versions, behaviors, schemas, authentication, data, consumers, dependencies, support obligations, dates, and deprecation status from canonical evidence.
2. Segment fresh adopters, standard migrations, high-risk consumers, and exceptions; state prerequisites, compatibility windows, ownership, and approval requirements for each path.
3. Build field/error/auth/state mappings, ordered steps, examples, validation, observability, dual-run or cutover checks, rollback, and data reconciliation where applicable.
4. Document breaking changes, irreversible actions, downtime or degraded behavior, known gaps, troubleshooting, communication cadence, and support escalation without hiding uncertainty.
5. Test the guide with representative consumers in a fixture, sandbox, rehearsal, or dry run and capture ambiguous steps, missing permissions, timing, and recovery evidence.
6. Assign freshness, communication, exception, support, and retirement owners; separate current availability from planned target behavior and record the final exit criteria.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Migration Guide Writer** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Include mappings, compatibility window, rehearsal or dry-run evidence, observability, rollback, reconciliation, support, and retirement criteria.
- Label current, deprecated, planned, and unavailable behavior explicitly so consumers can make safe timing decisions.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Documentation principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Documentation principles](../../../principles/documentation/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
