---
title: Design Reference Kit
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/design-reference-kit.md"]
---

# Design Reference Kit

## Context

`examples/ui/design-reference-kit/` vendors selected source assets from `apt-design-reference` so APT maintainers can inspect concrete visual evidence while evolving canonical doctrine.

## Problem

Without local examples, design doctrine can become too abstract. Copying the entire generated design-reference bundle would also create a second source of truth and add unnecessary weight.

## APT Principles Applied

- Design: reusable patterns should be visible and inspectable.
- Knowledge: evidence should link back to canonical doctrine instead of replacing it.
- Quality: vendored examples make review evidence easier to cite.
- Release: generated or heavy assets should be excluded unless explicitly needed.

## Solution

Keep this folder as a vendored evidence kit, not a doctrine root.

Included:

- `colors_and_type.css`, `styles.css`, `_ds_manifest.json`, and `_adherence.oxlintrc.json`
- `preview/` specimen cards
- `assets/` brand and content reference images
- `ui_kits/` source folders for account, dashboard, docs, email, insights, patterns, portfolio, product, and primitives

Excluded:

- `_ds_bundle.js`
- `APT Patterns (standalone).html`
- `screenshots/`

Canonical rules still live in `../../design.md`, `../../references/design-tokens.json`, and `../../references/design-lint-gates.json`.

## Example Structure

```text
Reference need:
Vendored path:
Canonical rule:
Review evidence:
Accepted deviation:
Follow-up:
```

## Tradeoffs

Vendoring selected assets improves local review but requires occasional resync from `apt-design-reference`. Keeping heavy generated artifacts out avoids making this repo a duplicate design-system distribution.

## Common Mistakes

- Treating vendored files as canonical doctrine.
- Updating kit source without updating `design.md`, checklist gates, or JSON contracts.
- Copying generated bundles when source files and previews are enough.
- Adding screenshots that drift from the source kit without review.

## Related Documents

- `../../design.md`
- `../../checklists/design-review-checklist.md`
- `../../prompts/design-review-prompt.md`
- `../../references/design-tokens.json`
- `../../references/design-lint-gates.json`
