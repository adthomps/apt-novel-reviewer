---
title: APT Coding Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "standard"
domain: "coding"
source_paths: ["apt-principles/standards/coding/coding-standards.md"]
---

# Coding Standards

These standards apply to all code in APT-aligned repositories. They enforce the APT principle of consistency over novelty.

## Language Defaults

Unless the repository explicitly chooses otherwise:

- **TypeScript** over JavaScript — explicit types prevent category errors.
- **Strict mode** enabled — no implicit `any`, no unchecked nulls.
- **pnpm** for package management in monorepos.

## Naming Conventions

| Context | Convention | Example |
|---------|-----------|---------|
| Files | `kebab-case` | `user-profile.ts` |
| React components | `PascalCase` | `UserProfile.tsx` |
| Functions and variables | `camelCase` | `getUserById` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_RETRY_COUNT` |
| CSS classes | `kebab-case` | `user-card__header` |
| Database tables | `snake_case` | `user_profiles` |
| Database columns | `snake_case` | `created_at` |

## File Structure

- One component or module per file.
- Colocate tests with the module they test (e.g., `user.ts` + `user.test.ts`).
- Group by feature, not by type — `features/invoices/` not `components/invoices/`.

## Functions

- Prefer small, single-purpose functions.
- Avoid side effects in pure logic functions.
- Name functions as verbs: `getUser`, `validateEmail`, `formatDate`.
- Do not use magic numbers — name them as constants.

## Error Handling

- Catch errors at the boundary, not deep in business logic.
- Prefer explicit error types or result types over generic `Error` catches.
- Do not swallow errors silently — log or re-throw with context.
- User-facing error messages must not expose internal implementation detail.

## Imports

- Use absolute imports over relative imports where tooling supports it.
- Do not import from implementation files in tests — use the public module interface.
- Avoid circular imports.

## Comments

- Prefer self-documenting code over comments.
- Write a comment when the WHY is non-obvious: a hidden constraint, a workaround for a known bug, or a subtle invariant.
- Do not comment the WHAT — well-named identifiers do that.
- Do not leave inline fixme markers in main branch code without a linked issue.

## Security in Code

- Never hardcode secrets, tokens, or credentials.
- Never log or expose sensitive data (passwords, tokens, PII).
- Validate input at the boundary — do not trust client-supplied data.
- Use parameterized queries — never concatenate SQL or query strings.

## AI-Generated Code

AI-generated code follows the same standards as human code:

- Same review process
- Same test requirements
- Same naming and structure conventions
- Must be reviewed before merge

## Related

- `system-standards.md` — consistency and contract rules
- `execution.md` — spec-driven development and increment size
- `checklists/execution-readiness-checklist.md`
- `security.md` — security-specific coding rules
