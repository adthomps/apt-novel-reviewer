---
name: skill-authoring
description: Use when work must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Skill Authoring"
domain: "ai-agents"
source_paths: ["apt-principles-agents/skills/ai-agents/skill-authoring/SKILL.md"]
---

# Skill Authoring

## Purpose

Produce a reviewable skill authoring outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Name one bounded capability and its consumer; separate the reusable procedure from doctrine, accountable agent perspective, one-off prompt, and tool-specific adapter behavior.
2. Define positive and negative triggers, required and optional inputs, prerequisites, source-loading rules, tool permissions, mutation boundaries, and stop conditions.
3. Write an executable sequence with decision points, missing-evidence behavior, human approval gates, failure recovery, and the smallest useful context packet.
4. Specify concrete outputs, required evidence, validation commands or review checks, residual-risk reporting, and the next accountable owner.
5. Test representative success, ambiguity, missing-input, unsafe-action, tool-failure, and incompatible-environment cases across every supported host shape.
6. Record canonical references, source provenance, owner, version or freshness signal, maintenance triggers, adapter differences, and retirement or migration behavior.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Skill Authoring** as an explicit decision with defined scope, evidence, owner, and validation.
- Reject title-swapped procedures: the skill must materially change decisions, evidence, process, outputs, or failure handling for its named capability.
- Keep the portable contract self-contained while isolating host-specific paths, metadata, permissions, and command conventions in adapters.
- Require evaluation cases and maintenance triggers before distributing the skill as a durable capability.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Ai Agents principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [AI principles](../../../principles/ai/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
