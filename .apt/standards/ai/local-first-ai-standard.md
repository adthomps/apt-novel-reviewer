---
title: Local-First AI Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/local-first-ai-standard.md"]
---

# Local-First AI Standard

Extracted from `../../ai-agent-framework.md`. See that file for canonical AI doctrine and model-routing principles.

## Purpose

Local-first AI prefers repo-local evidence, deterministic tools, local models, and local execution before external AI services when they can complete the work safely. The goal is not local-only purity; the goal is controlled escalation.

## Local-First Defaults

Prefer local execution for:

- repository search and file inspection
- linting, testing, building, and validation
- schema checks and static analysis
- low-risk classification and extraction
- drafting from local canonical docs
- summarizing local validation output
- repository lifecycle scanning

Escalate beyond local execution when the task needs unavailable capability, stronger reasoning, broader context, external integration, multimodal analysis, or human judgment.

## Data Boundary Rules

- Do not send secrets, production credentials, personal data, private customer data, or regulated data to external AI without an approved boundary.
- Prefer redacted summaries when external reasoning is useful but raw data is not allowed.
- Record when external AI is used for high-risk or sensitive workflows.
- Keep local project context owned by the target repo.

## Failure Conditions

- A workflow sends repo or user data externally before checking whether local tools are sufficient.
- Local results are ignored because an external model is available.
- A local model is used beyond its demonstrated capability without verification or escalation.
- Data sensitivity is not part of routing.
- External AI usage cannot be explained or audited.

## APT Agent Blueprint

APT Agent should implement local-first behavior as part of routing and context planning. Suggested modules are:

- local tool inventory
- local model capability registry
- data-sensitivity classifier
- redaction and summary path
- escalation rule engine
- external-call audit log

The implementation should make local-first decisions visible so teams can tune the balance between speed, privacy, quality, and cost.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns local model discovery, local tool inventories, and external-call audit implementation. `apt-principles-agents` defines the local-first posture, data boundary rules, and escalation principles.

## Related

- `../../ai-agent-framework.md`
- `model-routing-standard.md`
- `token-efficiency-standard.md`
- `repository-lifecycle-standard.md`
- `../../references/agent-standards-contract.json`
