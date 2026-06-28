---
title: "UX Standards"
kind: "standard"
domain: "installable-summaries"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/apt-core/ux-standards.md"]
---

# UX Standards

UX review should begin with user intent and task completion, then evaluate layout, language, interaction states, accessibility, and error recovery.

## UI Component Foundation

For APT-aligned React, TypeScript, and Tailwind projects, use shadcn/ui as the default UI implementation foundation unless the project requires VPDS or another approved enterprise design system.

Treat shadcn/ui as repo-owned source code and a composable pattern system, not as an external black-box component library. Components installed from shadcn may be modified to fit local tokens, naming, accessibility requirements, and product workflows.

Use this layering model:

- `components/ui` for shadcn primitives.
- `components/apt` for reusable APT wrappers such as `AptPageShell`, `AptEmptyState`, `AptStatusBadge`, `AptNextActionPanel`, `AptDataTable`, `AptReviewChecklist`, and `AptDocsLayout`.
- `components/blocks` for domain or product workflow blocks.

Before adding shadcn components, inspect the existing repo structure, package manager, `components.json`, import aliases, Tailwind version, global CSS/token file, installed primitives, local wrappers, and any enterprise design-system requirement. Do not add components blindly.

Do not use shadcn/ui when the project is not React/Tailwind, when VPDS or another enterprise system is mandatory, when transactional email constraints apply, or when a simple static surface does not need component infrastructure.

## Checklist

- Primary user intent is clear on first interaction.
- Navigation supports repeated work, not only first-time discovery.
- Empty, loading, error, and success states are designed.
- Text fits its container across supported viewports.
- Accessibility is treated as product quality.
- UI uses token-based styling, semantic structure, keyboard behavior, focus states, and ARIA behavior from the installed primitives.
