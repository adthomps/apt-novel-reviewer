---
name: api-example-builder
description: Use when work must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "API Example Builder"
domain: "documentation"
source_paths: ["apt-principles-agents/skills/documentation/api-example-builder/SKILL.md"]
---

# API Example Builder

## Purpose

Produce a reviewable api example builder outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must publish one canonical truth through audience-specific layers, executable examples, diagrams, troubleshooting, and implementation blueprints.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Select a real consumer task and verify the current API version, environment, schema, authentication, authorization, lifecycle behavior, limits, and support identifiers from canonical sources.
2. Build the smallest runnable request with safe placeholders, exact headers and body, expected response, resulting state change, and cleanup or reversal instructions.
3. Add examples for validation errors, permission denial, duplicates/idempotency, retries, asynchronous completion, partial failure, rate behavior, and recovery where relevant.
4. Provide variants only when they serve a named audience or language/SDK need; keep every variant behaviorally equivalent to the canonical contract.
5. Execute examples against a maintained fixture, sandbox, mock contract, or schema validator and record the command, result, assumptions, and unavailable external behavior.
6. Link troubleshooting and support identifiers, remove secrets and sensitive data, assign a freshness owner, and define version/schema/SDK changes that require retesting.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Api Example Builder** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: canonical source, audience layer, executable example, troubleshooting, freshness owner.
- Include state change, retry/idempotency, failure, recovery, support, and cleanup behavior instead of publishing happy-path snippets alone.
- Keep language and SDK variants contract-equivalent and verify them through a repeatable sandbox, fixture, schema, or CI check.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Documentation principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [Documentation principles](../../../principles/documentation/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
