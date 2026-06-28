---
title: Execution Readiness Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "checklist"
domain: "execution-readiness-checklist"
source_paths: ["apt-principles/checklists/execution-readiness-checklist.md"]
---

# Execution Readiness Checklist

## Scope

Use this checklist before a spec, issue, or prompt is handed to an engineer or AI agent for implementation.

It is especially useful when work crosses multiple layers, such as UI plus API, docs plus public site, or AI prompt plus validation. Run it before work starts, while the scope is still small enough to split.

## Required Checks

- [ ] Approved intent and scope are clear.
- [ ] Affected layers and ownership boundaries are known.
- [ ] Work is split into small reviewable increments.
- [ ] Each increment names input artifact, output artifact, validation evidence, and stop condition.
- [ ] Acceptance criteria are testable.
- [ ] Validation steps are known before work starts.
- [ ] Documentation or build-kit updates are identified.
- [ ] Release or support impact is called out when relevant.

## Failure Conditions

- Implementation scope combines unrelated changes.
- No validation checkpoint exists.
- Increment boundaries or stop conditions are missing.
- The agent or engineer must infer architecture boundaries.
- User-facing behavior changes with no release note expectation.

## Evidence Required

- Spec, issue, or implementation brief.
- Increment list.
- Input/output, validation, owner, dependency, and stop-condition notes for each increment.
- Acceptance criteria.
- Validation plan.
- Ownership and affected-layer notes.
- Dependencies, blockers, and approval points.

## Pass Standard

The implementer should know what to change, what not to change, what evidence to produce, and where to stop for review. If they must infer scope, architecture, or success criteria, execution is not ready.

## Related Documents

- `../execution.md`
- `../examples/workflows/spec-to-story-flow.md`
- `../examples/workflows/delivery-increment-plan-example.md`
- `../prompts/apt-one-shot-build-prompt.md`
