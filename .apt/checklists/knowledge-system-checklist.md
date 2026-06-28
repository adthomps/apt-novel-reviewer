---
title: Knowledge System Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "checklist"
domain: "knowledge-system-checklist"
source_paths: ["apt-principles/checklists/knowledge-system-checklist.md"]
---

# Knowledge System Checklist

## Scope

Use this checklist when adding, changing, replacing, or publishing doctrine, examples, prompts, templates, references, project profiles, or operational knowledge.

It protects the source-of-truth model for both humans and AI agents. Run it when a change could create drift between canonical guidance, copied project docs, generated public views, or historical source material kept outside this package.

## Required Checks

- [ ] Canonical source is identified.
- [ ] Audience is clear: public, internal, support, AI, or mixed.
- [ ] Frontmatter is present and current.
- [ ] Related docs, examples, prompts, or checklists are linked.
- [ ] Duplicated guidance is removed or intentionally cross-referenced.
- [ ] Historical/reference content is not treated as active doctrine.
- [ ] AI-ingestible docs are structured with stable headings.
- [ ] Ingest, query, feedback, provenance, retention, and confidence expectations are named when knowledge is used by AI or retrieval.
- [ ] Incidents, support findings, failed validation, or release outcomes become a durable artifact or explicit non-action.

## Failure Conditions

- Same rule is redefined in multiple places.
- A new artifact has no owner, status, or version.
- Historical content is referenced as active guidance.
- AI agents must infer which source is canonical.
- Support or incident learning is closed without a linked artifact or accepted non-action.

## Evidence Required

- Canonical doc path.
- Related artifact links.
- Drift or historical-source notes when replacing older material.
- Validation result.
- Public-site or downstream-project consumers affected by the change.
- Decision record when source-of-truth ownership changes.
- Ingest/query/feedback and retention notes for retrieval or assistant systems.
- Incident-to-knowledge evidence when operational findings drive a change.

## Pass Standard

The change has one canonical home, related artifacts point to it, copied or generated consumers have a refresh path, and historical material is clearly non-canonical. If two active files now teach the same rule differently, the checklist fails.

## Related Documents

- `../knowledge-system.md`
- `../examples/knowledge/canonical-doc-update-example.md`
- `../examples/knowledge/incident-to-knowledge-example.md`
- `../prompts/knowledge-review-prompt.md`
