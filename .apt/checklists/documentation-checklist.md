---
title: APT Documentation Checklist
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "checklist"
domain: "documentation-checklist"
source_paths: ["apt-principles/checklists/documentation-checklist.md"]
---

# APT Documentation Checklist

## Scope

Use this checklist for documentation sites, repo docs, public principle pages, templates, examples, and local APT adoption records. It verifies that documentation is useful, source-linked, current, and safe to reuse without becoming a competing doctrine copy.

Run it before publishing public docs, adding a documentation showcase, or claiming that another repo has a reliable APT documentation layer.

## Required Checks

- [ ] The document has a clear owner, status, audience, and source-of-truth relationship.
- [ ] Canonical APT doctrine is linked instead of duplicated when the topic is already governed by root docs.
- [ ] Local decisions, exceptions, and project-specific implementation details are separated from reusable APT rules.
- [ ] Required metadata and frontmatter are present where the repository contract expects them.
- [ ] Links to local files, examples, prompts, checklists, and references are accurate.
- [ ] The document names when to use the guidance and when not to use it.
- [ ] Public-facing claims about maturity, production status, security, or compliance are backed by evidence.
- [ ] Related validation commands, reports, or acceptance criteria are named.
- [ ] Context-pack or compressed-summary guidance identifies when exact source reads are still required.

## Failure Conditions

- Documentation copies doctrine into a second source of truth instead of linking to the canonical file.
- The document hides project-specific assumptions inside reusable APT guidance.
- Links are stale, examples are disconnected from governing docs, or checklists are referenced but not run.
- Public docs describe a prototype, generated app, or partial implementation as production-ready.
- Security, payment, compliance, or final validation guidance relies only on compressed summaries.

## Evidence Required

- Paths to docs reviewed and their canonical source links.
- Link-check or validation output where available.
- Related checklist or prompt references used during review.
- Decision records for local deviations.
- Public release or showcase evidence when the docs are externally visible.

## Pass Standard

Documentation passes when it is source-linked, operational, accurate for the project's maturity, and explicit about validation evidence and exact-read requirements.

## Related Documents

- `../knowledge-system.md`
- `../system-standards.md`
- `../standards/documentation/documentation-standards.md`
- `../context-packs/apt-docs-pack.md`
- `../examples/showcases/documentation-structure.md`
