---
title: APT Execution Model (Build)
kind: principle-hub
domain: execution
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/execution.md"]
supersedes: ["apt-principles/execution.md"]
---

# APT Execution Model

## Overview

The APT Execution Model defines how approved thinking, design, and architecture move into build work.

Execution answers:

- What is the smallest useful increment?
- What source of truth drives the work?
- Which checks prove the increment is safe?
- Which artifacts need to be updated?
- How should humans and AI agents collaborate?

## Purpose

Execution keeps build work traceable, reviewable, and recoverable. It prevents large ambiguous changes from bypassing doctrine, quality gates, or release controls.

## Core Principles

### 1. Spec-driven development

Docs, tickets, or specs should define intent before implementation begins.

### 2. Small, testable increments

Prefer a sequence of safe steps over one large unreviewable change.

### 3. Preview-first workflow

User-facing changes should be validated in preview before production.

### 4. Fail fast on bad assumptions

Expose missing decisions, unclear boundaries, and broken checks early.

### 5. Automate repeatable steps

Build, test, validation, docs sync, and deployment checks should be repeatable.

## Standards / Rules

- Do not start with code when the problem, design, and boundary are unclear.
- Break work into increments that can be reviewed independently.
- Keep PRs scoped to a coherent change.
- Each increment should name its input artifact, output artifact, validation evidence, and stop condition.
- Cross-layer work should be sequenced so contracts and docs are updated before dependent implementation where practical.
- If an increment discovers a missing decision, stop and update the thinking or architecture artifact before continuing.
- Update docs, examples, or prompts when behavior changes.
- AI-generated work must follow the same repo structure, tests, and review gates as human work.

## Required Artifacts

- Spec or issue
- Implementation checklist
- Acceptance criteria
- Validation evidence
- Release note or changelog entry when user-facing behavior changes
- Increment plan with owner, dependencies, stop condition, and validation command
- Working Backwards package for product work that needs press release, FAQ, PRD, release decomposition, readiness, telemetry, and outcome evidence before build handoff

## Working Backwards To Build

When a Working Backwards package is available, implementation should be driven from approved artifacts in this order: press release, external FAQ, internal FAQ, demo/mock evidence, end-user docs, telemetry plan, requirements/PRD, release decomposition, readiness checklist, outcome tracker, and what-to-build handoff.

AI agents and engineers should pause when required package artifacts are missing, stale, blocked, or deferred without a reason. Release decomposition should convert the package into small slices with input artifact, output artifact, validation evidence, and stop condition.

## Good Example

For a principle framework update:

1. Update canonical doc structure.
2. Expand examples and checklists.
3. Update site data or navigation.
4. Run validation and docs link checks.
5. Promote with release notes.

## Bad Example

Mixing doctrine rewrites, UI redesign, route changes, and deployment changes in one unscoped update with no validation evidence.

## AI Prompt Example

```text
Break this approved spec into APT execution increments.

Input:
- Spec:
- Current repo state:
- Validation commands:
- Release constraints:

Return:
1. Ordered implementation steps
2. Files or systems affected
3. Validation after each step
4. Risks and rollback notes
```

## Topic-Specific Guidance

- Treat **Delivery Increments** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: increment, acceptance criteria, tests, release, operations, support, learning.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Execution canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-launch-readiness-lead](../../agents/product/apt-launch-readiness-lead.md) — Use before a launch or major release, to confirm the product, support, and operational readiness checks are actually complete, not just planned.
- [apt-prd-writer](../../agents/product/apt-prd-writer.md) — Use when a feature or initiative needs a PRD written or reviewed — problem, goals, non-goals, success metrics, and scope.
- [apt-voice-of-customer-analyst](../../agents/product/apt-voice-of-customer-analyst.md) — Use when raw customer feedback, support tickets, or interview notes need to be synthesized into themes that inform product decisions.
- [miranda](../../agents/product/miranda.md) — Use when prioritization, sequencing, or tradeoff decisions across multiple initiatives need a product-management perspective.

## Related Checklists

- `checklists/execution-readiness-checklist.md`

## Related Examples

- `examples/workflows/spec-to-story-flow.md`
- `examples/workflows/delivery-increment-plan-example.md`
- `examples/workflows/preview-to-prod-flow.md`

## Related Prompts

- `prompts/apt-one-shot-build-prompt.md`

## Related Documents

- `thinking.md`
- `quality-testing.md`
- `release-change-management.md`

## Summary

Execution converts decisions into small, validated, reviewable build increments.
