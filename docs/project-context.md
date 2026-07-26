---
title: APT Novel Reviewer Project Context
kind: project-context
status: active
owner: APT
last_updated: 2026-07-26
source_paths: ["apt-novel-reviewer/README.md", "apt-novel-reviewer/docs/project-context.md"]
---

# Project Context

## Purpose

`apt-novel-reviewer` is an APT application for AI-assisted manuscript and novel review workflows.

## Architecture

- The repo is an independent package workspace with desktop/app, shared library, UI, type, and database packages.
- Local APT reports live under `docs/apt`.
- Reusable doctrine and agent assets are distributed from `apt-principles-agents`.

## Operating Rules

- Preserve manuscript/user content boundaries and avoid inventing review claims without source evidence.
- Keep reusable review doctrine upstream in `apt-principles-agents`; local workflow decisions stay here.
- Treat generated APT reports as evidence outputs unless local docs say otherwise.

## Validation

```bash
npm test
npm run build
```
