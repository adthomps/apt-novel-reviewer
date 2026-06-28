---
title: Model Routing Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/model-routing-standard.md"]
---

# Model Routing Standard

Extracted from `../../ai-agent-framework.md`. See that file for canonical AI doctrine and approval expectations.

## Purpose

Model routing chooses the smallest sufficient capability for the task. APT standards must remain independent of vendor names and transient model labels. Implementations may map these capability tiers to current tools, but doctrine describes capability, risk, locality, and cost.

## Routing Principles

- Use deterministic local tools before AI when they can produce the required answer.
- Prefer local-first or lower-cost AI for simple classification, extraction, summarization, formatting, and routine review.
- Escalate capability when the task has high ambiguity, complex architecture tradeoffs, code synthesis, security analysis, multimodal evidence, high-stakes context, or large cross-document reasoning.
- Prefer human review when no model can safely resolve the decision.
- Never route sensitive data to an external model unless the workflow has an approved data boundary.

## Routing Inputs

A routing decision should consider:

- task type
- required capability
- risk level
- data sensitivity
- context size
- latency need
- cost budget
- locality preference
- available deterministic checks
- approval requirement
- fallback behavior

## Required Artifacts

Repeatable AI workflows need a routing policy or decision record. The record should state the default capability tier, escalation triggers, forbidden data flows, fallback behavior, and approval needs.

Do not encode product-specific model names in APT doctrine. A target repo or APT Agent implementation can map capability tiers to current providers in local configuration.

## Failure Conditions

- A workflow always uses the largest available model without evidence.
- A workflow uses a small or local model for high-risk work without verification or escalation.
- A model is selected by brand name rather than capability, risk, cost, and locality.
- Sensitive data is sent to external AI without an approved boundary.
- Provider failure leads to invented confident output.
- Routing policy cannot explain when to escalate to a human.

## APT Agent Blueprint

APT Agent should implement routing as a policy engine. Suggested modules are:

- task classifier that outputs domain, risk, capability need, and data sensitivity
- capability registry that maps local tools, local models, remote models, and human review to abstract tiers
- budget and latency evaluator
- escalation engine for ambiguity, failed validation, high-risk data, or low confidence
- decision logger for audit and future tuning

The implementation should make routing inspectable so maintainers can understand why a capability was chosen.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns concrete model registries, local model detection, provider mappings, and routing validation scripts. `apt-principles-agents` defines capability-based routing rules and must avoid vendor- or model-name-specific runtime policy.

## Related

- `../../ai-agent-framework.md`
- `local-first-ai-standard.md`
- `token-efficiency-standard.md`
- `verification-standard.md`
- `../../examples/ai-agent/model-routing-decision-example.md`
- `../../prompts/model-routing-review-prompt.md`
