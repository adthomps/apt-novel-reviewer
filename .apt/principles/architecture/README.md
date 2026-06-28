---
title: APT Architecture Standards (How)
kind: principle-hub
domain: architecture
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/architecture.md"]
supersedes: ["apt-principles/architecture.md"]
---

# APT Architecture Standards

## Overview

APT Architecture Standards define how systems are structured so they remain understandable, maintainable, secure, and scalable.

Architecture answers:

- Where does each responsibility belong?
- Which boundaries protect the system?
- Which contracts connect layers?
- How does deployment reinforce structure?
- What changes easily, carefully, or rarely?

## Purpose

Architecture prevents category errors: UI becoming backend, routes becoming business logic, shared packages leaking app-specific behavior, and AI silently changing system behavior.

## Core Principles

### 1. Safety equals predictability under change

The system should behave consistently as features, teams, and integrations grow.

### 2. Boundaries prevent category errors

Frontend, backend, shared packages, AI, docs, and infrastructure each need clear ownership.

### 3. Constraints are guardrails

Folder structure, naming conventions, deployment rules, and forbidden imports remove bad options early.

### 4. Every responsibility has one obvious home

When adding a feature, architecture should answer where the code belongs.

### 5. If it only works in diagrams, it is not architecture

Architecture must account for previews, failures, rollbacks, logs, and humans debugging real incidents.

## Standards / Rules

### Recommended Monorepo Layout

```text
apps/
  web/       # frontend or docs surface
  worker/    # API/BFF/worker runtime

packages/
  ui/        # brand components, no business logic
  config/    # tokens, env helpers, constants
  utils/     # pure utilities
```

Hard rules:

- No application code at repo root.
- Apps contain deployable units only.
- Shared logic belongs in `packages/`.
- UI must not import worker/server internals.
- Worker routes should stay thin; services own business logic.
- AI prompts and handlers should be explicit, versioned, and auditable.

### Responsibility Map

| Concern | Owner | Rule |
|---|---|---|
| Rendering UI | frontend app/components | UI renders; it does not own business rules. |
| API orchestration | frontend services/API clients | Components do not call `fetch` directly. |
| HTTP routes | worker routes | Routes handle transport, validation handoff, and response shape. |
| Business logic | worker services or core packages | Logic does not live in UI or route glue. |
| Validation/auth | middleware and boundary schemas | Trust boundaries are enforced server-side. |
| Design tokens | config package or theme source | Tokens are shared and versioned. |
| AI prompts | AI prompt files | Prompts are not scattered inline. |
| Logging | middleware/services | Operational signals are structured and traceable. |

### Documentation Architecture

Doctrine, public docs, generated views, and project adoption records are separate architectural concerns:

- `apt-principles-agents` owns canonical doctrine and portable references.
- Project repositories own local adoption docs, decisions, reports, and implementation notes.
- `applied-practical-thinking` owns the public portfolio, principles browser, demos, learning pages, and real-project showcase.
- Generated public views must identify the canonical source they were produced from.

Architecture maps and forbidden flows are captured in `references/architecture-map.json`.

### Cloudflare-Oriented Baseline

- Cloudflare Pages for static frontend/docs delivery.
- Cloudflare Workers for APIs, BFFs, and AI endpoints.
- D1 for relational persistence when appropriate.
- KV for lightweight key/value data.
- R2 for object storage.
- GitHub as source of truth.
- Preview-first deployment flow.

## Architecture Patterns

### Monorepo layout

Use when multiple apps, packages, docs, and workers evolve together.

Required artifacts:

- documented `apps/` and `packages/` ownership
- shared package entrypoints
- boundary rules

### Frontend/backend split

Use when any server-side logic exists.

Required artifacts:

- service-layer API clients
- worker/API route ownership
- request/response contracts

### AI prompt ownership

Use when AI assistance or LLM integrations exist.

Required artifacts:

- named prompt files
- owned AI routes
- prompt review history

### CI/CD pipeline

Use for every project with a deployment surface.

Required artifacts:

- documented pipeline stages
- preview and production triggers
- post-deploy verification steps

### Branch protection and code ownership

Use for production or team projects.

Required artifacts:

- required checks
- review ownership expectations
- CODEOWNERS or equivalent ownership map when needed

### Command and validation ownership

Use when a repo has more than one deployable surface, runtime, or package.

Required artifacts:

- command matrix naming lint, typecheck, test, build, preview, deploy, and smoke commands
- owner or team for each deployable surface and shared package
- required checks for protected branches or release promotion
- documented fallback when a command is intentionally unavailable

## Change Containment

- Low risk: UI copy, content, localized styling, docs.
- Medium risk: API contracts, database schemas, shared packages, auth behavior.
- High risk: repo structure, build pipeline, deployment model, security model.

High-risk changes require a written decision record and staged rollout.

Architecture reviews should name the ownership model for each changed boundary. A boundary without an owner becomes an operations problem later.

## Required Artifacts

- Boundary map
- API/data contract sketch
- Responsibility matrix
- Deployment model
- Failure and rollback notes
- Architecture review checklist
- Ownership and command matrix for multi-surface repos
- Decision record for high-risk boundary, deployment, or ownership changes

## Good Example

A new knowledge search feature defines:

- frontend route and state ownership
- worker endpoint contract
- service-layer query behavior
- schema validation
- telemetry events
- preview deployment validation

## Bad Example

A React component calls an external API directly, transforms business data inline, handles auth assumptions locally, and stores prompt text in the component body.

## Related Checklists

- `checklists/architecture-review-checklist.md`

## Related Examples

- `examples/architecture/monorepo-layout-example.md`
- `examples/architecture/cloudflare-pages-workers-example.md`
- `examples/architecture/pattern-ownership-command-matrix-example.md`

## Related Prompts

- `prompts/architecture-review-prompt.md`

## Related References

- `references/architecture-map.json`

## Related Documents

- `system-standards.md`
- `security.md`
- `ai-agent-framework.md`

## Summary

Architecture gives every responsibility a home and every boundary a contract.
