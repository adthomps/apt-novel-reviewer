---
title: Feedback Alert Toast Pattern
version: v1
last_updated: 2026-10-03
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/feedback-alert-toast-pattern.md"]
---

# Feedback Alert Toast Pattern

## Context

APT workflows need to tell users what happened, what is happening, and what to do next without turning every state into a modal interruption.

## Problem

Feedback often drifts into vague banners, decorative status colors, or transient toasts that disappear before users can recover from an error.

## APT Principles Applied

- Design: complete states are required.
- Quality: failure modes need evidence and recovery.
- Operations: support-safe errors should include context such as retry and request ID where applicable.
- Security: destructive and permission states should not hide risk.

## Solution

Use the smallest feedback surface that fits the consequence.

```text
inline alert -> state tied to a form, panel, or workflow step
banner -> page-wide condition, outage, permission, or degraded mode
toast -> transient confirmation for non-blocking success or background status
modal/dialog -> user decision, irreversible action, or focused form task
full-page error -> route-level 403, 404, 500, or unavailable state
```

Color is semantic only, using canonical tokens: blue (`primary`) for information/action, green (`success`) for success, amber (`warning`) for warning, red (`destructive`) for error, and neutral for passive status. Feedback should include text, iconography, and placement so meaning does not depend on color alone.

Use `examples/ui/design-reference-kit/ui_kits/account/` and `examples/ui/design-reference-kit/ui_kits/patterns/` as reference implementations.

## Example Structure

```text
Event:
Feedback surface:
Severity:
Message:
Primary action:
Secondary action:
Dismiss behavior:
Recovery path:
Support context:
```

## Tradeoffs

Persistent feedback can add visual weight. Transient feedback is calmer, but it is not suitable for errors, permission failures, destructive confirmations, or anything users may need to reference later.

## Common Mistakes

- Using a toast for a blocking error.
- Showing success with color only and no confirmation copy.
- Omitting retry, request ID, or support context for recoverable failures.
- Using green, amber, or red to create visual variety instead of semantic feedback.

## Related Documents

- `../../design.md`
- `../../operations-support.md`
- `../../checklists/design-review-checklist.md`
- `design-reference-kit/ui_kits/patterns/index.html`
- `design-reference-kit/ui_kits/account/index.html`
