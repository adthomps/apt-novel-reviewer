---
name: ai-output-review
description: Use when auditing generated code, docs, plans, or agent output for unsupported claims and unsafe assumptions.
title: "AI Output Review"
kind: "platform-adapter"
domain: "platforms"
status: "active"
owner: "APT"
last_updated: "2026-06-28"
source_paths: ["apt-agent-standards/codex/skills/ai-output-review/SKILL.md"]
---

# AI Output Review

## Purpose
Audit AI-generated work before it becomes trusted project content.

## When To Use
Use for generated implementations, docs, migrations, review comments, or policy.

## When Not To Use
Do not use as a replacement for running tests or checking primary sources.

## Required Reading
Read generated output, referenced files, project context, and relevant standards.

## Process
Check claims, APIs, file paths, behavior changes, security assumptions, and validation evidence.

## Output Format
Return unsupported claims, confirmed facts, required fixes, and validation gaps.

## Validation Checklist
- Claims are source-backed.
- No invented files or APIs.
- Validation gaps are explicit.
