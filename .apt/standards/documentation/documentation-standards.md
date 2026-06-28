---
title: APT Documentation Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "standard"
domain: "documentation"
source_paths: ["apt-principles/standards/documentation/documentation-standards.md"]
---

# Documentation Standards

Extracted from `system-standards.md` and `knowledge-system.md`. See those files for full context.

## Required Files (Production Repositories)

| File | Required When |
|------|--------------|
| `README.md` | Always |
| `AGENTS.md` | Always (AI coding assistants need working rules) |
| `ARCHITECTURE.md` | Always |
| `DESIGN.md` | Any user-facing surface |
| `CONTRIBUTING.md` | Any repo accepting contributions |

## README Requirements

Every README must contain:

- **Purpose** — what this project does in one or two sentences
- **Quick start** — how to run it locally
- **Structure** — what the key directories and files are
- **Validation** — how to run checks and tests

## Frontmatter

All canonical APT docs and build-kit files must include:

```yaml
---
title: [Full title]
version: v1
last_updated: YYYY-MM-DD
owner: APT
status: draft | stable | deprecated
---
```

Project-specific adoption docs should also include `audience` and `applies-to` fields.

## One Canonical Source Per Topic

- Each rule or standard belongs in one primary location.
- Other documents should reference it, not restate it with different wording.
- Duplication creates drift.

## Update Triggers

Documentation must be updated when:

- Behavior changes
- APIs change
- Workflows change
- Architecture changes
- A new pattern is adopted or an old one is retired

## AI-Ingestible Docs

Docs that AI agents read must be:

- Concise (avoid padding and filler)
- Structured (headings, lists, code blocks)
- Source-aware (include frontmatter and canonical paths)
- Stable (paths should not change without updating all references)

## Deprecated Guidance

When guidance is replaced:

- Mark the old doc with `status: deprecated` in frontmatter.
- Add a note at the top pointing to the replacement.
- Do not delete deprecated docs immediately — allow time for references to be updated.

## Related

- `system-standards.md` — canonical source for documentation standards
- `knowledge-system.md` — knowledge artifact types and reuse patterns
- `templates/` — starter templates for all doc types
