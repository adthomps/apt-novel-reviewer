---
name: ux-review
description: Use when reviewing user workflows, UI states, responsive behavior, accessibility, or product intent.
title: "UX Review"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/codex/skills/ux-review/SKILL.md"]
---

# UX Review

## Purpose
Review interface changes through user intent and task completion.

## When To Use
Use for pages, flows, dashboards, forms, onboarding, and responsive UI changes.

## When Not To Use
Do not use for backend-only changes.

## Required Reading
Read `apt-core/ux-standards.md`, product context, relevant UI code, and screenshots if available. For React, TypeScript, and Tailwind projects, also inspect `components.json` when present, component folders, import aliases, Tailwind config or global CSS, installed shadcn primitives, APT wrappers, and product blocks before recommending new components.

## Process
Identify primary intent, inspect states, check responsive layout and accessibility, and prioritize workflow blockers. When shadcn/ui applies, verify the project composes existing `components/ui` primitives before adding components, keeps reusable APT wrappers in `components/apt`, keeps workflow blocks in `components/blocks`, and preserves token styling, semantic structure, keyboard behavior, focus states, and ARIA behavior.

## Output Format
Return findings, affected workflows, severity, and recommended changes.

## Validation Checklist
- Loading, empty, error, and success states are considered.
- Text fits across viewports.
- Accessibility risks are named.
- Existing shadcn/ui structure, aliases, installed components, and local APT wrappers are checked before new UI is proposed.
