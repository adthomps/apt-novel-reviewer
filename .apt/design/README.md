---
title: "APT Design Source"
kind: guide
domain: design
status: active
owner: APT
last_updated: 2026-10-18
source_paths: ["apt-principles-agents/design/"]
---

# APT Design Source

This folder is the single source of APT design tokens (DR-015 / APT-019). Products receive it through the `design` manifest, installed under `.apt/design/` in each repository.

| Path | What it is |
|---|---|
| `tokens/APT-TOKENS.json` | Canonical token values (Tokens Studio format). The only file to edit by hand. |
| `VERSION`, `CHANGELOG.md` | Design version recorded by consumers as `designVersion`, with migration notes. |
| `generated/apt-tokens.css` | Generated token CSS: `:root` light, `.dark` dark. |
| `generated/apt-tokens.dark-first.css` | Generated token CSS: `:root` dark, `.light` light. |
| `generated/tailwind-preset.cjs` | Generated Tailwind v3 preset (colors, radius, shadows, durations). |
| `generated/apt-theme.css` | Generated Tailwind v4 `@theme inline` mapping. |
| `generated/tokens.ts` | Generated typed token values. |
| `generated/apt-preview.html` | Generated portable preview. Open the file directly. It is not the historical standalone HTML in `apt-design-reference`. |
| `bin/apt-design-check.mjs` | Contrast, token-drift and design-lint check driven by `apt-design.json`. |

The generated folder is deliberately not called `dist/`: nearly every product's `.gitignore` ignores `dist/`, which would leave `.apt/design/dist/` out of fresh clones and CI.

## Using it in a product

1. Add the manifest. `node ../apt-principles-agents/scripts/apt-assets.mjs install --target . --manifests design` installs it, and later syncs keep it current.
2. Add `apt-design.json` at the repository root (schema: `.apt/references/apt-design.schema.json`):

   ```json
   {
     "$schema": "./.apt/references/apt-design.schema.json",
     "tier": 1,
     "css": "apps/web/src/index.css",
     "lint": { "roots": ["apps/web/src"], "allowlist": ["apps/web/src/components/ui/chart.tsx"] }
   }
   ```

3. Import the generated tokens in the product stylesheet. Use `apt-tokens.css` or `apt-tokens.dark-first.css` to match the theme layout, and keep only product-specific variables locally:

   ```css
   @import "../../../.apt/design/generated/apt-tokens.dark-first.css";
   ```

4. Tailwind v3: `presets: [require("../../.apt/design/generated/tailwind-preset.cjs")]`. Tailwind v4: `@import` `apt-theme.css` after the token CSS.
5. Run the check in a script and in CI: `node .apt/design/bin/apt-design-check.mjs`.

## Hover and selected color

APT is blue-led. UI chrome has one accent hue, the primary blue, plus neutrals and status colors.

- `accent` is the quiet hover surface, a blue-grey step above the card. Ghost and outline buttons, menu items, dropdown options, sidebar items, and docs navigation items use it on hover. Sidebar hover uses `sidebar-accent`, which has the same value.
- Selected items use a faint primary tint and a 2px primary bar on the inline-start edge (`bg-primary/10 border-s-2 border-primary`). This matches `navActive` and `selected` in the flat reference.
- Blue is also the color for primary actions, links, and focus. Success, warning, and destructive are for status only.

Menu and dropdown options use `focus:bg-accent` with `focus:text-accent-foreground`, because Radix highlights the option by moving focus to it. Keyboard focus on buttons and other controls stays a blue `focus-visible` ring. `focus-visible:bg-accent` fails the design check.

Motion is `140ms` / `220ms` / `360ms` (`--motion-fast`, `--motion-medium`, `--motion-slow`). The flat reference and the generated stylesheets use the same three values.

Open `generated/apt-preview.html` for a portable view of the current tokens. `apt-design-reference` still has historical standalone exports, including `APT Patterns (standalone).html`. Leave those files unchanged. They are not generated from these tokens, and `APT Primitives (standalone).html` is not in this workspace.

## Product code checks

Some files in this folder can fail a product's strict type or lint check. The product still runs, and those files should stay unchanged in the product. The product may exclude the installed design folder from that check.

To make the files pass, fix them here, run `node scripts/build-design.mjs`, sync the `design` manifest, and then remove the product's exclusion.

## Tiers

- **Tier 1 (APT products):** values must equal `generated/` except listed `exclusions`. Each exclusion needs a `reason` and a `decision` record.
- **Tier 2 (brand products):** own palette allowed. The APT semantic token names must exist, and contrast must pass.
- **Tier 3 (legacy or no UI):** guidance only. The check exits successfully without checking.

The tier is set in `references/workspace-consumers.json`, not by the product. `apt-design.json` must declare the same tier, and `audit-workspace` lists any repository that doesn't under `designTierMismatch`. Moving a repository between tiers is a decision record here.

**Lint baseline.** A repository with existing raw colours can set `lint.baseline` to its current finding count. The check fails only when findings rise above it, and asks for the baseline to be lowered when they fall, so the count only goes down. Tier 1 repositories should reach 0.

## Changing a token

1. Edit `tokens/APT-TOKENS.json`.
2. Run `node scripts/build-design.mjs`.
3. Bump `VERSION` and add a `CHANGELOG.md` entry with migration notes.
4. Run `npm run check`, then commit.
5. Run `node scripts/apt-assets.mjs audit-workspace --workspace-root ..` and read `designBehind` to see which repositories to sync.
