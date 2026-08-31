---
title: Responsible AI Standard
version: v1
last_updated: 2026-08-16
owner: APT
status: active
kind: standard
domain: ai
source_paths: ["apt-principles-agents/standards/ai/responsible-ai-standard.md"]
---

# Responsible AI Standard

## Requirement

Any repeatable AI feature, route, agent, or automated decision must have a reviewable alignment record before release or broad reuse. The record implements `principles/ai/ai-safety-and-evaluation.md`; it does not replace that doctrine.

## Required Record

The owning project must name:

- intended human outcome, affected audiences, and unacceptable outcomes
- risk classification and maximum autonomy level
- authoritative sources, data sensitivity, retention, and external-provider boundary
- allowed tools, mutations, delegation, duration, and forbidden actions
- disclosure, human-review, appeal, refusal, and escalation behavior
- evaluation cases and release thresholds
- monitoring, incident owner, correction, rollback, and shutdown behavior
- accountable owner and approval evidence

## Release Gates

An AI capability fails readiness when:

- consequential behavior can occur beyond its approved autonomy level
- validation depends on model confidence or self-review alone
- affected people have no practical escalation or correction path where impact warrants one
- sensitive data handling, retention, or provider boundaries are unknown
- evaluation omits foreseeable misuse, prompt injection, tool abuse, accessibility, bias, or degraded operation relevant to the use case
- generated claims, sources, actions, or approvals cannot be traced
- incident response cannot disable, roll back, or contain the behavior

## Proportional Application

Low-risk drafting needs a concise record and human review. Reversible repository changes need bounded tools, validation, and rollback. Product-facing or high-impact decisions require domain expertise, stronger evaluation, monitoring, explicit approval, and an appeal or human-escalation path.

## Related

- `../../principles/ai/ai-safety-and-evaluation.md`
- `agent-harness-standard.md`
- `security-harness-standard.md`
- `verification-standard.md`
- `../../checklists/ai-agent-review-checklist.md`
