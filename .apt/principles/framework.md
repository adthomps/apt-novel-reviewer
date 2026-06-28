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

## Lifecycle Map

| Layer | Question | Canonical Doc |
|---|---|---|
| Thinking | Why does this matter? | `thinking.md` |
| Design | What should the solution communicate and do? | `design.md` |
| Architecture | How should the system be structured? | `architecture.md` |
| System Standards | How do we keep behavior consistent? | `system-standards.md` |
| Execution | How do we build it safely? | `execution.md` |
| Quality & Testing | How do we validate it? | `quality-testing.md` |
| Release & Change Management | How do we promote it? | `release-change-management.md` |
| Operations & Support | How do we run and support it? | `operations-support.md` |
| Knowledge System | How do we learn and scale understanding? | `knowledge-system.md` |
| AI & Agent Framework | How does AI augment the work? | `ai-agent-framework.md` |
| Security & Authentication | How do we protect trust boundaries? | `security.md` |

Security is a formal lifecycle layer. It may be reviewed alongside architecture and operations, but it is not optional or merely a final checklist.

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
