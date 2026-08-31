---
title: APT Principles Framework
kind: principle-hub
domain: framework
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/apt-principles.md"]
supersedes: ["apt-principles/apt-principles.md"]
---

# APT Principles Framework

## Overview

APT (Applied Practical Thinking) is a structured framework for turning ideas into clear decisions, well-designed systems, scalable architecture, and production-ready delivery.

APT is a working model for:

- thinking
- designing
- architecting
- standardizing
- building
- validating
- releasing
- operating
- learning
- augmenting work with AI
- protecting systems and users

## Purpose

APT creates a repeatable system for moving from concept to execution without losing clarity, consistency, quality, security, or long-term reuse.

## Framework Map

The first four entries are APT's pillars. System standards, quality, release, operations, and knowledge are lifecycle practices that make those pillars repeatable. AI and security are cross-cutting overlays applied throughout the work.

| Role | Area | Question | Canonical Doc |
|---|---|---|---|
| Pillar | Thinking | Why does this matter? | `thinking/README.md` |
| Pillar | Design | What should the solution communicate and do? | `design/README.md` |
| Pillar | Architecture | How should the system be structured? | `architecture/README.md` |
| Lifecycle practice | System Standards | How do we keep behavior consistent? | `system-standards/README.md` |
| Pillar | Execution | How do we build it safely? | `execution/README.md` |
| Lifecycle practice | Quality and Testing | How do we validate it? | `execution/quality-and-testing.md` |
| Lifecycle practice | Release and Change Management | How do we promote it? | `execution/release-and-change-management.md` |
| Lifecycle practice | Operations and Support | How do we run and support it? | `execution/operations-and-support.md` |
| Lifecycle practice | Knowledge and Learning | How do we learn and scale understanding? | `execution/knowledge-and-learning.md` |
| Cross-cutting overlay | AI and Agents | How can AI participate safely and usefully? | `ai/README.md` |
| Cross-cutting overlay | Security and Risk | How do we protect people, data, systems, and trust? | `security-risk/README.md` |

Security and AI are explicit and required, but they are not sequential handoff stages. Public sites may use shorter labels and eleven navigation groups when they preserve this role mapping and the canonical source path.

Canonical file slugs use explicit doctrine names such as `operations-support` and `knowledge-system`. Public sites and route groups may use shorter labels such as Operations or Knowledge, but generated views should preserve the canonical source path so those aliases do not become competing doctrine names.

## Core Operating Rules

### Rule 1: Think before building

Do not implement before the problem, audience, constraints, and success criteria are understood.

### Rule 2: Design complete behavior

Define user flows, states, interaction rules, and acceptance criteria before implementation spreads design decisions across code.

### Rule 3: Structure before speed

Fast delivery without boundaries creates technical and operational debt.

### Rule 4: One canonical source per topic

Each rule should live in one primary location. Other docs may reference it, but should not redefine it.

### Rule 5: API-first where functionality matters

Important business behavior should be defined at the API and contract layer, not trapped inside UI code.

### Rule 6: Security is built in

Authentication, authorization, input validation, session control, secrets, and abuse protection are part of the architecture.

### Rule 7: AI must follow the system

AI can accelerate work, but it must not invent architecture, standards, or patterns outside defined rules.

### Rule 8: Validate before release

Every meaningful change needs evidence: tests, builds, preview checks, review notes, or explicit risk acceptance.

### Rule 9: Learn once, reuse everywhere

Decisions, examples, prompts, and support findings should become reusable knowledge instead of hidden memory.

## Outcome Evidence Model

Outcomes are the framework-level proof that APT work is worth doing. Outcomes do not need a separate root doctrine file; they are governed here and enforced through `thinking.md`, `execution.md`, `quality-testing.md`, `release-change-management.md`, and `knowledge-system.md`.

Every meaningful change should name:

- the problem or opportunity
- the audience or operator affected
- the baseline condition
- the target success signal
- the evidence that will prove movement
- the operational, support, or learning impact

Outcome evidence can be quantitative, such as reduced handoff time, fewer support cases, faster validation, or lower error rate. It can also be observable when measurement is not yet instrumented, such as a documented decision, completed runbook, preview evidence, or repeatable validation command.

Do not treat "implemented" as an outcome. Implementation is an activity. The outcome is the change in user, operator, system, or knowledge state that the work produces.

## Required Documentation Model

APT is maintained in five active layers:

1. Core principle docs
2. Examples
3. Checklists
4. Prompts
5. References

Templates are provided for creating new items in each layer.

## Whole-System Evidence Loop

APT work is complete when the lifecycle has a traceable evidence loop:

1. Thinking names the outcome, audience, constraints, assumptions, and tradeoffs.
2. Design defines complete behavior and states.
3. Architecture assigns responsibilities, ownership, and contracts.
4. System standards define reusable conventions and boundary rules.
5. Security identifies trust boundaries, sensitive data, abuse controls, and escalation criteria.
6. Execution breaks work into small validated increments.
7. Quality records the validation matrix and residual risk.
8. Release captures what changed, why, validation, rollback, and support notes.
9. Operations records runbook, telemetry, first response, and escalation paths.
10. Knowledge converts decisions, incidents, and outcomes into reusable artifacts.
11. AI participates only through bounded prompts, named sources, evaluation criteria, and review evidence.

If a change skips one layer, the release or decision record should explain why that layer is not applicable.

## Idea-To-Project Flow

For projects that begin as raw ideas, APT uses Working Backwards to keep creativity connected to delivery evidence. An idea should become a customer problem, intended outcome, assumptions, constraints, demo or mock evidence, requirements, generated assets, implementation prompts, validation commands, release readiness, telemetry, and captured learning.

Generated assets are part of the evidence loop. Diagrams, media, examples, copy, screenshots, demo plans, and AI prompts must trace to approved intent and should make the work easier to design, build, test, deploy, support, or reuse. They should not become disconnected artifacts that agents treat as product truth.

Build work starts only when the handoff names what to build, what not to build, how to validate it, where it will run, how rollback or support works, and which human approvals are required.

## Project Adoption Model

APT projects should apply this framework without duplicating and drifting the doctrine. Supported adoption modes are:

- Copy: vendor selected APT assets into the project.
- Sync: periodically refresh local assets from `apt-principles-agents`.
- Apply: treat `apt-principles-agents` as the external source of truth while local docs describe implementation.
- Showcase: publish a profile that can feed the public Applied Practical Thinking portfolio.

Downstream projects should keep local adoption records under `docs/apt/` or an equivalent folder. Local records should name principle coverage, project-specific decisions, validation reports, and public showcase readiness.

`applied-practical-thinking` is the public APT site: portfolio, demo hub, learning surface, principles browser, and showcase for real APT projects such as `apt-coach`, `apt-dream-to-reality`, `apt-novel-reviewer`, `apt-payment-rpc-api`, `crt-world`, and future projects.

## Required Change Flow

1. Frame the problem with `thinking.md`.
2. Define behavior with `design.md`.
3. Place responsibilities with `architecture.md`.
4. Apply consistency rules from `system-standards.md`.
5. Check security boundaries with `security.md`.
6. Build using `execution.md`.
7. Validate with `quality-testing.md`.
8. Promote with `release-change-management.md`.
9. Support with `operations-support.md`.
10. Capture reusable learning with `knowledge-system.md`.
11. Use `ai-agent-framework.md` when AI participates.

## Applied by

- [apt-architecture-lead](../agents/core/apt-architecture-lead.md) — Use when a change has structural or system-design implications spanning more than one architecture perspective, and someone needs to own the combined structural verdict.
- [apt-design-lead](../agents/core/apt-design-lead.md) — Use when a change touches UI, UX flow, or customer-facing design decisions spanning more than one audience or perspective, and someone needs to own the combined design verdict.
- [apt-execution-lead](../agents/core/apt-execution-lead.md) — Use when a change is ready to move from design/architecture into implementation, and someone needs to confirm the plan is buildable, safely sequenced, and verifiable before work starts.
- [apt-principal](../agents/core/apt-principal.md) — Use as the final synthesis step after specialist perspectives have reported, when scattered concerns, risks, and tradeoffs must be reconciled into one accountable, evidence-backed decision with a clear approval status.
- [apt-principles-reviewer](../agents/core/apt-principles-reviewer.md) — Use to review code, documentation, plans, and diffs for APT Core alignment — behavior preservation, clear intent, small reviewable scope with a rollback path, and grounded output with no invented interfaces.
- [apt-router](../agents/core/apt-router.md) — Use at the start of any review-council engagement, before any specialist perspective agent is invoked, to decide which agents the request actually needs based on domain, audience, and risk.
- [apt-thinking-lead](../agents/core/apt-thinking-lead.md) — Use before domain-specific perspectives are engaged, whenever the problem statement, assumptions, or tradeoffs behind a proposal haven't yet been made explicit and checkable.

## Related Build Kit

- `checklists/`
- `examples/`
- `prompts/`
- `templates/`
- `references/`
- `checklists/project-adoption-checklist.md`
- `prompts/project-adoption-prompt.md`
- `templates/project-adoption-template.md`
- `examples/projects/apt-project-profile-example.md`
- `references/project-profile.schema.json`

## Summary

APT is a doctrine and build kit for practical systems work: clear thinking, coherent design, safe architecture, consistent execution, validated release, durable operations, reusable knowledge, bounded AI, and explicit security.
