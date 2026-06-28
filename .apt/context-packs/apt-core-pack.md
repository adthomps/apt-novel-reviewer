---
title: APT Core Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-core-pack.md"]
---

# APT Core Context Pack

## Purpose

Use this pack for every repo alignment, adoption, audit, or source-of-truth review. It identifies the minimum APT doctrine and evidence model needed before deciding which domain-specific packs apply.

## Use When

- Determining whether a repository should copy, sync, apply, or showcase APT assets.
- Producing a gap report for a project that wants APT alignment.
- Checking whether local docs point back to canonical doctrine instead of drifting.
- Creating a compact context handoff before a deeper domain review.

## Avoid When

- The task is a final security, compliance, payment, or release approval without exact source reads.
- The work needs concrete API, UI, Cloudflare, documentation, or agent standards without the relevant domain pack.
- A downstream repo has project-specific exceptions that have not been read directly.

## Source Docs

- [README](../README.md)
- [APT Principles Framework](../principles/framework.md)
- [Thinking](../principles/thinking/README.md)
- [Execution](../principles/execution/delivery-increments.md)
- [Quality & Testing](../principles/execution/quality-and-testing.md)
- [Release & Change Management](../principles/execution/release-and-change-management.md)
- [Knowledge System](../principles/execution/knowledge-and-learning.md)

## Required Checks

- [Project Adoption Checklist](../checklists/project-adoption-checklist.md)
- [Repo Alignment Checklist](../checklists/repo-alignment-checklist.md)
- `npm run validate` for this source repo before claiming source readiness.
- Target-repo validation commands named in the target project before claiming target readiness.

## Examples And Prompts

- [APT Project Profile Example](../examples/projects/apt-project-profile-example.md)
- [Repo Alignment Review Prompt](../prompts/repo-alignment-review.md)
- [Apply APT Principles Prompt](../prompts/apply-apt-principles.md)
- [Project Adoption Prompt](../prompts/project-adoption-prompt.md)

## Exact-Read Requirements

Before final edits or compliance claims, read the target repo files being assessed, this pack's required checklists, and every canonical doc cited as a source for a finding. Compressed summaries are acceptable for discovery, but final evidence must come from exact source files.

## Mandatory Vs Recommended

Mandatory artifacts are an adoption record, relevant checklist evidence, validation command evidence, and links to canonical APT sources. Recommended artifacts are project profiles, context-pack summaries, showcase examples, and public presentation notes when the project is intended for portfolio use.
