---
title: Thinking Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "checklist"
domain: "thinking-review-checklist"
source_paths: ["apt-principles/checklists/thinking-review-checklist.md"]
---

# Thinking Review Checklist

## Scope

Use this checklist before a request becomes design, architecture, or implementation work.

Use it for new ideas, feature requests, project pitches, ambiguous bugs that imply product change, and AI build prompts. The goal is to prevent teams from approving a solution before they understand the problem and the decision that must be made.

## Required Checks

- [ ] Problem statement names the real user pain or opportunity.
- [ ] Audience, user, or operator context is explicit.
- [ ] Success criteria are measurable or observable.
- [ ] Baseline condition and target success signal are named.
- [ ] Constraints are named before solutioning.
- [ ] Key assumptions are visible.
- [ ] Tradeoffs are documented.
- [ ] Durable or risk-accepting decisions have owner, rationale, risk, mitigation, and revisit date.
- [ ] The smallest useful next step is defined.

## Failure Conditions

- The request starts with a solution and never states the problem.
- Success is described only as "done" or "implemented".
- No baseline or target evidence exists for the claimed outcome.
- Constraints are deferred until build time.
- Important assumptions are hidden in conversation instead of captured.
- Accepted risk has no owner, mitigation, or revisit path.

## Evidence Required

- Problem statement.
- Success criteria.
- Baseline and target outcome evidence.
- Constraint and tradeoff notes.
- Decision log entry for durable choices.
- Named owner or decision maker.
- Notes showing what is explicitly out of scope.

## Pass Standard

The work is ready to move forward when a reviewer can explain the problem, audience, success signal, constraints, assumptions, and next step without reading between the lines. If implementation still depends on guessing intent, the checklist has not passed.

## Related Documents

- `../thinking.md`
- `../examples/thinking/problem-framing-example.md`
- `../examples/thinking/decision-log-outcome-example.md`
- `../prompts/framework-review-prompt.md`
