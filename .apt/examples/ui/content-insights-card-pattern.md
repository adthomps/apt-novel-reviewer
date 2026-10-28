---
title: Content Insights Card Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/content-insights-card-pattern.md"]
---

# Content Insights Card Pattern

## Context

APT public surfaces need to present articles, podcasts, case studies, and learning resources in a way that is browsable without becoming promotional noise.

## Problem

Content cards often drift into marketing tiles: vague titles, decorative cover art, weak metadata, and filters that do not help readers decide what to open.

## APT Principles Applied

- Thinking: content should expose the decision or learning it supports.
- Design: hierarchy and metadata help scanning.
- Knowledge: reusable learning should be findable and clearly categorized.
- Quality: public content needs source, status, and review evidence.

## Solution

Use an insights card with clear metadata and restrained imagery:

```text
type or eyebrow
title
summary
author/source or project context
date or status
topic tags
optional cover image
primary read/listen/view action
```

Cover imagery should stay dark, simple, and content-specific. Editorial serif display may appear inside legacy or marketing cover images, but product chrome and article UI should keep Inter. Filters should map to real content categories, not arbitrary visual labels.

Use `examples/ui/design-reference-kit/ui_kits/insights/` as reference evidence.

## Example Structure

```text
Content type:
Reader goal:
Metadata:
Filter category:
Summary:
Primary action:
Source/status:
Image treatment:
Empty state:
```

## Tradeoffs

Rich metadata takes more authoring discipline than a simple title grid. It improves scanning and prevents content surfaces from becoming ornamental.

## Common Mistakes

- Cover art that overwhelms title and metadata.
- Tags that do not map to real browsing decisions.
- Marketing claims without evidence or source.
- Missing empty state when filters return no content.

## Related Documents

- `../../design.md`
- `../../knowledge-system.md`
- `../../thinking.md`
- `design-reference-kit/ui_kits/insights/index.html`
