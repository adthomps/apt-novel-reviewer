---
title: Design Review Checklist
version: v1
last_updated: 2026-04-28
owner: APT
status: draft
kind: "checklist"
domain: "design-review-checklist"
source_paths: ["apt-principles/checklists/design-review-checklist.md"]
---

# Design Review Checklist

## Scope

Use this checklist for user-facing routes, workflows, components, navigation, content surfaces, and design-system changes.

Run it before a UI change is merged or before a public page becomes a showcase example. It checks behavior, hierarchy, visual-system alignment, content clarity, and state coverage.

## Required Checks

- [ ] User goal and primary workflow are clear.
- [ ] Loading, empty, success, error, and disabled states are defined where applicable.
- [ ] Interaction patterns reuse existing APT patterns.
- [ ] New controls, navigation, disclosure, feedback, and technical-content elements reuse the established primitive families before introducing new UI shapes.
- [ ] Visual styling uses tokens and approved components.
- [ ] React, TypeScript, and Tailwind UI uses shadcn/ui as the default repo-owned component foundation unless VPDS or another approved enterprise design system is required.
- [ ] Existing component structure, `components.json`, aliases, Tailwind configuration, global CSS tokens, and installed primitives were inspected before adding shadcn components.
- [ ] shadcn primitives are composed or adapted in `components/ui`, reusable Apt-prefixed wrappers live in `components/apt`, and product workflow blocks live in `components/blocks`.
- [ ] Typography uses Inter or the approved system fallback for UI/prose and IBM Plex Mono for code, token values, CLI examples, and technical snippets.
- [ ] Iconography uses Lucide-style outline icons or the approved AptEmblem pattern; product chrome does not use emoji as decoration.
- [ ] Primary actions, links, focus rings, and high-frequency action emphasis use the blue primary/action role.
- [ ] Active navigation, hover, and focus states use primary or neutral selected-surface roles; the restricted accent is limited to explicit support semantics such as badges, callouts, charts, and success treatment.
- [ ] Default navigation, secondary actions, inactive tabs, cards, panels, and disabled surfaces use neutral surface roles.
- [ ] Danger, warning, and success colors are reserved for semantic feedback.
- [ ] Charts use the approved chart ramp, lead with primary blue, and reserve semantic colors for real status or risk.
- [ ] Alerts, banners, toasts, badges, progress, skeletons, and status dots carry clear state meaning and do not rely on color alone.
- [ ] Account/auth/settings flows include validation, password visibility where relevant, consent handling, unsaved-change warnings, and explicit destructive-action treatment.
- [ ] Docs and content surfaces preserve source clarity, metadata, readable hierarchy, anchors or table-of-contents behavior where useful, and honest disclaimer/status notes.
- [ ] Transactional email uses table-based layout, inline-safe styles, flattened token colors, a preheader, one primary call to action, and compliance/preference links where applicable.
- [ ] Hover, focus, active, selected, and disabled states are visually distinct and token-based.
- [ ] Raw color values and visual-system exceptions have a decision record.
- [ ] Copy is concise, precise, and non-marketing.
- [ ] APT voice is calm, declarative, evidence-oriented, and avoids hype or unsupported claims.
- [ ] Focus states and keyboard behavior are accounted for.
- [ ] New patterns include acceptance criteria.
- [ ] Design deviations are documented.

## Failure Conditions

- Happy-path-only design.
- One-off colors, spacing, or component behavior.
- One-off shadcn additions that ignore existing primitives, wrappers, blocks, aliases, tokens, or enterprise design-system constraints.
- Unclear color hierarchy between primary action, secondary action, navigation, selection, and status.
- Teal used as the default CTA color without an approved brand decision.
- Danger, warning, or success colors used as decoration instead of semantic feedback.
- Missing or ambiguous focus, hover, active, selected, or disabled color states.
- Missing reusable primitive coverage for controls, disclosure, feedback, navigation, or technical content.
- Chart colors used as decoration or arbitrary variety.
- Icons, emoji, typography, or imagery that conflict with the APT visual system.
- Transactional email built with browser-only layout assumptions, missing preheader, or missing preference/compliance links.
- Account or destructive flows without validation, recovery, confirmation, or safe disabled states.
- UI component owns business logic or direct API calls.
- Text, states, or actions are ambiguous.
- Marketing-flavored copy that weakens precise product or doctrine meaning.
- Accessibility states are missing.

## Evidence Required

- State map or UX flow.
- Screenshots or preview notes when visual.
- Acceptance criteria.
- Token/component notes for navigation, actions, status, selection, focus, hover, and disabled color roles.
- shadcn/component-layer notes covering primitives, Apt wrappers, product blocks, registry source, and exceptions.
- Primitive inventory for new or changed controls, disclosure, feedback, navigation, and technical-content elements.
- Chart semantics and color-role notes when data visualization is present.
- Surface-pattern notes for docs, content, product, account, dashboard, or email flows.
- Reference to `../examples/ui/design-reference-kit/` when a vendored kit pattern is used as evidence.
- Accessibility, contrast, and keyboard review notes.
- Decision record for any visual-system exception.

## Pass Standard

The experience should be understandable without explanation, use shared tokens and patterns, include complete states, and avoid unsupported visual inventions. If users cannot tell what to do, where they are, or what happened, the design does not pass.

## Related Documents

- `../design.md`
- `../thinking.md`
- `../examples/ui/dashboard-layout-pattern.md`
- `../examples/ui/navigation-layout-pattern.md`
- `../examples/ui/design-system-primitives-pattern.md`
- `../examples/ui/feedback-alert-toast-pattern.md`
- `../examples/ui/chart-data-visualization-pattern.md`
