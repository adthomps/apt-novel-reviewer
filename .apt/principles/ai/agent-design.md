---
title: Agent Design
kind: principle
status: active
owner: APT
last_updated: 2026-08-16
source: apt-principles and apt-agent-standards
domain: "ai"
source_paths: ["apt-principles-agents/principles/ai/agent-design.md"]
---

# Agent Design

## Purpose

This principle helps APT teams route work by risk and capability, constrain tools, ground claims in sources, preserve human approval, and evaluate outputs. It is guidance for decisions and required evidence, not a claim about any specific vendor or product.

## Principles

- Begin with the intended outcome and affected audiences.
- Separate verified facts, assumptions, recommendations, and open questions.
- Prefer explicit contracts, reversible steps, and supportable behavior.
- Preserve compatibility when it materially reduces customer or partner disruption.
- Record the evidence needed for another person or agent to review the decision.

## Required Artifacts

At minimum, produce: task packet, selected sources, model rationale, tool boundaries, evaluation cases, reviewer outcome, residual risk, and approval record.

## Tradeoffs And Failure Modes

Review for unsupported claims, overpowered tools, weak-model routing for high-stakes work, hidden delegation, prompt drift, and unreviewed production action. When evidence is incomplete, mark the gap rather than inventing certainty.

## Review Questions

1. What outcome and audience does this serve?
2. Which source-backed facts constrain the decision?
3. What alternatives and migration effects were considered?
4. How will engineering, security, documentation, and support verify readiness?
5. What remains uncertain and who must approve it?

## Topic-Specific Guidance

- Treat **Agent Design** as an explicit decision with defined scope, evidence, owner, and validation.
- Required evidence: task packet, sources, routing, tool boundaries, evaluation, review, approval.
- Give an agent the minimum tools, data, permissions, context, and duration needed for the task; make destructive or external actions explicit approval boundaries.
- Define observable success, representative evaluation cases, prohibited outcomes, handoff conditions, and a deterministic fallback before increasing autonomy.
- Preserve provenance across delegation: record which sources, models, tools, intermediate decisions, validations, and human approvals contributed to the result.
- State what is verified, what is assumed, and what requires specialist or human approval.
- Delegation is one level deep: a delegated agent does not spawn another. An orchestrator that must consult several specialists is the top-level session or a script, not itself a delegated agent. See the [AI Orchestration Standard](../../standards/ai/ai-orchestration-standard.md).

## Agents As Principle Enforcement

An APT agent is a thin executable wrapper over doctrine: it takes one or more
principles plus a skill and applies them, at review time, to a specific change
or artifact. The agent does not restate or reinterpret the principle — it checks
the work against it and cites the clause each finding rests on.

- Every canonical agent declares the principles it enforces in its
  `applies_principles` frontmatter and lists them in a `## Enforces` section.
  Each such principle carries an `## Applied by` section naming its agents. The
  generated `docs/distribution/PRINCIPLE-AGENT-HOOK-CROSSWALK.md` is the index;
  a principle in an enforceable domain with no agent is unenforced doctrine.
- Authoring an agent that cites no principle is the anti-pattern — the same
  failure as the "make this better" prompt in the bad example below. If a role
  cannot name the doctrine it enforces and cannot supply at least three
  perspective-specific checks, it is a skill invocation or a routing alias, not
  an agent.
- The canonical `agents/<domain>/<id>.md` file is the single source. Every
  `platforms/<platform>/source/agents/**` file is generated from it and must be
  reproducible by `scripts/build-agent-adapters.mjs`; a hand-edited adapter is
  drift, not a customization.

See the [Ai canonical hub](README.md) and linked standards/checklists before making final claims.
## Applied by

- [apt-architect](../../agents/harness/apt-architect.md) — Use when reviewing architecture, repository structure, migration strategy, or harness design before an approach is committed.
- [apt-cloudflare-builder](../../agents/harness/apt-cloudflare-builder.md) — Use when building or reviewing Cloudflare Workers, Pages, Hono, D1, KV, R2, or deployment workflows.
- [apt-code-reviewer](../../agents/harness/apt-code-reviewer.md) — Use when code needs a review for bugs, maintainability, behavior preservation, or missing validation.
- [apt-cost-controller](../../agents/harness/apt-cost-controller.md) — Use when a task risks excessive token usage, repeated context loading, unnecessary model escalation, or redundant scans.
- [apt-harness-docs-reviewer](../../agents/harness/apt-harness-docs-reviewer.md) — Use when reviewing this repository’s own documentation architecture, consistency, source-of-truth boundaries, or operating guidance.
- [apt-installer](../../agents/harness/apt-installer.md) — Use when applying this repository’s installable agent standards and harness assets to a target repository for the first time.
- [apt-model-router](../../agents/harness/apt-model-router.md) — Use when choosing the smallest sufficient local or cloud model tier for an APT task.
- [apt-repair-agent](../../agents/harness/apt-repair-agent.md) — Use when repairing or upgrading an existing APT standards installation while preserving local customizations.
- [apt-repo-scanner](../../agents/harness/apt-repo-scanner.md) — Use when inspecting a target repository for installed APT standards, drift, missing files, duplicates, or repair needs.
- [apt-security-reviewer](../../agents/harness/apt-security-reviewer.md) — Use when reviewing security-sensitive agent, code, configuration, MCP, model-routing, or lifecycle behavior.
- [apt-task-router](../../agents/harness/apt-task-router.md) — Use at the start of a harness engagement to turn a request into a compact, reviewable task packet for the smallest suitable APT workflow.
- [apt-ui-reviewer](../../agents/harness/apt-ui-reviewer.md) — Use when reviewing UI work for intent, workflow continuity, state design, accessibility, or responsive behavior.
- [apt-verifier](../../agents/harness/apt-verifier.md) — Use when outputs, installs, repairs, routing config, or documentation alignment must be verified before they are trusted.

## Related

- [APT Principles](../README.md)
- [Skills](../../skills/README.md)
- [Templates](../../templates/README.md)
