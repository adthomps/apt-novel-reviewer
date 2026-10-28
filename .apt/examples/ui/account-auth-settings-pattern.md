---
title: Account Auth Settings Pattern
version: v1
last_updated: 2026-06-13
owner: APT
status: draft
kind: "example"
domain: "ui"
source_paths: ["apt-principles/examples/ui/account-auth-settings-pattern.md"]
---

# Account Auth Settings Pattern

## Context

An APT app needs login, signup, and settings flows that are calm, secure, and consistent with the product surface.

## Problem

Account screens are often treated as isolated forms. That leads to inconsistent validation, unclear recovery, unsafe destructive actions, and settings pages that do not show what changed.

## APT Principles Applied

- Design: complete states and predictable patterns.
- Security: authentication and destructive actions must respect trust boundaries.
- Operations: account failures should be explainable and supportable.
- Quality: validation and recovery paths need evidence.

## Solution

Use a focused account shell with the AptEmblem, clear form hierarchy, inline validation, and explicit recovery paths.

Required behavior:

- Login includes email/password, OAuth where supported, password visibility, remember-me semantics, and forgot-password path.
- Signup includes name/email/password where applicable, password-strength feedback, terms/consent handling, and duplicate or invalid-email recovery.
- Settings use tabs or grouped sections for profile, notifications, security, and destructive actions.
- Unsaved changes use a warning alert and clear save/cancel controls.
- Destructive actions use a dedicated danger zone and confirmation appropriate to impact.

Use `examples/ui/design-reference-kit/ui_kits/account/` as reference evidence.

## Example Structure

```text
Account surface:
Auth methods:
Validation states:
Recovery paths:
Settings groups:
Unsaved-change behavior:
Destructive action:
Security notes:
Acceptance criteria:
```

## Tradeoffs

A complete account flow can feel heavier than a simple login card. The added states are justified when the account surface controls identity, preferences, notifications, or destructive user data actions.

## Common Mistakes

- Happy-path-only login or signup.
- Password controls without accessible labels or recovery.
- Unsaved settings changes with no warning.
- Destructive actions styled like ordinary secondary buttons.
- Toast-only errors for blocking account failures.

## Related Documents

- `../../design.md`
- `../../security.md`
- `../../checklists/security-review-checklist.md`
- `feedback-alert-toast-pattern.md`
- `design-reference-kit/ui_kits/account/index.html`
