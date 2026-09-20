---
name: agent-routing
description: Use when work must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.
kind: skill
status: active
owner: APT
last_updated: 2026-08-16
source: consolidated APT guidance
title: "Agent Routing"
domain: "ai-agents"
source_paths: ["apt-principles-agents/skills/ai-agents/agent-routing/SKILL.md"]
---

# Agent Routing

## Purpose

Produce a reviewable agent routing outcome that is grounded in repository evidence and explicit about uncertainty.

## When to Use

Use for planning, design, implementation review, migration, troubleshooting, or documentation where the task must route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs.

## Inputs

- Goal, audience, scope, constraints, and success criteria.
- Relevant source files, contracts, examples, logs, and decisions.
- Known risks, assumptions, dependencies, and approval boundaries.

## Process

1. Classify the task by consequence, uncertainty, reversibility, data sensitivity, required tools, external side effects, and accountable owner.
2. Build the smallest task packet that supplies exact sources, constraints, expected output, validation, approval boundaries, and stop conditions.
3. Select the least-privileged capable skill, agent perspective, model class, tools, and context; explain why a cheaper or less autonomous route is insufficient when escalating.
4. Define handoffs and delegation limits so every subtask retains provenance, a next owner, and the same or stricter approval boundary.
5. Evaluate the result against representative cases, prohibited outcomes, unsupported claims, tool effects, and target-repository evidence before accepting it.
6. Record the routing decision, sources, tool use, evaluation, residual risk, human review, and fallback or rollback path.

## Outputs

A concise recommendation, evidence map, required changes, risks, validation plan, support/documentation impact, and approval status.

## Quality Bar

The output is practical, source-backed, audience-aware, testable, reversible where possible, and does not state assumptions as facts.

## Domain Checklist

- Treat **Agent Routing** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: task packet, context, routing, handoffs, evaluation, residual risk, approval.
- Use the least-privileged route that can meet the quality bar, and increase autonomy only when evaluation and recovery evidence justify it.
- Never let delegation erase source provenance, tool-effect visibility, stop conditions, or accountable human ownership.
- State what is verified, what is assumed, and what requires specialist or human approval.

## Required Reading

Read the canonical Ai Agents principle hub, the closest enforceable standard, the applicable checklist, and exact target-repository evidence.
## References

- [AI principles](../../../principles/ai/README.md)
- [Templates](../../../templates/README.md)
- [Agents](../../../agents/README.md)
