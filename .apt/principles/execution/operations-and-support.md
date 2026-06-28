---
title: APT Operations & Support Thinking (Run & Support)
kind: principle-hub
domain: execution
status: active
owner: APT
version: v1
last_updated: 2026-06-28
source_paths: ["apt-principles/operations-support.md"]
supersedes: ["apt-principles/operations-support.md"]
---

# APT Operations & Support Thinking

## Overview

APT Operations & Support Thinking defines how systems are monitored, diagnosed, supported, and improved after release.

Operations answers:

- How do we know the system is healthy?
- How do we diagnose failure?
- What can support safely do?
- When do we escalate?
- How do incidents become learning?

## Purpose

Operations keeps systems usable in real conditions. Support thinking makes failure observable, explainable, and recoverable.

## Core Principles

### 1. Design for support from day one

Support needs clear states, errors, logs, and recovery paths.

### 2. Everything important must be observable

Critical workflows should emit useful telemetry or logs.

### 3. Actions must be traceable

Use request IDs, correlation IDs, user/session context where appropriate, and deployment records.

### 4. Support feedback drives improvement

Incidents and repeated questions should improve docs, UX, tests, and runbooks.

### 5. Systems should explain themselves

Errors should be actionable without leaking sensitive implementation detail.

## Standards / Rules

- Add correlation IDs to service boundaries where practical.
- Log operationally meaningful events, not noisy internal trivia.
- Define fallback behavior for critical degraded states.
- AI, knowledge, ingest, query, payment, auth, and external-integration flows should define conservative degraded behavior before release.
- Runbooks should name owner, symptoms, first-response steps, escalation criteria, rollback or containment path, and user-facing messaging.
- Keep runbooks close to the system or canonical docs.
- Treat support findings as input to quality, release, and knowledge docs.
- Repeated incidents should produce at least one durable artifact: doc update, test, alert adjustment, UX fix, or decision record.
- Preserve the canonical `operations-support` source path when a product route or navigation group shortens the label to Operations.

## Required Artifacts

- Runbook
- Alert or monitoring notes
- Incident response steps
- Escalation path
- Known failure modes
- Support-facing explanation of user-visible errors
- Degraded-mode and fallback behavior for critical workflows
- Incident-to-learning follow-up path
- Telemetry plan for Working Backwards packages that names adoption, usage, failure, support, and outcome signals when relevant

## Minimum Telemetry Shape

```json
{
  "event": "support.event",
  "category": "ingest|query|fallback|auth|deploy|support",
  "feature": "docs.search",
  "status": "success|failure|degraded",
  "userId": "optional",
  "sessionId": "optional",
  "correlationId": "req_123",
  "message": "short actionable context",
  "timestamp": "2026-04-24T12:00:00Z"
}
```

## Working Backwards Telemetry

Telemetry should be planned before release, not after success becomes hard to explain. A Working Backwards package should name which events prove adoption, usage, satisfaction or love, and revenue or business value. Critical workflows should also identify failure and degraded states so support can connect user reports to operational evidence.

## Good Example

A failed knowledge query returns a user-safe message, logs a correlation ID, records degraded status, and links support to the relevant runbook.

## Bad Example

Swallowing an API error, showing a generic failure, and leaving no trace that connects the user report to service logs.

## AI Prompt Example

```text
Create an operations starter for this feature.

Input:
- Feature/service:
- Known failure modes:
- Available telemetry:
- Support responsibilities:

Return:
1. Alert conditions
2. First-response steps
3. Escalation path
4. User-facing support notes
```

## Topic-Specific Guidance

- Treat **Operations And Support** as an explicit decision with defined scope, evidence, owner, and validation.
- Provide identifiers, safe explanations, diagnostic steps, known limits, escalation, and feedback capture.
- State what is verified, what is assumed, and what requires specialist or human approval.

See the [Execution canonical hub](README.md) and linked standards/checklists before making final claims.
## Related Checklists

- `checklists/operations-support-checklist.md`

## Related Examples

- `examples/workflows/preview-to-prod-flow.md`
- `examples/workflows/operational-runbook-example.md`

## Related Prompts

- `prompts/operations-review-prompt.md`

## Related Documents

- `release-change-management.md`
- `knowledge-system.md`

## Summary

Operations and support thinking make production behavior observable, diagnosable, and improvable.
