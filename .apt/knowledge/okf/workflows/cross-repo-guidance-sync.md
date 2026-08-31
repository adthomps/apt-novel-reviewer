---
type: "Workflow"
title: "Cross-Repo Guidance Sync"
description: "APT workflow for keeping downstream repositories current with selected principles, agents, skills, prompts, templates, and platform guidance."
resource: "apt-principles-agents/docs/operations/operating.md"
tags: ["apt", "workflow", "distribution", "sync", "okf"]
status: "stable"
kind: "okf-concept"
domain: "knowledge"
owner: "APT"
last_updated: "2026-08-24"
source_paths: ["apt-principles-agents/docs/operations/operating.md", "apt-principles-agents/docs/operations/workspace-rollout.md", "apt-principles-agents/scripts/apt-assets.mjs"]
authority: "derived"
verified: { by: "human:APT", at: "2026-08-24T00:00:00-07:00" }
sources: [{ id: "distribution-operations", resource: "apt-principles-agents/docs/operations/operating.md", title: "Distribution operations" }, { id: "workspace-rollout", resource: "apt-principles-agents/docs/operations/workspace-rollout.md", title: "Workspace rollout" }, { id: "apt-assets", resource: "apt-principles-agents/scripts/apt-assets.mjs", title: "APT asset distribution script" }]
---

# Cross-Repo Guidance Sync

Cross-repo guidance sync keeps target repositories aligned with APT guidance through manifests, installation records, scans, syncs, and target-owned validation.

## Workflow

1. Detect or choose the target repo's manifest from product scope and local instructions.
2. Scan the target repo to identify installed, missing, changed, and current managed artifacts.
3. Preview sync changes before applying them.
4. Apply selected updates while preserving target-owned local drift.
5. Scan again and run the target repo's own validation checks.

## Relationships

- Implements the reuse expectations from [APT Knowledge System](../principles/knowledge-system.md).
- May use [Voice Of Customer](../skills/voice-of-customer.md) evidence when product-facing guidance changes.
- Operates within the boundary recorded by [OKF Adoption](../decisions/okf-adoption.md): OKF is context, while manifests and installation records are the update mechanism.

## Canonical Sources

See [Distribution operations](../../../docs/operations/operating.md), [Workspace rollout](../../../docs/operations/workspace-rollout.md), and [apt-assets.mjs](../../../scripts/apt-assets.mjs) for authoritative commands and safeguards.[^distribution-operations][^workspace-rollout][^apt-assets]

[^distribution-operations]: Distribution operations.
[^workspace-rollout]: Workspace rollout.
[^apt-assets]: APT asset distribution script.
