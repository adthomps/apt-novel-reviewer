---
title: AI Orchestration Standard
version: v1
last_updated: 2026-06-21
owner: APT
status: draft
kind: "standard"
domain: "ai"
source_paths: ["apt-principles/standards/ai/ai-orchestration-standard.md"]
---

# AI Orchestration Standard

Extracted from `../../ai-agent-framework.md`. See that file for canonical AI doctrine, approval rules, and ownership boundaries.

## Purpose

AI orchestration coordinates specialized agents, tools, and human reviewers without losing accountability. Orchestration is useful when work is too broad, risky, or specialized for one prompt, but it must not create hidden decision-making or unreviewable handoffs.

## Role Design

Specialized agents should be used only when they improve accuracy, safety, throughput, or review quality. Each role must define:

- task boundary
- canonical sources
- allowed tools
- forbidden actions
- output contract
- verification method
- handoff target
- escalation rule

Roles may discover and recommend, but they do not silently own product direction, security exceptions, release approval, or production mutation.

## Shared Context

Shared context must be small, authoritative, and stable. Give every role the same task summary, source-of-truth map, constraints, and expected handoff format. Give specialized details only to the role that needs them.

Use context packs, source indexes, and prompts instead of copying the full repository into every role. When roles disagree, the orchestrator must identify the conflict, cite evidence, and escalate if the conflict affects safety or correctness.

## Handoff Rules

- Every delegated task returns evidence, not only conclusions.
- Findings must distinguish verified facts from assumptions.
- The final synthesizer must cite the role outputs used.
- A role cannot approve its own high-risk remediation.
- A failed or low-confidence role output must trigger fallback, retry, or human review.

## Delegation Depth

Delegation is one level deep. The orchestrator holds the delegation capability;
a delegated role does not re-delegate. A role that finds it needs another
perspective returns that gap to the orchestrator rather than spawning a
sub-role of its own.

An orchestrator that must fan out to several specialists therefore cannot itself
be a delegated role — it must be the top-level session, or a script that invokes
each role as its own top-level call (for example one headless invocation per
role, aggregated). A single delegated "do everything" role is acceptable only
for a bounded task that needs no further fan-out.

Because a role's brief is the only context it gets and it cannot ask for more,
the orchestrator must hand each role a complete brief: the change or artifact
under review, the relevant slice of the plan, and the specific canonical sources
the role must apply. A role with an insufficient brief fails and says so; it
does not guess.

## Failure Conditions

- Multiple agents work from different undocumented assumptions.
- A delegated agent expands scope without approval.
- The orchestrator merges results without verification evidence.
- Tool permissions are broader than the delegated task requires.
- Human reviewers cannot trace which role produced which decision.
- Shared context includes secrets, production data, or irrelevant sensitive material.

## APT Agent Blueprint

APT Agent should implement orchestration as accountable delegation. Suggested modules are:

- role registry that maps task types to bounded agent roles
- context-pack resolver that loads only the shared and role-specific context required
- handoff ledger that records role, source, output, confidence, and evidence
- conflict detector for contradictory findings or missing evidence
- synthesis verifier that checks final output against the relevant standards

The implementation must remain tool-neutral so Codex, Copilot, Claude, ChatGPT, VS Code Agent Mode, local LLMs, and future platforms can apply the same standard.

## Implementation Boundary

APT Agent or `apt-principles-agents` owns concrete agent catalogs, tool-specific agent files, role routers, and handoff ledgers. `apt-principles-agents` defines what accountable orchestration requires and should reference implementation catalogs instead of copying them.

## Related

- `../../ai-agent-framework.md`
- `agent-harness-standard.md`
- `token-efficiency-standard.md`
- `verification-standard.md`
- `../../examples/ai-agent/agent-harness-flow-example.md`
