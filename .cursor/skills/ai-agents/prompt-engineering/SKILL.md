---
name: prompt-engineering
description: Use when work must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.
kind: skill
status: active
owner: APT
last_updated: 2026-06-27
source: consolidated APT guidance
title: "Prompt Engineering"
domain: "ai-agents"
source_paths: ["apt-principles-agents/skills/ai-agents/prompt-engineering/SKILL.md"]
---

# Prompt Engineering

## Purpose

Produce a reviewable prompt engineering outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Restate the intended outcome and affected audiences.
2. Inventory exact current behavior and source-backed constraints.
3. Apply the relevant APT principles and identify missing evidence.
4. Compare viable options, including compatibility and operational effects.
5. Produce the required artifacts: task packet, routing decision, selected skills and agents, source evidence, evaluation, review outcome, and approval record.
6. Review unsupported claims, excessive context, weak-model routing, unclear handoffs, and automation without approval; separate blockers, recommendations, and open questions.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Prompt Engineering** as an explicit decision with defined scope, evidence, owner, and validation.
- Version the instruction, inputs, allowed tools, output contract, failure behavior, tests, and owner.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Ai Agents principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [AI principles](../../../principles/ai/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
