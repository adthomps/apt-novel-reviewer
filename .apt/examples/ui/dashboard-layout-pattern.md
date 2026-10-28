---
title: Dashboard Layout Pattern
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/dashboard-layout-pattern.md"]
---

# Dashboard Layout Pattern

## Context

A user needs to scan status, identify blockers, and take action quickly.

## Problem

Dashboards often become card piles with unclear hierarchy and no action model.

## APT Principles Applied

- Design: clarity over feature density.
- System standards: reusable layout pattern.
- Operations: status should be explainable.

## Solution

Use a scan-first structure:

```text
Header: title, scope, primary action
Summary band: 3-5 key metrics
Main area: prioritized work/status list
Side area: filters, context, or recent activity
Footer/detail: evidence, logs, or documentation links
```

## Example Structure

States to define:

- loading metrics
- empty dashboard
- partial data failure
- action disabled
- stale data warning

State map:

```text
loading -> skeleton dashboard
empty -> setup or first action
success -> metrics plus work queue
degraded -> partial data with support-safe message
error -> retry, request ID, and support path
```

## Tradeoffs

A constrained dashboard may show less at once, but it makes the most important decisions clearer.

## Common Mistakes

- Equal visual weight for every card.
- No empty or partial failure state.
- Primary action hidden below low-priority metrics.
- Decorative cards that make repeated operational scanning slower.

## Implementation Notes

Operational dashboards should privilege scanning, comparison, and repeated action. Use stable grid tracks and fixed card roles so loading text, filters, or state badges do not shift the entire layout.

## Related Documents

- `../../design.md`
- `../../checklists/design-review-checklist.md`
