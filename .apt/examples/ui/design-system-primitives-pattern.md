---
title: Design System Primitives Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/design-system-primitives-pattern.md"]
---

# Design System Primitives Pattern

## Context

An APT product needs reusable controls, navigation, disclosure, feedback, and technical-content elements that can be composed across dashboards, docs, account flows, content surfaces, and product pages.

## Problem

Teams often solve each interaction locally. That creates duplicated tabs, inconsistent controls, unclear focus states, and visual drift across otherwise related surfaces.

## APT Principles Applied

- Design: systems over screens and consistency beats novelty.
- System Standards: shared primitives reduce duplicated behavior.
- Quality: primitive states become repeatable review evidence.
- Knowledge: examples preserve how to reuse the pattern.

## Solution

Start every new UI surface with a primitive inventory before designing page-specific components.

Use these primitive families:

- navigation: top navigation, sidebar navigation, tabs, breadcrumbs, pagination, stepper, and wizard progress
- controls: buttons, icon buttons, switches, checkboxes, radios, sliders, segmented controls, quantity steppers, search, chips, and file actions
- disclosure: accordion, tooltip, popover, dropdown menu, select, modal, and sheet/dialog behavior
- feedback: inline alerts, banners, toasts, badges, status dots, progress, spinner, skeleton, avatar, rating, and confirmation
- technical content: inline code, keyboard shortcuts, syntax-aware code blocks, copy actions, and language/file labels

State coverage:

```text
default -> hover -> focus-visible -> active/selected -> disabled
loading -> empty -> invalid/error -> success -> reduced-motion
```

Use `examples/ui/design-reference-kit/ui_kits/primitives/` as implementation evidence and `references/design-tokens.json` for token roles.

## Example Structure

```text
Surface:
Primitive families used:
Existing primitives reused:
New primitive proposed:
States covered:
Keyboard behavior:
Token roles:
Acceptance criteria:
Reference kit path:
```

## Tradeoffs

A primitive inventory adds a little planning overhead, but it prevents one-off component behavior from spreading into production and documentation.

## Common Mistakes

- Creating a new tab, select, tooltip, or modal because the page feels unique.
- Styling disabled, selected, focus, or invalid states locally.
- Treating icons or badges as decoration instead of state or action signals.
- Missing reduced-motion, keyboard, or screen-reader behavior for interactive primitives.

## Related Documents

- `../../design.md`
- `../../system-standards.md`
- `../../checklists/design-review-checklist.md`
- `../../references/design-tokens.json`
- `design-reference-kit/ui_kits/primitives/index.html`
