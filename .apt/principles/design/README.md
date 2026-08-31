---
title: APT Design Principles (What)
kind: principle-hub
domain: design
status: active
owner: APT
version: v1
last_updated: 2026-08-16
source_paths: ["apt-principles/design.md", "apt-design-reference/README.md"]
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

- Use the target project's semantic visual tokens instead of one-off colors, spacing, radius, shadows, or motion.
- Reuse the target project's presentational primitives before adding new ones.
- Keep UI components free of business logic and direct API calls.
- Use motion to communicate state or spatial change, not as decoration.
- Keep copy concise, precise, and non-marketing.
- Treat accessibility states as part of the design, not a later fix.
- Define and review every meaningful state, including loading, empty, success, error, disabled, permission, offline, and degraded states where applicable.
- Critical design or accessibility failures block promotion unless a decision record accepts the exception.

## Ownership Boundary

This repository owns portable design doctrine: decision principles, required states and artifacts, reusable review criteria, semantic token roles, prompts, and examples.

Each target repository owns its visual identity, literal token values, typography choices, component APIs, framework selection, route shell, product copy, and runtime implementation. Target-owned choices may conform to APT doctrine without becoming universal APT requirements.

The public `applied-practical-thinking` repository is an inspectable APT implementation and showcase, not the source of every project's brand layer. Its authored design system, tokens, component contracts, and surface patterns live under `apps/web/docs/design/` in that repository.

## UI Component Implementation Standard

Use the component system already owned by the target repository. Before adding a primitive, inspect its framework, enterprise-system obligations, aliases, token source, existing component tiers, accessibility behavior, and distribution model.

A healthy component architecture separates low-level primitives, reusable product patterns, and domain/workflow composition. The exact directories and naming belong to the target repository. Framework-specific guidance, including shadcn/ui, is an adapter or target-repo decision rather than universal doctrine.

When adapting a primitive, preserve semantic structure, keyboard behavior, focus visibility, ARIA behavior, design tokens, and documented states.

## Baseline Visual Language

APT-aligned visual systems should be calm, legible, structurally consistent, and driven by semantic roles. They must define roles for background, surface, text, border, primary action, focus, selection, disabled controls, feedback states, spacing, shape, elevation, and motion.

Literal colors, fonts, radii, timing values, and decorative treatments are brand-layer choices owned by the target repository. The public APT site demonstrates one dark-first, blue-led interpretation; it is an example, not a mandatory skin for every APT-aligned product.

## Content Voice and Naming

APT copy is precise, calm, honest, and non-marketing. It should help a user decide or act without manufacturing urgency.

- Use calm declarative sentences, clear imperatives, and honest constraints.
- Use impersonal instructional voice in doctrine and product UI; reserve first person for personal biography or author context.
- Use short, stable navigation labels that match the target user's language.
- Use sentence case for most headings and body copy. Short uppercase labels may be used for eyebrows when the style is already established.
- Avoid hype, exclamation, decorative emoji in chrome, and vague claims that cannot be backed by artifacts or evidence.
- Treat disclaimers, AI-use notes, demo status, and evolving-reference notes as first-class content in footers, detail pages, and supporting metadata.

## Brand Color Decision

Color identity is a target-repository decision. A project should record why its primary, accent, and feedback colors exist; verify contrast; and keep those roles consistent across components, charts, content, and states.

The public APT site owns its mostly blue brand decision and restricted accent policy in its local design system.

## Color Roles and Interaction Rules

Color choices must start from semantic role, not visual preference.

- Primary action, navigation, links, focus, selection, and brand identity need explicit roles; they need not share one literal color.
- Accent colors require a defined purpose and must not compete indiscriminately with primary actions.
- Neutral surfaces are for default navigation, secondary buttons, inactive tabs, cards, panels, dividers, and disabled surfaces.
- Danger, warning, and success colors are semantic feedback colors. Do not use them as general decoration or to create arbitrary variety.
- Disabled treatment should reduce contrast and interaction affordance without hiding the control or changing its meaning.
- Implementation should use semantic aliases. Raw values outside the target token source require an explicit design decision.

## Full Design System Standard

A target design system should cover:

- semantic color tokens for background, surfaces, borders, text, navigation, action, focus, selection, disabled, accent, success, warning, and danger
- typography roles with a clear hierarchy and readable prose and technical material
- stable spacing and responsive constraints for boards, grids, toolbars, cards, and repeated items
- navigation and page shells that preserve orientation, route state, and access to likely next actions
- restrained surfaces with explicit hierarchy rather than decoration-driven nesting
- action components that use shared button, icon, menu, tab, toggle, slider, and input patterns
- complete state design for loading, empty, success, error, disabled, permission, offline, and degraded states
- content naming and messaging that is precise, honest, and matched to user intent
- accessibility expectations for contrast, focus, keyboard use, reduced motion, and readable text wrapping

Portable token roles and lint contracts live in `references/design-tokens.json` and `references/design-lint-gates.json`. Literal implementations remain local.

## Working Backwards Design Artifacts

Demo/mock artifacts and end-user docs are design evidence, not polish. A demo or mock should test whether the intended user can understand the offer, workflow, states, and recovery path before implementation hardens the wrong interaction.

End-user docs should describe how the target user starts, succeeds, recovers, and gets support. When demo/mock evidence is deferred, the reason and risk should be visible in the Working Backwards package.

## Brand, Background, and Iconography

Brand marks, backgrounds, imagery, and icon libraries are target-owned. Their use should reinforce identity and hierarchy without obscuring content or replacing labels and state.

- Use one coherent icon language and give controls accessible names.
- Treat decorative imagery as optional; use factual imagery when a real person, object, place, or result must be inspected.
- Keep identity treatments restrained enough that repeated surfaces remain readable.
- Document asset provenance, licensing, and generated-media disclosure where relevant.

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

- Choose a chart from the comparison or decision the user needs to make.
- Use a documented, accessible series ramp and distinguish data without relying on color alone.
- Reserve feedback colors for actual status or risk semantics.
- Include a clear title, labels, units, source, relevant uncertainty, and a concise interpretation when needed.
- Provide a table, text alternative, or equivalent access path when the chart carries essential information.

## Surface Patterns

Reusable surface patterns should state the user job, anatomy, supported states, accessibility behavior, content rules, constraints, and validation evidence. A target repo should select patterns because they fit the workflow—not because they are visually familiar.

The examples under `examples/ui/` are portable evidence. The richer portfolio, docs, insights, dashboard, account, and other public specimens in `applied-practical-thinking/apps/web/docs/design/versions/v2/patterns/` are target-owned implementations.

## Header Template Pattern

Headers should establish identity and location, expose the most likely navigation and utility actions, preserve active-route state, and provide equivalent keyboard and mobile access. Exact height, positioning, styling, grouping, and brand treatment belong to the target repository.

## Footer Template Pattern

Footers should confirm identity, expose useful closing routes, and include applicable legal, privacy, support, build, license, disclaimer, and AI-use metadata. Their layout and styling belong to the target repository. Avoid turning the footer into a duplicate sitemap or marketing page.

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
- `docs/design-reference-intake.md`

## Summary

Design turns the problem into a coherent user experience with complete states and reusable patterns.
