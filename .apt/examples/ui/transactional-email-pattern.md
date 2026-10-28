---
title: Transactional Email Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/transactional-email-pattern.md"]
---

# Transactional Email Pattern

## Context

An APT product needs branded notification, digest, reminder, review-request, or system-status emails.

## Problem

Email clients do not behave like browsers. Designs that depend on modern layout, CSS variables, external scripts, or complex responsive behavior often fail in inboxes.

## APT Principles Applied

- Design: structure and clarity over decoration.
- System Standards: email is a distinct delivery surface with its own constraints.
- Operations: notification emails should be supportable and honest.
- Release: email changes need preview evidence before promotion.

## Solution

Use an email-safe APT template:

```text
preheader
outer background
table-based message container
brand lockup
eyebrow and headline
short body copy
optional stat or highlight rows
one primary CTA
footer with preferences, unsubscribe, disclaimer, and sender context
```

Flatten token colors to email-safe hex values, inline critical styles, and avoid browser-only CSS such as CSS variables, grid, unsupported filters, or JavaScript. Preserve the APT voice: concise, precise, and non-marketing.

Use `examples/ui/design-reference-kit/ui_kits/email/` as reference evidence.

## Example Structure

```text
Email type:
Trigger:
Recipient:
Preheader:
Primary CTA:
Required links:
Flattened token colors:
Client preview evidence:
Fallback risks:
```

## Tradeoffs

Email-safe HTML is less elegant than product UI code, but reliability across mail clients matters more than implementation purity.

## Common Mistakes

- Building email with app components or browser-only CSS.
- Missing preheader, unsubscribe, preferences, or sender context.
- Including multiple competing primary calls to action.
- Using decorative color that conflicts with feedback semantics.

## Related Documents

- `../../design.md`
- `../../system-standards.md`
- `../../release-change-management.md`
- `design-reference-kit/ui_kits/email/index.html`
