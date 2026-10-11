---
name: audience-layered-docs
description: Use when work must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Audience Layered Docs"
domain: "documentation"
source_paths: ["apt-principles-agents/skills/documentation/audience-layered-docs/SKILL.md"]
---

# Audience Layered Docs

## Purpose

Produce a reviewable audience layered docs outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Inventory canonical facts, contracts, identifiers, lifecycle states, status labels, owners, and freshness signals before drafting audience-specific material.
2. Map each audience to its questions, decisions, tasks, prerequisites, terminology, depth, risks, examples, support needs, and next action.
3. Design shared source fragments or references for repeated truth; keep audience files focused on explanation, sequence, and action rather than copied contracts.
4. Build layers for the audiences actually served and cross-link them to canonical sources, related layers, runnable examples, troubleshooting, and escalation.
5. Test representative comprehension and task completion, including terminology consistency and handoffs between business, partner, developer, support, internal, and agent views.
6. Record the dependency map and maintenance trigger so a product, contract, state, support, or status change updates every affected layer without drift.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Audience Layered Docs** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Do not create one independently maintained truth per audience; centralize facts and vary explanation, depth, sequence, and action.
- Maintain an audience-to-source dependency map so product and contract changes trigger every affected layer.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Documentation principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Documentation principles](../../../principles/documentation/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
