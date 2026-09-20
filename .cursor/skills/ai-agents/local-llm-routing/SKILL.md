---
name: local-llm-routing
description: Use when work must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Local LLM Routing"
domain: "ai-agents"
source_paths: ["apt-principles-agents/skills/ai-agents/local-llm-routing/SKILL.md"]
---

# Local LLM Routing

## Purpose

Produce a reviewable local llm routing outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Classify the task by impact, reversibility, sensitivity, context size, required reasoning, structured-output needs, tools, latency, and validation availability.
2. Record the actual local model, version, runtime, hardware constraints, context limit, tool support, data path, and representative evaluation evidence.
3. Compare local, mid-tier, and stronger-model routes against explicit quality, privacy, cost, latency, reliability, and recovery requirements.
4. Use local models for bounded work such as classification, extraction, formatting, deduplication, or draft summaries only when outputs can be checked deterministically or reviewed proportionately.
5. Escalate on low confidence, context truncation, unsupported tools or formats, validation failure, cross-system reasoning, sensitive/high-accuracy domains, or any protected decision.
6. Preserve the task packet, sources, intermediate result, evaluation, escalation reason, residual risk, and human approval across the handoff.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Local Llm Routing** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: task packet, context, routing, handoffs, evaluation, residual risk, approval.
- Verify local data residency and retention behavior rather than treating “local” as an automatic privacy guarantee.
- Define measurable escalation thresholds for quality, context, tool support, risk, and validation before routing production work.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Ai Agents principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [AI principles](../../../principles/ai/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
