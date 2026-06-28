---
title: Token Efficiency Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/token-efficiency-standard.md"]
---

# Token Efficiency Standard

Extracted from `../../ai-agent-framework.md`. See that file for canonical AI doctrine and context-governance rules.

## Purpose

Token efficiency keeps AI workflows faster, cheaper, safer, and easier to review. The goal is sufficient context, not minimal context at any cost. Agents must include the context required for correctness, safety, privacy, security, and approval.

## Required Practices

- Use source maps before loading full files.
- Use context packs for repeated domains such as architecture review, security review, repository lifecycle, or AI harness evaluation.
- Reuse prompts instead of copying large instruction blocks.
- Search or retrieve targeted passages before broad ingestion.
- Give specialized agents only the context needed for their role.
- Summarize validation output when the full raw log is not required.
- Preserve exact evidence when line-level findings, legal/security language, or error output matters.

## Context Packs

A context pack is a small, reusable bundle of:

- purpose
- audience or agent role
- canonical source list
- required excerpts or source map
- forbidden sources
- validation commands
- output contract
- freshness notes

Context packs should point to canonical docs instead of reprinting them. If a pack needs a long excerpt, explain why that excerpt is required.

## Failure Conditions

- Every agent receives full-repo context regardless of task.
- Reusable prompts copy doctrine instead of linking to it.
- Context omits security, approval, or validation rules needed for safe work.
- Large logs are pasted when a concise evidence summary would be sufficient.
- Summaries replace exact evidence for a finding that needs file, line, command, or error details.
- Token reduction causes the agent to guess canonical sources.

## APT Agent Blueprint

APT Agent should implement token efficiency through context planning. Suggested modules are:

- source-map generator
- context-pack registry
- prompt-template resolver
- excerpt selector
- validation-summary compressor
- freshness checker for cached context
- context-budget estimator

The implementation should report what context was loaded and what was intentionally omitted, especially for high-risk or cross-repo work.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns concrete context-pack directories, token-budget tooling, and prompt-loading behavior. `apt-principles-agents` defines sufficient-context standards, reuse expectations, and review evidence.

## Related

- `../../ai-agent-framework.md`
- `ai-orchestration-standard.md`
- `model-routing-standard.md`
- `../../examples/ai-agent/token-efficient-context-pack-example.md`
- `../../knowledge-system.md`
