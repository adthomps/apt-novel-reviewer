---
title: Docs Principles Browser Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/docs-principles-browser-pattern.md"]
---

# Docs Principles Browser Pattern

## Context

A doctrine, standards, or reference site needs to render canonical APT material while helping readers move between related documents without losing source clarity.

## Problem

Documentation browsers often hide provenance, collapse hierarchy into generic pages, or omit navigation aids that make long-form material usable.

## APT Principles Applied

- Design: structure over decoration.
- Knowledge: one canonical source per topic.
- System Standards: stable paths and labels protect downstream imports.
- Quality: docs surfaces need reviewable source and state evidence.

## Solution

Use a three-column docs pattern where viewport space allows:

```text
top bar: brand, search, utility links
left rail: grouped document tree with active source
article: breadcrumb, metadata, anchored headings, tables, callouts, code blocks
right rail: on-this-page table of contents
footer: previous/next navigation and source notes
```

The article should preserve canonical source names, status, and metadata. Code blocks use IBM Plex Mono and clear language/file labels. Callouts should distinguish rules, warnings, examples, and lint gates without turning all content into cards.

Use `examples/ui/design-reference-kit/ui_kits/docs/` as reference evidence.

## Example Structure

```text
Document source:
Audience:
Doc tree groups:
Article metadata:
Anchors/TOC:
Search behavior:
Code/callout behavior:
State map:
Validation evidence:
```

## Tradeoffs

The three-column pattern uses more horizontal space than a simple article page. On narrow screens, collapse navigation into drawers or stacked sections while preserving active source and table-of-contents access.

## Common Mistakes

- Rendering generated docs without source path or status.
- Hiding core doctrine routes inside dropdowns.
- Using decorative cards around every section.
- Omitting code labels, anchors, metadata, or previous/next paths.

## Related Documents

- `../../design.md`
- `../../knowledge-system.md`
- `navigation-layout-pattern.md`
- `design-reference-kit/ui_kits/docs/index.html`
