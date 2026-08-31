---
title: "Provider-Neutral AI Task Contract"
kind: "standard"
domain: "ai"
status: "active"
owner: "APT"
last_updated: "2026-08-01"
source_paths: ["apt-principles-agents/standards/ai/provider-neutral-ai-task-contract.md", "apt-product-team/prd-pm-ai-team.md", "apt-product-team/.claude/skills/working-backwards-methodology/SKILL.md"]
---

# Provider-Neutral AI Task Contract

## Purpose

APT product workflows route by task capability, evidence requirement, and risk level before they route by provider or model. Product behavior should ask for the work to be done, not for a brand-specific model to perform it.

This standard is especially important for Dream-to-Reality workflows, where the product experience should remain stable while hosted providers, local models, Claude Code, Codex, or future MCP-backed tools change underneath.

## Required Contract

Every AI-backed product workflow should describe a request with:

- `taskCapability`: the product task being requested
- `inputArtifacts`: approved source artifact IDs and artifact kinds
- `outputArtifact`: the artifact kind expected from the task
- `approvalState`: whether the source package is approved for AI use
- `riskLevel`: low, medium, high, or blocked
- `providerPolicy`: allowed providers, forbidden providers, data-boundary notes, and fallback behavior
- `validation`: required parser, schema, rubric, checklist, or human review

Provider adapters may translate this contract into OpenAI, Anthropic, local model, or tool-native request formats. They must not change the task meaning, source artifacts, approval requirement, or validation gate.

## Working Backwards Capabilities

Dream-to-Reality-style flows should expose these capability names before provider names:

| Capability | Input Artifacts | Output Artifact | Required Gate |
| --- | --- | --- | --- |
| `draft_press_release` | idea brief, customer/problem/outcome evidence | press release | press-release rubric |
| `generate_external_faq` | approved press release | external FAQ | external FAQ rubric |
| `generate_internal_faq` | approved press release, external FAQ when present | internal FAQ | internal FAQ rubric |
| `critic_review` | artifact, matching rubric | review verdict | `PASS` or actionable `NEEDS REVISION` |
| `generate_requirements` | approved press release, external FAQ, internal FAQ | requirements/PRD | requirements rubric |
| `generate_engineering_prompt` | approved requirements, spec contract, validation commands | agent handoff prompt | implementation readiness checklist |

Local repos may add narrower task capabilities, but they should map back to these canonical product tasks when producing Working Backwards artifacts.

## Provider Adapter Rules

- Keep provider secrets server-side.
- Normalize provider responses to text or typed JSON before product code consumes them.
- Log provider, model, task capability, prompt version, approval state, and request ID.
- Preserve fallback behavior in the caller: provider failure should return an error or explicit open item, never fabricated product certainty.
- Keep Claude Code-specific workflows in Claude platform adapters or internal planning repos. Hosted product behavior should use API adapters.
- Keep OpenAI, Anthropic, local model, and gateway-specific fields out of canonical prompts unless the prompt is explicitly a platform adapter.

## Quality Bar

A compliant implementation can answer:

- Which product task was requested?
- Which approved artifacts were used?
- Which provider and model served the request?
- Which schema, rubric, or human review gates validated the output?
- What happens if the selected provider is unavailable or the source artifacts are blocked?

If any answer depends on reading a provider-specific prompt or UI label, the workflow is too tightly coupled to the provider.

## Related

- [Model Routing Standard](model-routing-standard.md)
- [Working Backwards Context Pack](../../context/working-backwards/README.md)
- [Working Backwards AI Task Contract Template](../../templates/working-backwards/ai-task-contract.json)
