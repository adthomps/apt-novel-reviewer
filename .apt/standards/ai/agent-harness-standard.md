---
title: Agent Harness Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/agent-harness-standard.md"]
---

# Agent Harness Standard

Extracted from `../../ai-agent-framework.md`. See that file for canonical AI doctrine, ownership boundaries, and related build-kit artifacts.

## Purpose

Agent harnesses make AI-assisted work observable, bounded, and reviewable. A harness is the workflow shell around one or more agents; it separates evidence gathering from change, change from verification, and verification from approval.

## Lifecycle

Use this standard lifecycle for governed agent work:

```text
Discover
  -> Classify
  -> Validate
  -> Remediate
  -> Verify
  -> Approve
```

Stages may be lightweight for low-risk tasks, but the stage boundaries must remain visible when work affects security, production, public documentation, architecture, repository standards, or generated code.

## Stage Rules

- Discover: read canonical docs, repo instructions, relevant source files, current state, and local validation commands before proposing changes.
- Classify: identify APT layer, risk level, owner, applicable standards, tool permissions, data sensitivity, and approval needs.
- Validate: reproduce or confirm the current issue, baseline behavior, or feasibility before remediation.
- Remediate: make only bounded changes that match the classified scope, or produce a remediation plan when implementation is outside the current boundary.
- Verify: run the required checks, compare results with success criteria, and report residual risk.
- Approve: require human sign-off for destructive actions, secrets, production deploys, security-sensitive changes, policy-sensitive changes, and high-stakes decisions.

## Required Artifacts

- Harness stage map.
- Canonical source list.
- Scope and out-of-scope statement.
- Risk and approval classification.
- Validation or baseline evidence.
- Remediation summary.
- Verification evidence.
- Approval record or blocked-decision note when approval is required.

## Failure Conditions

- A prompt asks an agent to discover, change, verify, and approve its own work without named stage gates.
- The harness cannot explain which sources were trusted.
- Remediation starts before classification or baseline validation.
- Verification is replaced by agent confidence.
- Human approval is missing for destructive, production, secrets, security, identity, payment, health, legal, or high-impact work.
- The harness hides uncertainty instead of reporting assumptions and residual risk.

## APT Agent Blueprint

APT Agent should implement this standard as a reusable workflow controller. Suggested modules are:

- discovery collector for repo instructions, source maps, current state, and validation commands
- classifier for domain, risk, approval, data sensitivity, and applicable APT standards
- validation runner for baseline checks and dry-run evidence
- remediation planner and bounded change executor
- verification runner for post-change checks
- approval gate that stops risky work until a human approves

The blueprint belongs to the future APT Agent implementation. This repository only defines the standard and evidence expectations.

## Implementation Boundary

APT Agent or `apt-principles-agents` may implement routers, task packets, lifecycle commands, reports, and tool-native agent files. `apt-principles-agents` must not contain that runtime implementation; it should only define the harness stages, required evidence, approval expectations, and review criteria.

## Related

- `../../ai-agent-framework.md`
- `../../checklists/ai-agent-review-checklist.md`
- `../../examples/ai-agent/agent-harness-flow-example.md`
- `../../prompts/agent-harness-review-prompt.md`
- `../../references/ai-harness-contract.json`
