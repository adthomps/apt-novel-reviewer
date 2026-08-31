---
title: APT Knowledge System (Learn & Scale)
kind: principle-hub
domain: execution
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/knowledge-system.md"]
supersedes: ["apt-principles/knowledge-system.md"]
---

# APT Knowledge System

## Overview

APT Knowledge System defines how documentation, examples, decisions, and reusable patterns are captured, maintained, and used by humans and AI agents.

Knowledge answers:

- What is canonical?
- Who is the audience?
- How is knowledge reused?
- How is drift prevented?
- What should AI agents read before acting?

## Purpose

The knowledge system converts work into reusable understanding. It prevents decisions, standards, and implementation lessons from becoming hidden memory.

## Core Principles

### 1. Document once, reuse everywhere

Each topic should have one canonical source and references should point to it.

### 2. Separate internal and external knowledge

Public docs, internal runbooks, and AI agent instructions may overlap, but they serve different audiences.

### 3. Structure knowledge for humans and AI

Use clear headings, frontmatter, examples, and stable paths.

### 4. Keep knowledge versioned

Important doctrine, prompts, examples, and standards belong in version control.

### 5. Avoid duplication

Duplicate guidance creates drift unless there is a sync or validation process.

## Standards / Rules

- Use frontmatter for canonical docs and build-kit files.
- Keep historical exports out of active guidance unless explicitly linked.
- Update related examples, prompts, and checklists when doctrine changes.
- Record decisions that alter architecture, security, release, or AI behavior.
- Keep AI-ingestible docs concise, structured, and source-aware.
- Knowledge ingest, query, and feedback systems must preserve provenance, status, confidence, and retention expectations.
- Support feedback, incidents, failed validation, and release outcomes should become doc updates, tests, runbooks, examples, or explicit non-actions.
- Sensitive or regulated knowledge should define audience, visibility, redaction, retention, and escalation rules before ingestion.
- Preserve canonical source paths when public sites use shorter route labels or legacy aliases.

Canonical doctrine uses `knowledge-system` for this layer. Public routes may use shorter labels such as Knowledge, but aliases such as `knowledge-engine` should point back to `knowledge-system.md` rather than becoming a second doctrine source.

## Required Artifacts

- Canonical doc
- Related examples
- Related checklists or prompts
- Decision log entry for durable changes
- Historical-source note when replacing older guidance
- Ingest, query, feedback, and retention notes when knowledge is used by a retrieval or assistant system
- Incident or release learning note when operations produce reusable guidance

## Knowledge Artifact Types

- Principle docs
- Examples
- Checklists
- Prompts
- Templates
- References
- Runbooks
- Decision records
- Project profiles
- Release notes
- Working Backwards packages
- Outcome trackers

## Runtime Knowledge Contracts

When APT knowledge is used by a search, retrieval, assistant, or public documentation system, it should preserve source, audience, status, and confidence. The portable baseline contracts are:

- `KnowledgeChunk` for source-aware chunks
- `IngestReport` for ingestion and indexing outcomes
- `QueryResponse` for grounded responses with sources and confidence

Knowledge graphs such as Graphify are a governed discovery layer for cross-document and cross-repo relationships. Use them to find drift, weak evidence links, and surprising relationships, but preserve canonical truth in source docs, code, schemas, decisions, project profiles, and validation reports. For the APT workspace, `reports/GRAPHIFY_RUNBOOK.md` defines the operator workflow and output policy.

Project profiles are also knowledge artifacts. They bridge real implementation, portfolio storytelling, and reusable learning for projects such as `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future APT projects.

Feedback should have a closed loop:

```text
support finding or incident
-> triage as doc gap, test gap, UX gap, runbook gap, or accepted non-action
-> update canonical or project-owned artifact
-> record validation or review evidence
-> link the learning from the next release or project profile update
```

## Working Backwards Learning Loop

Outcome trackers convert shipped work into reusable knowledge. A Working Backwards package should define adoption, usage, love or satisfaction, and revenue or business-value signals before release. After release, those results should update docs, examples, tests, runbooks, decisions, or the project profile.

## Good Example

A new API standard is added to `system-standards.md`, demonstrated in `examples/api/rest-api-example.md`, enforced in `checklists/api-standards-checklist.md`, and referenced by `prompts/api-review-prompt.md`.

## Bad Example

The same API rule is described differently in a README, a prompt, a one-shot file, and a route comment.

## AI Prompt Example

```text
Turn these project learnings into APT knowledge artifacts.

Input:
- Decision or incident:
- Affected doctrine:
- Audience:
- Reuse goal:

Return:
1. Canonical doc update
2. Example/checklist/prompt updates
3. Historical-source or drift notes
4. Links to related artifacts
```

## Topic-Specific Guidance

- Treat **Knowledge And Learning** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: increment, acceptance criteria, tests, release, operations, support, learning.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Execution canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [documentation-normalizer](../../agents/docs/documentation-normalizer.md) — Use to consolidate duplicated, stale, or scattered documentation into canonical homes, proposing a merge, move, and delete plan before any edits.

## Related Checklists

- `checklists/knowledge-system-checklist.md`

## Related Examples

- `examples/knowledge/canonical-doc-update-example.md`
- `examples/knowledge/incident-to-knowledge-example.md`

## Related Prompts

- `prompts/knowledge-review-prompt.md`

## Related References

- `references/knowledge-contracts.json`
- `references/project-profile.schema.json`

## Related Documents

- `apt-principles-agents.md`
- `ai-agent-framework.md`
- `operations-support.md`

## Summary

Knowledge turns decisions and outcomes into durable, reusable, versioned assets.
