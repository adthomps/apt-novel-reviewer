---
title: APT Design Principles (What)
kind: principle-hub
domain: design
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/design.md"]
supersedes: ["apt-principles/design.md"]
---

# APT Design Principles

## Overview

APT Design Principles define what the solution is, how it behaves, and how users experience it across states.

Design answers:

- What is the user trying to do?
- What should the system communicate?
- Which states must exist?
- Which interaction patterns are reused?
- Which visual rules protect clarity?

## Purpose

Design keeps product behavior, interface structure, and visual language coherent before implementation spreads decisions across components, routes, and copy.

## Core Principles

### 1. Clarity over cleverness

If an interface requires explanation, it is not clear enough.

### 2. Structure over decoration

Organization, hierarchy, and state clarity matter more than ornament.

### 3. Systems over screens

Design reusable patterns, not isolated pages.

### 4. Complete states are required

Every meaningful workflow needs loading, empty, success, error, and disabled states where applicable.

### 5. Consistency beats novelty

Predictable interaction patterns reduce cognitive load and implementation drift.

## Standards / Rules

- Use APT visual tokens instead of one-off colors, spacing, radius, shadows, or motion.
- Use Apt-prefixed presentational components where the project provides them.
- Keep UI components free of business logic and direct API calls.
- Use calm motion only: subtle fade, transition, or hover lift.
- Keep copy concise, precise, and non-marketing.
- Treat accessibility states as part of the design, not a later fix.
- Public APT surfaces should use the full APT design system unless a project has an approved brand layer.
- Critical design lint failures block promotion unless a decision record accepts the exception.

## UI Component Implementation Standard

For APT-aligned React, TypeScript, and Tailwind projects, shadcn/ui is the default UI implementation foundation unless the project requires VPDS or another approved enterprise design system.

shadcn/ui should be treated as repo-owned source code, a composable UI pattern system, a registry-based distribution model, and an agent-friendly way to apply consistent UI across repositories. Components installed from shadcn are owned by the repo and may be modified to fit APT tokens, naming, accessibility, and product workflow needs.

Use a layered component model:

- `components/ui` for shadcn primitives.
- `components/apt` for reusable Apt-prefixed wrappers.
- `components/blocks` for product, domain, and workflow blocks.

Agents and implementers must inspect existing structure, installed components, `components.json`, aliases, Tailwind configuration, global CSS tokens, and enterprise design-system requirements before adding shadcn components. Reuse existing primitives and wrappers before creating one-off UI.

Preserve accessibility, keyboard behavior, focus states, semantic structure, ARIA behavior, design tokens, CSS variables, Tailwind utilities, and APT naming conventions when adapting primitives.

Do not use shadcn/ui when the project is not React/Tailwind, when VPDS or another enterprise design system is mandatory, when transactional email constraints apply, or when a simpler static surface does not need component infrastructure.

## Baseline Visual Language

- Dark-first background with deep navy/cosmic tones.
- Glass surfaces may be used for cards and major panels.
- Blue is the primary brand and action color for primary calls to action, links, focus rings, and high-frequency emphasis.
- The restricted accent is secondary and reserved for support semantics such as section identity, large callouts, charts, and success treatment.
- Inter is the primary UI and prose typeface where the project can load it; the system font stack is the compatibility fallback.
- IBM Plex Mono is the technical companion for code, CLI, token values, file trees, prompts, and API examples.
- Motion should be subtle and short.

Canonical token roles from the current APT runtime:

```text
background: --background
surface: --card
primary: --primary
accent: --accent
text: --foreground
border: --border
radius-sm: 0.85rem
radius-md: 1.1rem
radius-lg: 1.35rem
motion-fast: 140ms
motion-normal: 220ms
```

## Content Voice and Naming

APT copy is precise, technical, and non-marketing. It should read like an experienced builder documenting decisions, not a campaign trying to create urgency.

- Use calm declarative sentences, clear imperatives, and honest constraints.
- Use impersonal instructional voice in doctrine and product UI; reserve first person for personal biography or author context.
- Use short stable navigation labels such as Home, Labs, Proof, Principles, Insights, and About where those surfaces exist.
- Use sentence case for most headings and body copy. Short uppercase labels may be used for eyebrows when the style is already established.
- Avoid hype, exclamation, decorative emoji in chrome, and vague claims that cannot be backed by artifacts or evidence.
- Treat disclaimers, AI-use notes, demo status, and evolving-reference notes as first-class content in footers, detail pages, and supporting metadata.

Recurring APT tagline structure may use short paired clauses such as "Systems over screens. Decisions over demos." Treat these as compact identity signals, not filler copy.

## Brand Color Decision

APT uses a mostly blue visual system by design. Blue carries the brand mark, default primary calls to action, focus rings, links, and high-frequency emphasis because it anchors the calm technical identity of Applied Practical Thinking.

The restricted accent is intentionally secondary. It may create contrast for explicit section identity, selected support states, badges and tags, large callouts, chart accents, and success treatment where relevant. It should not become the default CTA, hover, focus, or active navigation color unless a project records an explicit brand decision.

## Color Roles and Interaction Rules

Color choices must start from semantic role, not visual preference.

- Blue is for brand identity, primary calls to action, links, focus rings, and high-frequency action emphasis.
- The restricted accent is for explicit section identity, selected support states, badges and tags, large callouts, chart accents, and success treatment.
- Neutral surfaces are for default navigation, secondary buttons, inactive tabs, cards, panels, dividers, and disabled surfaces.
- Danger, warning, and success colors are semantic feedback colors. Do not use them as general decoration or to create arbitrary variety.
- Disabled treatment should reduce contrast and interaction affordance without hiding the control or changing its meaning.
- Raw colors require a design decision record. Implementation should use the semantic aliases in `references/design-tokens.json` even when an alias maps to an existing base token value.

## Full Design System Standard

The APT design system covers:

- semantic color tokens for background, surfaces, borders, text, navigation, action, focus, selection, disabled, accent, success, warning, and danger
- Inter-first typography with clear hierarchy, `0` body letter spacing, and IBM Plex Mono for technical material
- stable spacing and responsive constraints for boards, grids, toolbars, cards, and repeated items
- global header shells that use the APT hybrid top-navigation template for brand identity, route-aware navigation, and optional utility actions
- global footer shells that use the compact APT footer template for product/site navigation and legal metadata
- restrained surfaces with no nested cards or decorative page-section cards
- action components that use shared button, icon, menu, tab, toggle, slider, and input patterns
- complete state design for loading, empty, success, error, disabled, permission, offline, and degraded states
- content naming and messaging that is precise, honest, and matched to user intent
- accessibility expectations for contrast, focus, keyboard use, reduced motion, and readable text wrapping

Token and lint contracts live in `references/design-tokens.json` and `references/design-lint-gates.json`.

## Working Backwards Design Artifacts

Demo/mock artifacts and end-user docs are design evidence, not polish. A demo or mock should test whether the intended user can understand the offer, workflow, states, and recovery path before implementation hardens the wrong interaction.

End-user docs should describe how the target user starts, succeeds, recovers, and gets support. When demo/mock evidence is deferred, the reason and risk should be visible in the Working Backwards package.

## Brand, Background, and Iconography

APT's visual signature is a dark-first cosmic surface with restrained glass, blue action emphasis, and a small set of reusable identity elements.

- The cosmic background may use a deep navy base, subtle radial primary/accent glows, and quiet starfield layers. It should support hierarchy, not compete with content.
- Avoid photographic hero backgrounds for canonical APT doctrine/product surfaces unless the page is explicitly about a real person, place, product, or object that must be inspected.
- The AptEmblem is the preferred brand mark: a circular A badge with primary-blue border/glow treatment. Use it in headers, footers, auth shells, docs chrome, and hero identity moments.
- Use Lucide-style outline icons for interface controls and card leading icons. Icons should inherit semantic text color and remain secondary to labels and state.
- Do not use emoji in product chrome, navigation, headings, buttons, or status controls. If emoji appears in markdown content tables, it should be content evidence, not UI decoration.
- Glow is a signature treatment for the emblem and selected hero/data moments. It should not become a generic decoration on every card.

## Interaction Primitives

APT interfaces should compose from shared primitives before inventing new interaction shapes.

Required primitive families include:

- navigation: top navigation, sidebar navigation, tabs, breadcrumbs, pagination, and stepper/wizard progress
- controls: buttons, icon buttons, switches, checkboxes, radios, sliders, segmented controls, quantity steppers, search fields, chips, and file actions
- disclosure: accordion, tooltip, popover, dropdown menu, select, modal, and sheet/dialog patterns
- feedback: inline alerts, banners, toasts, badges, status dots, progress, spinner, skeleton, avatar, rating, and success/error confirmation
- technical content: inline code, keyboard shortcuts, syntax-aware code blocks, copy actions, and language/file labels

Primitive states must cover default, hover, focus-visible, active/selected, disabled, loading, invalid, destructive, and reduced-motion variants where applicable.

## Data Visualization

Charts are part of the design system, not decorative art.

- Single-series charts use primary blue as the lead color.
- Multi-series charts use the chart ramp in order: blue, teal, purple, orange, and pink.
- Teal may highlight one series or insight when it carries real support, success, or chart-accent meaning.
- Red, amber, and success colors appear in charts only when they represent actual status or risk.
- Charts should live inside stable dark surfaces with muted axis labels, clear titles, and concise interpretation notes.
- Dense dashboards should use neutral status pills with small semantic dots rather than flooding tables with colored badges.

## Surface Patterns

APT product surfaces reuse a small set of recognizable patterns:

- Portfolio and product pages use the cosmic brand shell, clear identity, restrained hero composition, proof-oriented cards, and concise calls to action.
- Insights/content pages use filterable cards, honest metadata, readable summaries, and editorial cover imagery only where it serves content browsing.
- Dashboard/admin surfaces use a scan-first shell with sidebar or topbar navigation, KPI tiles, charts, tables, filters, and stable operational state treatment.
- Docs/principles browsers use a three-column pattern when space allows: document tree, article body, and on-this-page navigation.
- Account flows use focused auth cards, clear validation, password visibility, consent/terms handling, settings tabs, unsaved-change warnings, and explicit destructive sections.
- Transactional email uses table-based layout, inline styles, flattened token colors, a preheader, one primary call to action, and preference/unsubscribe or compliance links where applicable.
- Pattern libraries should include modal/dialog variants, onboarding checklist states, empty states, and full-page 403/404/500 errors.

The vendored design reference kit in `examples/ui/design-reference-kit/` is evidence for these patterns. It is not a competing doctrine source.

## Header Template Pattern

APT product, doctrine, and tool surfaces should use a hybrid top-navigation pattern that combines Applied's route-aware accessibility behavior with APT Coach's practical app shell.

The header contract is:

- outer shell: sticky top header with subtle bottom border, `bg-background/80` or `bg-card/80`, and backdrop blur
- inner width: standard container or project max width with a stable `h-14` to `h-16` rhythm
- brand block: small APT/product emblem, product/site name, and optional Applied Practical Thinking label
- desktop navigation: route-aware links in a compact segmented or pill treatment, with active state using primary or neutral selected surface roles
- grouped navigation: use dropdowns or grouped sections for operational clusters such as training, docs, workflow, or admin tools
- utility area: optional theme, account/avatar, help, profile, settings, or external resource actions, visually separated from primary navigation
- mobile navigation: drawer, sheet, or stacked panel with the same link set, active route state, Escape handling where available, and no hidden-only routes
- metadata/context: compact desktop tools may show runtime, model, project, or environment context on the right side instead of account controls

Keep the header dense but calm. It should orient the user and expose the next likely action without becoming a hero section or duplicating page content.

## Footer Template Pattern

APT product and doctrine sites should use the compact footer pattern proven in `apt-dream-to-reality` unless a project records a brand-layer exception.

The footer contract is:

- outer shell: top border using `border-border/60`, subtle `bg-card/55`, and optional backdrop blur
- inner width: standard container with `px-4 py-8 md:py-10`
- primary layout: `grid grid-cols-1 gap-8 md:grid-cols-4`
- brand block: first column group spans two desktop columns and includes a small APT emblem, product/site name, Applied Practical Thinking label, and one concise description
- link groups: two short columns with `text-sm` headings, `space-y-2` links, muted default text, and foreground hover state
- divider: one horizontal border at `my-6`
- metadata row: stacked on mobile and horizontal on desktop, using `text-sm` legal text and optional `text-xs` build, license, disclaimer, or AI-use note

Keep the footer compact. It should confirm identity, expose the most useful routes, and close the page without becoming a second sitemap or marketing section.

## Required Artifacts

- UX flow
- State map
- Interaction rules
- Acceptance criteria
- Design review checklist
- Token/component notes for any new pattern
- Primitive inventory for new controls, feedback, disclosure, and navigation behavior
- Content voice notes for public, docs, account, email, and product surfaces
- Chart semantics when data visualization is introduced
- Email-client constraints when transactional email is introduced

## Good Example

For a new document browser, define:

- empty state when no documents match
- loading state while metadata is fetched
- error state with retry and support context
- success state with filters, results, and active selection
- disabled state for actions that require a selected document

## Bad Example

Building only the happy path screen and letting errors, empty states, keyboard behavior, and support messaging be invented during implementation.

## AI Prompt Example

```text
Design the UX behavior for this feature using APT Design Principles.

Input:
- Feature intent:
- Primary user:
- Critical workflow:
- Known constraints:

Return:
1. UX flow
2. Required states
3. Interaction rules
4. Copy guidance
5. Acceptance criteria
```

## Related Checklists

- `checklists/design-review-checklist.md`

## Related Examples

- `examples/ui/dashboard-layout-pattern.md`
- `examples/ui/navigation-layout-pattern.md`
- `examples/ui/footer-layout-pattern.md`

## Related Prompts

- `prompts/design-review-prompt.md`

## Related References

- `references/design-tokens.json`
- `references/design-lint-gates.json`

## Related Documents

- `thinking.md`
- `architecture.md`
- `system-standards.md`

## Summary

Design turns the problem into a coherent user experience with complete states and reusable patterns.
