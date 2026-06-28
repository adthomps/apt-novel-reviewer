---
title: APT Docs Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-docs-pack.md"]
---

# APT Docs Context Pack

## Purpose

Use this pack for documentation sites, knowledge-system work, repository docs, templates, public principles browsers, and canonical doc maintenance. It keeps docs clear about source of truth, local decisions, and reusable learning.

## Use When

- Reviewing a documentation-only repo or docs section in a product repo.
- Updating templates, examples, public docs, or project adoption records.
- Checking whether documentation duplicates doctrine instead of linking to it.
- Preparing a docs release or public showcase update.

## Avoid When

- The work is a code-only change with no docs surface.
- A public claim depends on product maturity that has not been validated.
- The target docs include security, payment, or compliance statements that have not been source-checked.

## Source Docs

- [Knowledge System](../principles/execution/knowledge-and-learning.md)
- [System Standards](../principles/system-standards/README.md)
- [Release & Change Management](../principles/execution/release-and-change-management.md)
- [Documentation Standards](../standards/documentation/documentation-standards.md)
- [Metadata Versioning Contract](../references/metadata-versioning-contract.json)

## Required Checks

- [Documentation Checklist](../checklists/documentation-checklist.md)
- [Knowledge System Checklist](../checklists/knowledge-system-checklist.md)
- [Release Readiness Checklist](../checklists/release-readiness-checklist.md) for public docs releases.

## Examples And Prompts

- [Canonical Doc Update Example](../examples/knowledge/canonical-doc-update-example.md)
- [Documentation Structure Showcase](../examples/showcases/documentation-structure.md)
- [Knowledge Review Prompt](../prompts/knowledge-review-prompt.md)
- [Repo Alignment Review Prompt](../prompts/repo-alignment-review.md)

## Exact-Read Requirements

Before final doc edits, read the target docs, linked canonical sources, and any public-facing claims. Do not rely on compressed summaries when checking links, status, ownership, or release readiness.

## Mandatory Vs Recommended

Mandatory evidence includes source links, owner/status metadata, local decision records, and validation results. Recommended support includes examples, templates, diagrams, and context-pack summaries for future agents.
