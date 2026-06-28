---
title: APT Release & Change Management (Promote)
kind: principle-hub
domain: execution
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/release-change-management.md"]
supersedes: ["apt-principles/release-change-management.md"]
---

# APT Release & Change Management

## Overview

APT Release & Change Management defines how changes move from preview to production with traceability and control.

Release answers:

- What changed?
- Why did it change?
- What validation passed?
- What risk remains?
- How can the change be rolled back or supported?

## Purpose

Release management makes production changes intentional. It gives maintainers, operators, and support teams enough context to understand and recover from change.

## Core Principles

### 1. Every change is traceable

Production behavior should connect back to a spec, issue, PR, decision, or release note.

### 2. Preview before production

User-facing and integration changes should be reviewed in a preview environment before promotion.

### 3. Production releases are intentional

Avoid hidden, manual, undocumented, or accidental production changes.

### 4. Changelog is a required artifact

Meaningful changes need concise release notes that explain impact.

### 5. Support must understand every release

Support needs known issues, rollback notes, and user-facing behavior changes.

## Standards / Rules

- Promote only after required validation passes.
- Group related changes into meaningful releases.
- Record rollback or recovery steps before production promotion.
- Include support notes for user-visible or operationally risky changes.
- Release records should name source artifact, changed behavior, validation evidence, deployment target, rollback path, support impact, and known residual risk.
- Preview and production environments should be distinguishable in release notes and deployment records.
- Do not rely on dashboard-only manual deploy steps unless documented.
- Versioned doctrine, copied references, and generated public views must identify source and status.

## Required Artifacts

- Release notes
- Validation evidence
- Deployment record
- Rollback plan
- Support handoff notes
- Known issue and residual risk notes
- Source and version reference for doctrine, generated docs, or copied assets
- Release decomposition and readiness evidence from the Working Backwards package when the change is product-facing or operationally risky

## Working Backwards Release Readiness

Release decomposition turns the approved package into meaningful slices that can be validated independently. Readiness should cover quality, security, operations, support, docs, telemetry, rollback, and outcome measurement before production promotion.

## Good Example

A docs navigation release includes:

- summary of changed routes
- validation results
- preview URL
- rollback commit or redeploy path
- support note for changed links

## Bad Example

Promoting multiple unrelated changes with no release summary, no validation record, and no known rollback path.

## AI Prompt Example

```text
Prepare an APT release summary.

Input:
- Change list:
- Validation evidence:
- Deployment target:
- Known risks:

Return:
1. Release notes
2. Risk summary
3. Rollback plan
4. Support handoff
```

## Topic-Specific Guidance

- Treat **Release And Change Management** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: increment, acceptance criteria, tests, release, operations, support, learning.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Execution canonical hub](README.md) and linked standards/checklists before making final claims.
## Related Checklists

- `checklists/release-readiness-checklist.md`

## Related Examples

- `examples/workflows/preview-to-prod-flow.md`
- `examples/workflows/release-record-example.md`

## Related Prompts

- `prompts/release-review-prompt.md`

## Related References

- `references/metadata-versioning-contract.json`

## Related Documents

- `quality-testing.md`
- `operations-support.md`

## Summary

Release management promotes validated change with enough context to support and recover it.
