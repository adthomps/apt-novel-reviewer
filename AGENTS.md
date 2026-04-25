# AGENTS.md

This repository is designed for deterministic coding-agent workflows.

## Core Rules
- Keep architecture local-first and review-only.
- Preserve split between Electron main/preload and React renderer.
- Validate external inputs with Zod.
- Keep review output contract strict JSON.
- Avoid introducing cloud services or telemetry by default.

## Implementation Ordering
1. App shell and runtime setup
2. Project system
3. DOCX import and chapter parsing
4. SQLite persistence
5. Ollama review engine
6. Findings and compare workflows
7. Remaining review modes and polish

## Guardrails
- Do not add manuscript rewriting/editing features.
- Do not add chat assistant UI.
- Do not bypass preload security boundary.
- Keep one-way renderer -> preload -> main process calls.
