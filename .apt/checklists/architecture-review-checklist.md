---
title: Architecture Review Checklist
version: v1
last_updated: 2026-04-24
owner: APT
status: draft
kind: "checklist"
domain: "architecture-review-checklist"
source_paths: ["apt-principles/checklists/architecture-review-checklist.md"]
---

# Architecture Review Checklist

## Scope

Use this checklist for new systems, cross-layer features, shared packages, deployable apps, API boundaries, documentation architecture, and AI runtime changes.

Run it before large implementation starts and again before merge if boundaries changed. Architecture review should prevent category errors, not merely describe them after the fact.

## Required Checks

- [ ] Frontend, backend, shared packages, docs, and infrastructure responsibilities are separated.
- [ ] Business logic is not embedded in UI components or route glue.
- [ ] API/data contracts are explicit.
- [ ] Shared packages do not import app-specific code.
- [ ] Deployment model matches system boundaries.
- [ ] Owner is named for each changed deployable surface, shared package, and boundary.
- [ ] Command matrix identifies required lint, typecheck, test, build, preview, deploy, and smoke commands where applicable.
- [ ] Failure, rollback, and observability paths are described.
- [ ] AI prompts or handlers are versioned and auditable when AI is involved.
- [ ] Risk level is identified as low, medium, or high.

## Failure Conditions

- Frontend imports backend internals.
- Routes contain durable business logic.
- Shared packages depend on app-specific modules.
- Deployment requires undocumented manual steps.
- No owner exists for a changed boundary.
- Required checks or deploy commands are assumed but not documented.

## Evidence Required

- Boundary map or responsibility notes.
- API/data contract sketch.
- Validation and deployment notes.
- Import or dependency notes for shared packages.
- Ownership and command matrix for multi-surface repos.
- Decision record for high-risk structure changes.

## Pass Standard

Every responsibility has a home, every boundary has a contract, and every deployable surface has an owner and validation path. If a future contributor would not know where to put related work, the architecture is not clear enough.

## Related Documents

- `../architecture.md`
- `../system-standards.md`
- `../ai-agent-framework.md`
- `../examples/architecture/monorepo-layout-example.md`
- `../examples/architecture/cloudflare-pages-workers-example.md`
- `../examples/architecture/pattern-ownership-command-matrix-example.md`
