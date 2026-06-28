---
title: Agent Harness Review Prompt
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "prompt"
domain: "agent-harness-review-prompt"
source_paths: ["apt-principles/prompts/agent-harness-review-prompt.md"]
---

# Agent Harness Review Prompt

## Purpose

Review an AI-assisted workflow, prompt, or agent system against the APT harness lifecycle. Use this before a reusable agent workflow is adopted, before a high-risk agent task is delegated, or when an existing prompt hides discovery, remediation, verification, and approval inside one broad instruction.

## Input Expectations

- Workflow or prompt text.
- Intended agent role or tool.
- Target repository or system boundary.
- Allowed tools and forbidden actions.
- Data sensitivity and production impact.
- Validation commands or review gates.
- Known approval requirements.

## Prompt

```text
You are reviewing an AI-assisted workflow using APT agent harness standards.

Canonical sources:
- ai-agent-framework.md
- standards/ai/agent-harness-standard.md
- standards/ai/ai-orchestration-standard.md
- standards/ai/verification-standard.md
- checklists/ai-agent-review-checklist.md
- references/ai-harness-contract.json

Review the workflow for:
1. Discover: Are canonical sources, repo state, relevant files, and unknowns gathered before action?
2. Classify: Are APT layer, risk, data sensitivity, model capability, locality, and approval needs named?
3. Validate: Is baseline behavior, feasibility, or current failure confirmed before remediation?
4. Remediate: Is the allowed change bounded and tied to validated evidence?
5. Verify: Are commands, checks, reviews, or evidence required after change?
6. Approve: Are human approval gates present for destructive, security, secrets, production, high-stakes, or policy-sensitive work?
7. Orchestration: If multiple agents are involved, are role boundaries, handoffs, owner, and verification rules explicit?
8. Residual risk: What assumptions, skipped checks, or unresolved decisions remain?

Return:
- Findings first, ordered by severity.
- Missing harness stages.
- Missing evidence or approval gates.
- Smallest corrective changes.
- Whether the workflow is ready, blocked, or ready with conditions.
```

## Expected Output

The output should be a reviewable findings list with severity, violated standard, evidence, and recommended correction. It should include a compact harness-stage table showing pass, fail, or missing for each stage.

## Guardrails

- Do not approve a workflow that lets an agent verify and approve its own high-risk remediation.
- Do not invent model names, tool names, or validation commands that are not provided.
- Do not duplicate doctrine text in the reviewed workflow; recommend links to canonical standards.
- Treat missing evidence as missing evidence, not as permission to assume.
- Keep implementation recommendations outside `apt-principles-agents` unless the change is doctrine, standard, checklist, prompt, example, or reference content.

## Related Documents

- `../ai-agent-framework.md`
- `../standards/ai/agent-harness-standard.md`
- `../standards/ai/ai-orchestration-standard.md`
- `../standards/ai/verification-standard.md`
- `../checklists/ai-agent-review-checklist.md`
- `../references/ai-harness-contract.json`
