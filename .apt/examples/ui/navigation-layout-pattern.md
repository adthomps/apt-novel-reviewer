---
title: Navigation Layout Pattern
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/navigation-layout-pattern.md"]
---

# Navigation Layout Pattern

## Context

A doctrine or product site needs predictable navigation across docs, examples, and tools.

## Problem

Navigation drift causes duplicate sections, unclear labels, and users who cannot tell where they are.

## APT Principles Applied

- Design: clear information architecture.
- Knowledge: one canonical location per topic.
- System standards: stable paths and labels.

## Solution

Use short stable labels and match navigation to canonical structure.

```text
Principles
Examples
Checklists
Prompts
Templates
Archive
```

## Example Structure

Each navigation item should define:

- label
- path
- description
- canonical source or owner
- whether it is active, reference, or archived
- required permission or audience if applicable
- related validation or source import path

Example navigation contract:

```json
{
  "label": "Principles",
  "path": "/principles",
  "description": "Canonical APT doctrine",
  "source": "apt-principles-agents/apt-principles-agents.md",
  "status": "active"
}
```

## Tradeoffs

Flat navigation is easier to scan, but large systems may need secondary indexes inside sections.

## Common Mistakes

- Multiple labels for the same concept.
- Archived content shown as active guidance.
- Dropdowns that hide core paths.
- Navigation generated from folders without applying audience, status, or source rules.

## Implementation Notes

For `applied-practical-thinking`, the public principles browser should import from `apt-principles-agents` and label generated pages by source. For downstream projects, keep local `docs/apt/` pages separate from canonical APT pages so users can distinguish doctrine from local adoption notes.

## Related Documents

- `../../design.md`
- `../../knowledge-system.md`
