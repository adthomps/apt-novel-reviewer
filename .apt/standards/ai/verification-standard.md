---
title: AI Verification Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/verification-standard.md"]
---

# AI Verification Standard

Extracted from `../../ai-agent-framework.md`, `../../quality-testing.md`, and `../../security.md`. See those files for canonical doctrine.

## Purpose

AI verification proves that agent-assisted work is grounded in evidence. Verification is not agent confidence, fluent explanation, or a green-looking summary. It is the explicit comparison of the result against source requirements, checks, examples, and approval rules.

## Verification Levels

- Source verification: the agent used the correct canonical docs, repo instructions, and local context.
- Scope verification: the output stayed inside the requested and classified boundary.
- Behavioral verification: tests, builds, previews, screenshots, dry runs, or other checks support the result.
- Security verification: secrets, permissions, auth, destructive actions, and external calls are controlled.
- Knowledge verification: docs, prompts, examples, references, and generated artifacts remain aligned.
- Approval verification: required human sign-off is recorded or the work remains blocked.

## Required Evidence

Every AI-assisted change should report:

- sources read or relied on
- files or artifacts changed
- checks run and results
- checks not run and why
- assumptions
- residual risks
- approval status when approval is required

High-risk work requires stronger evidence, including reproduction steps, threat review, rollback notes, or independent review where applicable.

## Failure Conditions

- The agent states that work is complete without running or citing checks.
- Verification relies on model confidence instead of command, review, or evidence output.
- The agent omits failed checks from the summary.
- A high-risk change is verified by the same unchecked agent path that produced it.
- Approval-required work is presented as complete before approval.
- Generated docs, prompts, examples, or references drift from canonical doctrine.

## APT Agent Blueprint

APT Agent should implement verification as a separate stage from remediation. Suggested modules are:

- validation command resolver
- evidence collector
- failure classifier
- residual-risk reporter
- independent verifier role for high-risk work
- approval-status tracker

The implementation should store verification results in a form that can be reviewed by humans and reused in repository lifecycle reports.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns verification runners, report files, and command adapters. `apt-principles-agents` defines verification levels, evidence types, failure conditions, and approval expectations.

## Related

- `../../ai-agent-framework.md`
- `../../quality-testing.md`
- `../../security.md`
- `agent-harness-standard.md`
- `security-harness-standard.md`
- `../../checklists/ai-agent-review-checklist.md`
