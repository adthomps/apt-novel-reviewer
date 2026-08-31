---
name: ai-example-builder
description: Use when work must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "AI Example Builder"
domain: "documentation"
source_paths: ["apt-principles-agents/skills/documentation/ai-example-builder/SKILL.md"]
---

# AI Example Builder

## Purpose

Produce a reviewable ai example builder outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Define the learner, task, consequence level, source inputs, expected capability, allowed tools, approval boundaries, and observable success criteria.
2. Capture the exact instructions and context-loading sequence while replacing secrets, personal data, regulated data, and production identifiers with safe fixtures.
3. Provide expected output shape, source citations, validation steps, human review points, prohibited actions, and a safe-stop or escalation path.
4. Include at least one ambiguity, missing-input, tool-failure, unsupported-claim, or unsafe-action case—not only an ideal successful response.
5. Run the example in the named environment when it is labeled executable; record model/tool assumptions, date, command or interaction, result, and known nondeterminism.
6. Link canonical doctrine, distinguish illustrative from verified behavior, assign a freshness owner, and define what product, model, tool, or policy change requires retesting.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Ai Example Builder** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Show safe failure and escalation behavior as well as success, with exact validation and human-review points.
- Label provider/model assumptions and executable status so readers do not mistake a demonstration for a durable capability guarantee.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Documentation principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Documentation principles](../../../principles/documentation/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
