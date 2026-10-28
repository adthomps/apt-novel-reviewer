---
title: "APT Design Changelog"
kind: changelog
domain: design
status: active
owner: APT
last_updated: 2026-10-18
source_paths: ["apt-principles-agents/design/VERSION", "apt-principles-agents/design/tokens/APT-TOKENS.json"]
---

# APT Design Changelog

Each entry matches a `design/VERSION` value. Consumers record the version they synced in `.apt/installation.json` (`designVersion`). Run `node scripts/apt-assets.mjs audit-workspace --workspace-root ..` to see which repos are behind.

## 2.2.0 - 2026-10-18

Hover is quiet again, and selection is blue. The teal accent is gone from UI chrome (DR-016).

- **Hover:** `accent` is a quiet blue-grey surface: `220 22% 19%` dark and `220 30% 91%` light. `accent-foreground` is the theme foreground. `sidebar-accent` matches it. Ghost and outline buttons, menus, dropdowns, the sidebar, and docs navigation keep using `bg-accent` / `focus:bg-accent`, and they now get the quiet surface.
- **Selected:** a faint primary tint plus a 2px primary bar on the inline-start edge (`bg-primary/10 border-s-2 border-primary`). Sidebar and docs navigation items gain a `selected` spec. This matches the existing `navActive` and `selected` aliases, and `selectedSupport` is now primary too.
- **Charts:** `chart-2` is orange (the old `chart-4`), `chart-4` is pink (the old `chart-5`), and `chart-5` is a new sky blue (`205 90% 70%` dark, `205 85% 40%` light). Blue next to orange is the most distinct pair for the first two series.
- **Components:** the teal `accent` tag and button variants are removed. Use the `primary` tag variant.
- **Checks:** contrast now covers `accent-foreground` on `accent`.
- **Migration:**
  1. Sync the `design` manifest.
  2. Replace product-local teal selected styling with `bg-primary/10 border-s-2 border-primary`.
  3. Move `accent` tags and badges to `primary`.
  4. Check charts that relied on `chart-2` being teal.
  5. Run `node .apt/design/bin/apt-design-check.mjs`.

## 2.1.2 - 2026-10-05

Sidebar and docs navigation use the same teal hover as menus.

- **Sidebar:** `sidebar-accent` and `sidebar-accent-foreground` match `accent` in both themes. `hover:bg-sidebar-accent` is the teal highlight, not a grey surface.
- **Docs navigation:** sidebar items and docs navigation items are named beside menus and dropdowns. Their hover background is `accent`.
- **Preview:** `design/generated/apt-preview.html` includes the sidebar and docs navigation sample. Historical standalone HTML in `apt-design-reference` is not rebuilt.

## 2.1.1 - 2026-10-05

Motion and hover highlights match the flat token reference.

- **Motion:** `fast` / `normal` / `slow` are `140ms` / `220ms` / `360ms`. Generated stylesheets use those values as `--motion-fast`, `--motion-medium`, and `--motion-slow`. Hover-lift uses `140ms`.
- **Hover:** menu items and dropdown options use the teal accent highlight, the same role ghost and outline buttons already use. Radix highlights those options with `focus:bg-accent`. `focus-visible:bg-accent` still fails, because the keyboard focus ring stays blue.
- **Preview:** `design/generated/apt-preview.html` is the portable preview of these tokens. Historical standalone HTML in `apt-design-reference` stays unchanged.
- **Migration:** sync the `design` manifest. Products that copied `150ms` / `200ms` / `300ms` should take the generated values.

## 2.1.0 - 2026-10-04

Canonical tokens moved into apt-principles-agents (APT-019).

- **Source:** `design/tokens/APT-TOKENS.json` is now the single source. Generated artifacts live in `design/generated/` and ship through the `design` manifest.
- **Contrast (APT-017):** dark primary family is `220 70% 61%` (5.14:1 on background, 4.68:1 on card).
- **Status and muted text (APT-018):**
  - `success`, `success-foreground`, `warning` and `warning-foreground` are canonical in both themes.
  - Dark `muted-foreground` and `apt-text-secondary` are `220 10% 60%`.
- **Sidebar:** `sidebar-*` tokens are now canonical. The values come from the APT site with no change.
- **Migration:**
  1. Sync the `design` manifest.
  2. Add `apt-design.json`.
  3. Import `.apt/design/generated/apt-tokens.css` (or `apt-tokens.dark-first.css`) instead of hand-copied values.
  4. Run `node .apt/design/bin/apt-design-check.mjs` in CI.
