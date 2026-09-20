# Graphify Guide

Use Graphify to understand the local desktop application's process boundaries and review pipeline. Manuscripts and review databases are never graph inputs.

## Build

Run from the sibling `apt-principles-agents` repository:

```powershell
node scripts/graphify-workspace.mjs code apt-novel-reviewer
node scripts/graphify-workspace.mjs status apt-novel-reviewer
```

The build uses local AST extraction and creates an ignored immutable candidate without automatic promotion.

## Included architecture

- `apps/desktop/` Electron main, preload, and renderer boundaries
- `packages/lib/` parsing, review, prompt, validation, and comparison logic
- `packages/db/` persistence contracts and repositories
- `packages/types/` shared domain types
- `packages/ui/` reusable presentation code

Manuscripts, DOCX samples, project databases, test data, tests, generated reports, dependencies, build output, secrets, and Graphify output are excluded. Inspect SQL migrations directly when answering persistence-schema questions.

## Questions

- How does a manuscript version move through import, parsing, local review, findings, and comparison?
- Which contracts connect Electron, preload, React, Ollama, persistence, and review modes?
- How are resolved, still-present, and new findings calculated across versions?
- What code is affected by adding a review mode or manuscript format?
- Where are local-only, no-rewriting, and no-chat boundaries enforced?

Do not treat graph traversal as manuscript analysis. Confirm all behavioral claims in code and preserve the renderer-to-preload-to-main security boundary.
