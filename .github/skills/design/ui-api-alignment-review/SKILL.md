---
name: ui-api-alignment-review
description: Use when work must start from user intent and align journeys, roles, permissions, states, accessibility, UI, API, documentation, and demos.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: consolidated APT guidance
title: "UI API Alignment Review"
domain: "design"
source_paths: ["apt-principles-agents/skills/design/ui-api-alignment-review/SKILL.md"]
---

# UI API Alignment Review

## Purpose

Produce a reviewable ui api alignment review outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must start from user intent and align journeys, roles, permissions, states, accessibility, UI, API, documentation, and demos.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Restate the intended outcome and affected audiences.
2. Inventory exact current behavior and source-backed constraints.
3. Apply the relevant APT principles and identify missing evidence.
4. Compare viable options, including compatibility and operational effects.
5. Produce the required artifacts: audience and intent map, journey, state model, permission matrix, UI/API alignment, accessibility checks, and demo flow.
6. Review screen-first design, missing states, inaccessible interactions, role leakage, and demos that hide operational reality; separate blockers, recommendations, and open questions.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Ui Api Alignment Review** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: intent, audience, journey, roles, states, accessibility, UI/API alignment.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Design principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Design principles](../../../principles/design/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
