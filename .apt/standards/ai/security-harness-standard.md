---
title: Security Harness Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/security-harness-standard.md"]
---

# Security Harness Standard

Extracted from `../../security.md`, `../../quality-testing.md`, and `../../ai-agent-framework.md`. See those files for canonical doctrine.

## Purpose

Security harness design applies the agent harness pattern to security-sensitive and governance-sensitive work. It is not limited to application security; the same detect, validate, remediate, verify, approve pattern applies to documentation, architecture, configuration, code, repository standards, and AI-generated changes.

## Harness Pattern

Use this pattern for security-sensitive work:

```text
Detect
  -> Validate
  -> Remediate
  -> Verify
  -> Approve
```

Detection identifies a possible issue. Validation confirms whether the issue is real, exploitable, relevant, or policy-impacting. Remediation makes the smallest bounded correction. Verification proves the correction works. Approval records human accountability for risk acceptance or promotion.

## Required Controls

- Detection source is recorded.
- Validation distinguishes confirmed issues from suspected issues.
- Remediation is scoped to the confirmed issue.
- Verification includes command, review, reproduction, or policy evidence.
- Secrets and sensitive data are protected throughout.
- Human approval is required for risk acceptance, production impact, auth changes, payment changes, identity changes, and high-stakes AI behavior.

## Applicable Domains

Apply this standard to:

- application security
- authentication and authorization
- secrets and configuration
- AI-generated code
- AI prompts and tool permissions
- architecture boundaries
- documentation that affects operator or user safety
- repository standards installation and sync

## Failure Conditions

- A scanner finding is treated as true without validation.
- An agent remediates security-sensitive code without approval or verification.
- Risk is accepted without an owner.
- Secrets appear in prompts, logs, reports, examples, or model context.
- Documentation tells operators to bypass security, approval, or release gates.
- AI-generated changes are merged without security review when the scope requires it.

## APT Agent Blueprint

APT Agent should implement security harness support as a governed workflow. Suggested modules are:

- detector intake for scans, reviews, logs, and agent findings
- finding validator
- remediation planner
- verification runner
- approval and risk-acceptance recorder
- sensitive-data guard for prompts and outputs

The implementation should support security and non-security governance checks without making `apt-principles-agents` an implementation repository.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns scanners, detectors, repair flows, sensitive-data guards, and generated reports. `apt-principles-agents` defines the security harness pattern, controls, approval gates, and failure conditions.

## Related

- `../../security.md`
- `../../ai-agent-framework.md`
- `verification-standard.md`
- `agent-harness-standard.md`
- `../../checklists/security-review-checklist.md`
- `../../prompts/security-review-prompt.md`
