---
title: apt-novel-reviewer APT Adoption
version: v1
last_updated: 2026-04-26
owner: APT
status: draft
---

# apt-novel-reviewer APT Adoption

## Purpose

`apt-novel-reviewer` applies APT to a local-first desktop manuscript review workflow. The repo keeps project-specific implementation evidence locally while canonical doctrine, checklists, and templates remain in `apt-principles`.

## Adoption Mode

Primary mode: `apply + showcase`

- Canonical principle guidance stays in `apt-principles`.
- This repo keeps only local evidence, operating constraints, and review outputs under `docs/apt/`.
- Review results are intended to remain inspectable by human operators and not hidden behind opaque runtime behavior.

## Principles Applied

- Thinking: the README and product docs define a clear non-chat, local-review problem boundary.
- Architecture: Electron app, shared parsing/domain packages, and SQLite/Ollama integrations are clearly separated.
- System Standards: workspace scripts for `build`, `typecheck`, and `test` provide repeatable project-level checks.
- Quality: parsing, diff, and JSON result handling are covered by library tests.
- Knowledge: local APT reports under `docs/apt/reports/` summarize repo-specific findings and link back to canonical doctrine.
- AI & Agent Framework: Ollama-powered review modes are explicit, local-only, and schema-validated rather than open-ended chat.

## Local Structure

```text
docs/apt/
  adoption.md
  project-profile.md
  references/
    project-profile.json
  reports/
    README.md
    *.md
    static/
```

## Validation

Run from repo root:

```powershell
pnpm build
pnpm typecheck
pnpm test
```

Canonical doctrine validation:

```powershell
cd ../apt-principles
npm run validate
```

## Related Documents

- `README.md`
- `PROJECT_RULES.md`
- `docs/ARCHITECTURE.md`
- `docs/OLLAMA_INTEGRATION.md`
- `docs/UX_SPEC.md`
- `docs/apt/reports/apt-principles-audit-2026-04-26.md`
- `../apt-principles/checklists/project-adoption-checklist.md`
- `../apt-principles/references/project-profile.schema.json`
