---
title: APT Thinking Principles (Why)
kind: principle-hub
domain: thinking
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/thinking.md"]
supersedes: ["apt-principles/thinking.md"]
---

# APT Thinking Principles

## Overview

APT Thinking Principles define how problems are framed before solutions are proposed.

Thinking answers:

- What problem is worth solving?
- Who is it for?
- What constraints are real?
- What does success look like?
- Which tradeoffs are acceptable?

## Purpose

Thinking prevents teams and agents from jumping directly into implementation. It turns ambiguous ideas into explicit decisions, success criteria, and scoped work.

## Core Principles

### 1. Problem-first, not solution-first

Start with the user, pain, context, and desired outcome before naming a feature or technology.

### 2. Decisions are explicit

Important choices should be visible in a decision log, spec, issue, or design note.

### 3. Tradeoffs are documented

Every useful choice costs something. APT records what is gained, what is lost, and why the tradeoff is acceptable.

### 4. Constraints are acknowledged

Budget, time, platform, security, compliance, team capacity, and operating limits are design inputs, not excuses.

### 5. Outcomes must be measurable

Define what success looks like before build work begins.

## Standards / Rules

- Do not create an implementation plan until the problem statement is clear.
- Do not treat a requested feature as the root problem without checking user context.
- Define the baseline condition before naming the target outcome.
- Separate user, operator, support, and system outcomes when they differ.
- Record assumptions that affect scope, architecture, security, or release safety.
- Prefer small decision records over long undocumented debate.
- Decision records should include owner, rationale, risk, mitigation, and revisit or expiry date when the decision accepts risk.
- If the problem is unclear, produce a framing brief before producing code.

## Required Artifacts

- Problem statement
- User or audience definition
- Success criteria
- Constraint map
- Tradeoff notes
- Decision log entry for durable choices
- Baseline and target outcome evidence
- Out-of-scope notes for tempting but deferred work

## Working Backwards Package

For product and feature work, a Working Backwards package is an APT-compatible way to make intent reviewable before implementation. The press release captures the customer, problem, desired outcome, and why the work matters before a feature list or technical solution is accepted.

External FAQ answers customer, buyer, adopter, workflow, trust, cost, and support questions. Internal FAQ answers engineering, operations, security, legal/compliance, business, and ownership questions. Open items are allowed only when they are visible, owned, and carried forward into requirements or readiness decisions.

## Good Example

Before building a review dashboard, define the actual outcome:

> Reduce review handoff time by 30% by making ownership, status, blockers, and evidence visible in one place.

Then identify constraints:

- Must use existing repo metadata.
- Must not require manual status updates.
- Must expose enough evidence for support and release review.

## Bad Example

> Build a dashboard because stakeholders asked for one.

This skips the problem, audience, baseline metric, and decision criteria.

## AI Prompt Example

```text
Frame this request using APT Thinking Principles before proposing a solution.

Input:
- Request:
- Known user/audience:
- Current pain:
- Constraints:

Return:
1. Problem statement
2. Measurable success criteria
3. Key assumptions
4. Tradeoffs
5. Smallest useful next step
```

## Related Documents

- `apt-principles-agents.md`
- `design.md`
- `execution.md`
- `examples/thinking/problem-framing-example.md`
- `examples/thinking/decision-log-outcome-example.md`
- `prompts/framework-review-prompt.md`
- `prompts/apt-one-shot-build-prompt.md`

## Related Checklists

- `checklists/thinking-review-checklist.md`

## Summary

Thinking turns vague intent into clear, constrained, measurable work.

## Topic Guides

- [Practical thinking](practical-thinking.md)
- [Decision framing](decision-framing.md)
- [Tradeoff analysis](tradeoff-analysis.md)
- [Assumption checking](assumption-checking.md)
- [Beginner clarity](beginner-clarity.md)
