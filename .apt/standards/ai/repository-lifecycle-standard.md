---
title: Repository Lifecycle Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/repository-lifecycle-standard.md"]
---

# Repository Lifecycle Standard

Extracted from `../../ai-agent-framework.md`, `../../knowledge-system.md`, and `../../references/agent-standards-contract.json`. See those files for canonical doctrine and ownership boundaries.

## Purpose

Repository lifecycle management keeps APT-aligned repositories installable, scannable, repairable, synchronizable, and upgradeable without confusing doctrine ownership with distribution tooling.

## Lifecycle

Use this lifecycle for standards adoption and maintenance:

```text
Install
  -> Scan
  -> Detect Drift
  -> Repair
  -> Synchronize
  -> Upgrade
  -> Verify
```

`apt-principles-agents` defines standards and evidence expectations. `apt-principles-agents` owns installer behavior, profile manifests, source-to-target path mapping, `.apt/installation.json`, dry-run install/sync, and cross-tool parity checks. Target repositories own local context, local decisions, exceptions, and validation results.

## Required Practices

- Identify the target repository before lifecycle work begins.
- Read target `README.md`, `AGENTS.md`, `.apt/installation.json`, and `docs/project-context.md` when present.
- Use dry-run install or sync before managed-file changes.
- Preserve target-owned local context.
- Record drift findings separately from doctrine gaps.
- Repair managed files through the distribution owner when appropriate.
- Bring reusable doctrine improvements back to `apt-principles-agents`.
- Verify with target repo checks and relevant APT validation commands.

## Failure Conditions

- `apt-principles-agents` grows installer or path-mapping behavior.
- Installed tool-native files become competing doctrine sources.
- Sync overwrites target-owned project context.
- Drift is repaired without identifying whether the owner is doctrine, distribution, or target repo.
- A standards upgrade lacks validation evidence.
- Profile detection is treated as authoritative when local product scope contradicts it.

## APT Agent Blueprint

APT Agent should consume this standard as a lifecycle scanner and planner. Suggested modules are:

- repository inventory and target identification
- managed-file manifest reader
- local context protector
- drift detector
- repair planner
- sync and upgrade dry-run adapter
- validation evidence collector
- ownership classifier for doctrine, distribution, and target-repo issues

APT Agent may orchestrate lifecycle work, but implementation, installers, manifests, and profile detection remain outside `apt-principles-agents`.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns profile manifests, `.apt/installation.json/` manifests, install/scan/repair/sync scripts, report generation, and tool-native path mapping. `apt-principles-agents` defines lifecycle stages, ownership boundaries, preservation rules, and evidence expectations.

## Related

- `../../ai-agent-framework.md`
- `../../knowledge-system.md`
- `../../checklists/project-adoption-checklist.md`
- `../../examples/workflows/repository-drift-repair-flow.md`
- `../../prompts/repository-lifecycle-review-prompt.md`
- `../../references/agent-standards-contract.json`
