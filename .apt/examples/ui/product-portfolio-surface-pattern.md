---
title: Product Portfolio Surface Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/product-portfolio-surface-pattern.md"]
---

# Product Portfolio Surface Pattern

## Context

APT portfolio and product surfaces need to show identity, proof, experiments, demos, and calls to action while staying faithful to the doctrine.

## Problem

Public pages can become oversized marketing heroes or disconnected card galleries that do not explain what exists, what is proven, and what is experimental.

## APT Principles Applied

- Thinking: state the real problem or offer.
- Design: structure over decoration and clarity over cleverness.
- Release: public surfaces should distinguish proof, prototype, demo, and evolving reference.
- Knowledge: portfolio items should connect back to reusable patterns and evidence.

## Solution

Use the cosmic product shell with clear first-viewport identity, concise value copy, and proof-oriented sections.

Recommended structure:

```text
header with route-aware navigation
hero with APT identity, concise tagline, and one primary action
proof or labs section visible after the hero
cards for individual projects, experiments, or features
status metadata: prototype, live demo, stable proof, evolving reference
footer with brand, useful links, legal/disclaimer, and AI-use note where relevant
```

Use the AptEmblem, blue primary action role, restrained glass surfaces, and concise non-marketing copy. Do not let cosmic background, glow, or cover imagery replace explanation and evidence.

Use `examples/ui/design-reference-kit/ui_kits/portfolio/` and `examples/ui/design-reference-kit/ui_kits/product/` as reference evidence.

## Example Structure

```text
Surface type:
Primary audience:
First-viewport signal:
Primary action:
Proof sections:
Status metadata:
Disclaimer needs:
Reference kit path:
```

## Tradeoffs

The proof-oriented structure is less splashy than pure marketing composition. It better fits APT because it shows what has been built, tested, or learned.

## Common Mistakes

- Hero copy that says little beyond aspiration.
- Cards without status, source, or evidence.
- Decorative page-section cards or nested cards.
- Accent color used as the default CTA.
- Footer missing demonstration, AI-use, or evolving-reference notes where relevant.

## Related Documents

- `../../design.md`
- `../../release-change-management.md`
- `footer-layout-pattern.md`
- `navigation-layout-pattern.md`
- `design-reference-kit/ui_kits/portfolio/index.html`
- `design-reference-kit/ui_kits/product/index.html`
