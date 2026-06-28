---
title: "UI Context Pack"
kind: "context"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/context/ui/README.md"]
---

# UI Context Pack

Use for frontend workflows, accessibility, responsive behavior, and UI reviews.

Load:

- product context
- routes/pages/components
- design or UX standards
- `components.json`, import aliases, Tailwind config or global CSS, and installed shadcn components when present
- `components/ui`, `components/apt`, and `components/blocks` layering
- screenshots when available
- tests for user workflows

Focus on user intent, state handling, and task completion.

For React, TypeScript, and Tailwind projects, treat shadcn/ui as the default repo-owned component foundation unless VPDS or another approved enterprise design system is required. Inspect existing structure before adding primitives, wrappers, or blocks.
