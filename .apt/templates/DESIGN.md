---
title: DESIGN.md
version: v1
last_updated: {{DATE}}
owner: {{OWNER}}
status: draft
kind: "template"
domain: "DESIGN"
source_paths: ["apt-principles/templates/DESIGN.md"]
---

# DESIGN.md

## Purpose

This document defines the design standards for APT-based applications.

Design decisions should prioritize:

1. Clarity
2. Accessibility
3. Consistency
4. Efficiency
5. Practicality

---

# Design Philosophy

Users should never need to guess:

* What happened
* What is happening
* What to do next

Interfaces should communicate clearly.

---

# Design Hierarchy

1. User Goals
2. Accessibility
3. Usability
4. Consistency
5. Visual Design

Visual styling should never override usability.

---

# User Experience Principles

## Clarity

Interfaces should:

* Use plain language
* Avoid jargon
* Present information progressively

## Consistency

Use established patterns.

Avoid creating one-off interactions.

## Feedback

Users should receive feedback for:

* Success
* Failure
* Validation
* Loading
* Completion

## Error Recovery

Every error should provide:

* What happened
* Why it happened
* What to do next

---

# Accessibility Standards

Minimum requirements:

* WCAG 2.2 AA
* Keyboard navigation
* Screen reader support
* Visible focus indicators
* Accessible form labels
* Accessible color contrast on every surface (background, card, muted, secondary, elevated), checked automatically

Accessibility is required.

---

# Responsive Design

Mobile-first approach.

Target:

* Mobile
* Tablet
* Desktop

Support common viewport sizes.

---

# Design System

Use existing design system components first.

Preferred order:

1. Repository Design System
2. Shared Components
3. New Components

Avoid duplication.

---

# Information Architecture

Follow:

Summary → Detail

Users should:

* Scan quickly
* Drill deeper when needed

Avoid overwhelming screens.

---

# States

Every screen should support:

* Loading
* Empty
* Success
* Error
* Permission denied

Do not leave users without context.

---

# Forms

Forms should:

* Validate early
* Validate clearly
* Explain errors
* Prevent invalid submissions

Front-end validation is required.

---

# AI-Assisted Experiences

AI output should:

* Be explainable
* Be reviewable
* Provide sources when available
* Avoid pretending certainty

AI should assist decisions, not replace judgment.

---

# APT Design Review Checklist

✓ Clear purpose

✓ Clear navigation

✓ Accessible

✓ Mobile friendly

✓ Error states handled

✓ Loading states handled

✓ Consistent patterns

✓ Supports user goals
