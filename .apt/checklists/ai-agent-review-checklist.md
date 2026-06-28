---
title: AI Agent Review Checklist
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "checklist"
domain: "ai-agent-review-checklist"
source_paths: ["apt-principles/checklists/ai-agent-review-checklist.md"]
---

# AI Agent Review Checklist

## Scope

Use this checklist for reusable prompts, AI routes, agent workflows, tool permissions, and AI-assisted implementation tasks.

Run it before an agent prompt becomes reusable, before an AI route ships, and before a human delegates broad implementation or review work to an agent. The checklist applies to both product-facing AI and internal developer-agent workflows.

## Required Checks

- [ ] Role and task are explicit.
- [ ] Canonical sources are named.
- [ ] Tool-native installed files are distinguished from canonical APT doctrine.
- [ ] In-scope and out-of-scope work are clear.
- [ ] Allowed tools and approval points are defined.
- [ ] `.apt/installation.json` managed files and local `docs/project-context.md` ownership are respected when apt-principles-agents is involved.
- [ ] Output format is deterministic enough to review.
- [ ] Validation criteria are included.
- [ ] Evaluation cases or dry-run outputs cover normal, missing-context, forbidden-action, and degraded-provider paths.
- [ ] Fallback, refusal, referral, or escalation behavior is defined for low-confidence or high-risk inputs.
- [ ] Security, secrets, and production-impacting boundaries are protected.
- [ ] Harness stage is named: discover, classify, validate, remediate, verify, or approve.
- [ ] Classification covers APT layer, risk, data sensitivity, model capability, locality, and approval needs.
- [ ] Model routing uses the smallest sufficient capability and avoids vendor-specific doctrine.
- [ ] Context loading is minimized through source maps, context packs, prompt reuse, or targeted excerpts.
- [ ] Orchestration has one accountable owner, bounded delegated roles, and reviewable handoffs.
- [ ] Verification evidence is separate from agent confidence.
- [ ] Repository lifecycle work preserves the `apt-principles-agents` and `apt-principles-agents` ownership boundary.
- [ ] APT Agent implementation reviews include a standards-to-implementation crosswalk instead of copying implementation catalogs into doctrine.

## Failure Conditions

- Prompt asks for broad improvement with no sources or boundaries.
- Agent can mutate production or secrets without human approval.
- Output cannot be validated.
- AI behavior is embedded inline and unreviewable.
- Installed agent standards fork or redefine canonical APT doctrine.
- Sync or install would overwrite target-owned project context or unmanaged files.
- Provider failure or missing context leads to invented confident output.
- High-stakes or destructive requests have no escalation or approval rule.
- Agent remediates before discovering, classifying, or validating the current state.
- Model selection is hard-coded to a specific vendor or model in reusable doctrine.
- Full-repo or sensitive context is loaded without need.
- Specialized agents produce untraceable handoffs or approve their own high-risk work.
- Repository sync or repair would overwrite target-owned project context.
- APT Agent implementation files redefine standards that should remain canonical in `apt-principles-agents`.

## Evidence Required

- Prompt contract.
- Source list.
- Agent standards manifest or profile notes when installed files are involved.
- Tool/approval notes.
- Evaluation or validation criteria.
- Evaluation cases or dry-run outputs.
- Fallback and escalation notes.
- Guardrail notes for secrets, production data, destructive actions, and external calls.
- Example output or dry-run review for reusable prompts.
- Harness stage map and transition evidence.
- Routing or escalation decision record for repeatable AI workflows.
- Context pack or source map for repeated agent work.
- Verification output that names commands, checks, or review evidence.
- Ownership classification for doctrine, distribution, and target-repo lifecycle issues.
- Standards-to-implementation crosswalk for APT Agent harness changes.

## Pass Standard

The agent can act only inside named boundaries, cite or use canonical sources, produce a reviewable output, and explain what validation remains. If the prompt would let the agent invent architecture, mutate risky systems, or hide assumptions, it fails.

## Related Documents

- `../ai-agent-framework.md`
- `../examples/ai-agent/agent-prompt-contract-example.md`
- `../examples/ai-agent/ai-evaluation-case-example.md`
- `../examples/ai-agent/agent-harness-flow-example.md`
- `../examples/ai-agent/apt-principles-agents-crosswalk-example.md`
- `../examples/ai-agent/model-routing-decision-example.md`
- `../examples/ai-agent/token-efficient-context-pack-example.md`
- `../references/agent-standards-contract.json`
- `../references/ai-harness-contract.json`
- `../prompts/framework-review-prompt.md`
- `../prompts/apt-agent-conformance-review-prompt.md`
- `../prompts/agent-harness-review-prompt.md`
- `../prompts/model-routing-review-prompt.md`
- `../prompts/repository-lifecycle-review-prompt.md`
- `../standards/ai/agent-harness-standard.md`
- `../standards/ai/model-routing-standard.md`
- `../standards/ai/repository-lifecycle-standard.md`
