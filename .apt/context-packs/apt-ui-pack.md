---
title: APT UI Context Pack
version: v1
last_updated: 2026-06-22
owner: APT
status: draft
kind: "context-pack"
domain: "ai"
source_paths: ["apt-principles/context-packs/apt-ui-pack.md"]
---

# APT UI Context Pack

## Purpose

Use this pack for React/Vite apps, public websites, portfolio surfaces, dashboards, design-system work, and UI pattern reviews. It keeps UI decisions tied to design doctrine, implementation examples, and review gates.

## Use When

- Reviewing a user-facing screen, navigation model, dashboard, or docs browser.
- Aligning a prototype or Lovable-generated app with APT design expectations.
- Creating public showcase material where visual quality and state coverage matter.
- Checking whether design-system primitives, tokens, and patterns are reused consistently.

## Avoid When

- The change is only API behavior, database behavior, or deployment configuration.
- The UI has security-sensitive flows that need the security pack in addition to this pack.
- The review depends on live browser evidence that has not been captured.

## Source Docs

- [Design](../principles/design/README.md)
- [System Standards](../principles/system-standards/README.md)
- [Quality & Testing](../principles/execution/quality-and-testing.md)
- [Documentation Standards](../standards/documentation/documentation-standards.md) for docs and learning surfaces
- [Design Tokens](../references/design-tokens.json)
- [Design Lint Gates](../references/design-lint-gates.json)
- [Design Reference Intake](../docs/design-reference-intake.md)
- shadcn/ui project files in the target repo, including `components.json`, component folders, aliases, Tailwind config, and global CSS/token files when present

## Required Checks

- [Design Review Checklist](../checklists/design-review-checklist.md)
- [Quality & Testing Checklist](../checklists/quality-testing-checklist.md)
- [Documentation Checklist](../checklists/documentation-checklist.md) when the UI is a docs or learning surface.

## Examples And Prompts

- [Navigation Layout Pattern](../examples/ui/navigation-layout-pattern.md)
- [Dashboard Layout Pattern](../examples/ui/dashboard-layout-pattern.md)
- [Docs Principles Browser Pattern](../examples/ui/docs-principles-browser-pattern.md)
- [Intent-Based UI Navigation Showcase](../examples/showcases/intent-based-ui-navigation.md)
- [Design Review Prompt](../prompts/design-review-prompt.md)

## Exact-Read Requirements

Before final UI edits, read the affected component files, relevant design tokens, the design checklist, and any example being copied. For React, TypeScript, and Tailwind projects, inspect existing shadcn primitives, APT wrappers, product blocks, `components.json`, aliases, Tailwind configuration, global CSS tokens, and enterprise design-system requirements before adding components. Browser screenshots or visual QA evidence are required before claiming public showcase readiness.

## Mandatory Vs Recommended

Mandatory checks cover hierarchy, interaction states, accessibility, responsive behavior, and validation evidence. Recommended support includes context-pack summaries, screenshots, design references, and public showcase notes.
