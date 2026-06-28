---
title: APT AI & Agent Framework (Augmentation Layer)
kind: principle-hub
domain: ai
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/ai-agent-framework.md"]
supersedes: ["apt-principles/ai-agent-framework.md"]
---

# APT AI & Agent Framework

## Overview

APT AI & Agent Framework defines how AI is used as an augmentation layer across thinking, design, architecture, build, validation, release, operations, and knowledge.

AI answers:

- What sources should the agent trust?
- What is the allowed scope?
- Which tools may be used?
- What output format is required?
- Which human approvals are needed?
- Which harness stage is active?
- Which model capability is sufficient?
- Which context can be omitted safely?

## Purpose

AI should accelerate structured work without bypassing APT doctrine, repo boundaries, security, or validation gates.

## Core Principles

### 1. AI follows the system

Agents must use canonical docs, repo structure, and existing patterns rather than inventing new standards.

### 2. Prompts map to APT layers

Prompts should specify whether they are framing, designing, architecting, building, validating, releasing, supporting, or documenting.

### 3. Deterministic inputs produce better outputs

Good agent work depends on explicit context, sources, constraints, expected artifacts, and output format.

### 4. Guardrails over creativity in production

Agents may suggest alternatives, but implementation must respect boundaries, security, and review gates.

### 5. AI enhances execution, not direction

AI can help reason, draft, refactor, test, and document. It should not silently decide product direction or mutate production systems.

### 6. Harnesses over open-ended agents

AI-assisted work should move through explicit stages:

```text
Discover
  -> Classify
  -> Validate
  -> Remediate
  -> Verify
  -> Approve
```

The stage tells the agent what evidence to gather, what it may change, which checks apply, and when a human must approve. Single-agent "do everything" prompts are acceptable only for low-risk exploration where no durable changes or sensitive decisions occur.

### 7. Orchestration is accountable delegation

Specialized agents may divide work, but the system must preserve one accountable owner, shared source-of-truth context, reviewable handoffs, and verification before completion. Delegation does not remove the need for canonical sources, validation evidence, or human approval.

### 8. Model routing starts with sufficiency

AI workflows should use the smallest sufficient capability first, prefer local or lower-cost execution when it meets the task requirements, and escalate only when risk, ambiguity, context complexity, modality, or reasoning depth requires it. Standards must describe capabilities and constraints, not vendor-specific model names.

### 9. Context is a governed resource

Agents should load compact context packs, reusable prompts, source indexes, and task-specific excerpts instead of repeatedly ingesting full repositories or unrelated documents. Context minimization improves speed, cost, privacy, and reviewability.

### 10. Local-first AI is the default posture

When local tools, local models, or repo-local analysis can complete the work safely, prefer them before external services. Escalate to remote or higher-capability systems when local execution lacks required quality, safety, modality, or integration support.

## Standards / Rules

- Prompts that govern repeated work belong in `prompts/`.
- Project-specific AI instructions should name commands, paths, boundaries, and validation expectations.
- `apt-principles-agents` owns canonical AI doctrine, review criteria, prompts, examples, and reference contracts.
- `apt-principles-agents` owns cross-project installation, profile manifests, `.apt/installation.json`, tool-native file distribution, and sync behavior.
- Installed tool-native files such as `AGENTS.md`, `.claude/`, `.codex/`, and `.github/` should not become competing doctrine sources.
- AI must not bypass authentication, authorization, validation, or release gates.
- AI routes and prompts in applications should be explicit, versioned, and reviewable.
- AI workflows should define deterministic fallback behavior for provider failure, missing context, low confidence, or policy-sensitive input.
- Reusable prompts should include evaluation cases or dry-run examples that prove the output can be reviewed.
- High-stakes domains such as health, finance, legal, safety, security, payments, and identity require explicit escalation, refusal, or referral rules.
- Agents must report assumptions, changed files, validation, and residual risk.
- Human approval is required for destructive actions, secrets, production deploys, and security-sensitive changes.
- Harness workflows must name the current stage and the transition evidence required for the next stage.
- Agent orchestration must define owner, delegated role, handoff artifact, verification rule, and approval point.
- Model routing policies must be based on capability, locality, cost, context size, data sensitivity, latency, and risk.
- Token efficiency must be designed through shared context packs, prompt reuse, source indexes, and role-specific context boundaries.
- Repository lifecycle work must distinguish doctrine updates, standards distribution, target-repo local context, drift detection, repair, and upgrade evidence.

## Required Artifacts

- Prompt contract
- Source docs to read
- Allowed tools and boundaries
- Expected output format
- Validation criteria
- Review or approval requirements
- Evaluation cases or dry-run outputs for reusable prompts
- Fallback and escalation behavior for low-confidence, unavailable, or high-risk AI paths
- Harness stage map and transition criteria
- Model routing policy or decision record for repeatable AI workflows
- Context pack or source index for repeated agent work
- Verification evidence for AI-generated or AI-assisted changes
- Repository lifecycle evidence when standards are installed, synced, repaired, or upgraded
- Approved Working Backwards package when an AI agent is asked to implement product work from press release, FAQ, PRD, release, readiness, telemetry, or outcome artifacts

## Agent Contract

Every durable agent prompt should define:

- role
- task
- canonical sources
- in-scope work
- out-of-scope work
- output format
- validation requirements
- escalation conditions

Health, fitness, biometric, finance, legal, safety, and other high-stakes or high-confidence-risk domains require stricter contracts. Prompts in those areas must name the data boundary, identify whether guidance is informational or professional advice, define referral/escalation conditions, and preserve a deterministic fallback when AI refinement fails.

When a Working Backwards package is present, agent prompts should include the package status, approved source artifact IDs, open items, blockers, validation commands, telemetry requirements, readiness gates, outcome measures, and forbidden actions. Agents should pause instead of implementing from missing, stale, blocked, or unapproved package artifacts.

## Review Bundle Standard

AI review should use a repeatable bundle of lenses: thinking clarity, design-system alignment, architecture boundaries, system standards, security, quality/testing, release readiness, operations, and knowledge capture.

Review output should prioritize findings by severity, cite evidence, name the violated standard, recommend correction, and call out residual risk. The portable reference is `references/ai-review-bundle.json`.

AI evaluation cases should cover at least:

- normal successful output
- missing or ambiguous source context
- forbidden action or out-of-scope request
- security-sensitive or destructive action
- provider failure or degraded fallback
- domain-specific escalation when applicable

## Harness Lifecycle Standard

APT harnesses make agent work reviewable by separating discovery from change, change from verification, and verification from approval.

| Stage | Purpose | Typical Output |
|---|---|---|
| Discover | Gather sources, repo state, constraints, and existing patterns. | Source map, relevant files, commands, unknowns. |
| Classify | Identify domain, risk, ownership, required standards, and approval needs. | Task classification and applicable checklists. |
| Validate | Confirm current behavior, failing evidence, or feasibility before changes. | Baseline checks, reproduction notes, dry-run evidence. |
| Remediate | Make bounded changes or produce a bounded remediation plan. | Patch, migration plan, doc update, or repair instructions. |
| Verify | Run checks and compare against success criteria. | Test output, validation summary, residual risk. |
| Approve | Route human sign-off for risky or governed outcomes. | Approval record, release note, or blocked decision. |

Harness stages may be automated, agent-assisted, or human-led. The standard is not that every task needs heavyweight ceremony; the standard is that risky work cannot skip evidence and approval by hiding inside a broad prompt.

## AI Orchestration Standard

AI orchestration should use specialized roles only when specialization improves accuracy, safety, or throughput. Each delegated role must have:

- a bounded task
- canonical sources
- allowed tools
- output contract
- verification method
- escalation rule

Shared context should be minimized to what every role needs. Role-specific details belong in context packs, prompts, examples, or review bundles. Final synthesis must cite the evidence used and distinguish verified findings from assumptions.

## Model Routing Standard

APT model routing is tool-neutral and capability-based. A routing policy should prefer:

1. deterministic local tools before AI
2. local or low-cost AI for simple classification, extraction, summarization, and formatting
3. higher-capability reasoning only for ambiguity, architecture tradeoffs, code synthesis, security review, multimodal work, or high-risk decisions
4. human approval when no model can safely resolve the risk

Routing decisions should avoid model names in doctrine. Implementations can map capability tiers to current tools in target repos or APT Agent.

## Token Efficiency Standard

Token efficiency is a governance practice, not only a cost optimization. Repeated AI workflows should use:

- source maps instead of full-context loading
- context packs per domain or task type
- prompt templates instead of copied instructions
- retrieval or search before broad ingestion
- role-specific excerpts for specialized agents
- validation evidence summaries instead of raw logs where detail is not needed

Agents must not omit context that is required for safety, privacy, security, or correctness. The goal is sufficient context, not minimal context at any cost.

## Local-First AI Standard

Local-first AI protects speed, privacy, resilience, and cost. Prefer local execution for repository inspection, deterministic validation, formatting, static analysis, classification, and low-risk drafting. Remote or higher-capability systems are appropriate when local execution cannot meet the required quality, context, modality, policy, or integration need.

Local-first does not mean local-only. It means external AI calls should be intentional, justified, and bounded by data sensitivity and approval rules.

## Repository Lifecycle Standard

AI standards adoption is a lifecycle:

```text
Install -> Scan -> Detect Drift -> Repair -> Synchronize -> Upgrade -> Verify
```

`apt-principles-agents` defines what good looks like. `apt-principles-agents` distributes tool-native files and manifests. Target repositories own their project context, local decisions, exceptions, and validation evidence. A standards update is complete only when doctrine, distributed agent files, local project context, and validation results have a clear ownership path.

## Agent Standards Distribution

APT agent standards are distributed through `apt-principles-agents`, not by merging installer behavior into this repository.

Use this ownership split:

- `apt-principles-agents`: doctrine, review rules, canonical prompts, examples, references, and validation expectations
- `apt-principles-agents`: installer scripts, profile detection, profile manifests, path mapping, `.apt/installation.json`, dry-run install/sync, and cross-tool parity checks
- target repositories: local `docs/project-context.md`, local decisions, and any intentional deviations from managed installed files

When doctrine changes here, update or review `apt-principles-agents` only if installed agent files, profiles, or tool-specific prompts must change. When installed standards reveal a reusable doctrine gap, bring the improvement back to `apt-principles-agents`.

## Good Example

An architecture review prompt points to `architecture.md`, `system-standards.md`, and `security.md`, asks for findings by severity, and requires file/path evidence instead of generic advice.

A health coaching prompt for APT Coach states that it may use only request-scoped, validated training and approved health-context inputs; it refines deterministic recommendations into non-medical coaching language; it refers users to qualified professionals for clinical concerns; and it never claims hidden data access.

## Bad Example

An inline prompt says "make this better" with no doctrine source, no boundaries, no tests, and no required evidence.

## AI Prompt Example

```text
Create an APT-aligned agent prompt.

Input:
- Task:
- Canonical sources:
- Allowed tools:
- Forbidden actions:
- Expected artifacts:

Return:
1. Prompt text
2. Guardrails
3. Validation criteria
4. Human approval points
```

## Related Checklists

- `checklists/ai-agent-review-checklist.md`

## Related Examples

- `examples/ai-agent/agent-prompt-contract-example.md`
- `examples/ai-agent/ai-evaluation-case-example.md`
- `examples/ai-agent/agent-harness-flow-example.md`
- `examples/ai-agent/apt-principles-agents-crosswalk-example.md`
- `examples/ai-agent/health-coaching-prompt-boundary-example.md`
- `examples/ai-agent/model-routing-decision-example.md`
- `examples/ai-agent/token-efficient-context-pack-example.md`
- `examples/ai-agent/workspace-knowledge-example.md`
- `examples/workflows/repository-drift-repair-flow.md`

## Related Prompts

- `prompts/framework-review-prompt.md`
- `prompts/apt-agent-conformance-review-prompt.md`
- `prompts/agent-harness-review-prompt.md`
- `prompts/apt-one-shot-build-prompt.md`
- `prompts/model-routing-review-prompt.md`
- `prompts/repository-lifecycle-review-prompt.md`
- `prompts/workspace-knowledge-prompt.md`
- `prompts/architecture-review-prompt.md`
- `prompts/api-review-prompt.md`
- `prompts/security-review-prompt.md`
- `prompts/testing-review-prompt.md`

## Related References

- `references/ai-review-bundle.json`
- `references/ai-harness-contract.json`
- `references/agent-standards-contract.json`

## Related Standards

- `standards/ai/agent-harness-standard.md`
- `standards/ai/ai-orchestration-standard.md`
- `standards/ai/model-routing-standard.md`
- `standards/ai/token-efficiency-standard.md`
- `standards/ai/verification-standard.md`
- `standards/ai/local-first-ai-standard.md`
- `standards/ai/security-harness-standard.md`
- `standards/ai/repository-lifecycle-standard.md`

## Related Documents

- `knowledge-system.md`
- `execution.md`
- `quality-testing.md`
- `security.md`

## Summary

The AI layer helps APT move faster while staying bounded by doctrine, evidence, and human accountability.
