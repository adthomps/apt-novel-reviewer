---
title: APT Agent Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-agent-pack.md"]
---

# APT Agent Context Pack

## Purpose

Use this pack for agent instructions, reusable prompts, harness reviews, AI readiness checks, model routing, context minimization, and cross-tool standards alignment. It preserves the split between APT doctrine and the separate `apt-principles-agents` distribution system.

## Use When

- Updating `AGENTS.md`, scoped agent files, prompts, or AI review workflows.
- Reviewing whether a repo has enough agent guidance to work safely.
- Creating a context pack for AI-assisted planning or repo alignment.
- Deciding whether a downstream repo should use managed agent standards.

## Avoid When

- The task requires installer, profile detection, path mapping, or tool-native distribution behavior that belongs in `apt-principles-agents`.
- The review makes security-sensitive or destructive recommendations without exact source reads.
- The agent output would claim compliance without checklist evidence.

## Source Docs

- [AI & Agent Framework](../principles/ai/README.md)
- [Knowledge System](../principles/execution/knowledge-and-learning.md)
- [Security](../principles/security-risk/README.md)
- [Agent Harness Standard](../standards/ai/agent-harness-standard.md)
- [Token Efficiency Standard](../standards/ai/token-efficiency-standard.md)
- [Repository Lifecycle Standard](../standards/ai/repository-lifecycle-standard.md)

## Required Checks

- [AI Agent Review Checklist](../checklists/ai-agent-review-checklist.md)
- [Repo Alignment Checklist](../checklists/repo-alignment-checklist.md)
- `npm run validate:ai` for readiness scoring where applicable.
- `npm run sync:check` when this repo's agent guidance or standards contract changes materially.

## Examples And Prompts

- [Agent Prompt Contract Example](../examples/ai-agent/agent-prompt-contract-example.md)
- [Token Efficient Context Pack Example](../examples/ai-agent/token-efficient-context-pack-example.md)
- [Agent Instruction Structure Showcase](../examples/showcases/agent-instruction-structure.md)
- [Update Agent Standards Prompt](../prompts/update-agent-standards.md)
- [Generate Context Pack Prompt](../prompts/generate-context-pack.md)

## Exact-Read Requirements

Before editing agent files or recommending managed standards, read the target repo's active agent instructions, local project context, relevant prompts, and any `.agent-standards` or tool-native files involved. A pack summary is not enough to update managed instructions.

## Mandatory Vs Recommended

Mandatory evidence includes source-of-truth links, allowed tool boundaries, validation requirements, and explicit approval points. Recommended support includes context-pack summaries, model-routing decisions, and reusable prompt examples.
