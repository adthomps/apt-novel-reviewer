---
title: APT Testing Standards
version: v1
last_updated: 2026-05-31
owner: APT
status: stable
kind: "standard"
domain: "testing"
source_paths: ["apt-principles/standards/testing/testing-standards.md"]
---

# Testing Standards

Extracted from `quality-testing.md`. See that file for full principles, prompts, and examples.

## Test Hierarchy

Run checks in order from fastest to slowest:

1. Lint and type checking
2. Unit tests (pure logic, close to the package)
3. API / integration tests (service boundaries)
4. Build
5. Preview validation
6. E2E tests (critical user journeys only)

## Unit Tests

- Unit tests cover pure logic, utilities, and business rules.
- Test logic close to where it lives (co-located with the package or service).
- One test file per module/function where practical.

## API / Integration Tests

- Shared API contracts require tests at the boundary.
- Test the happy path, validation failures, and auth boundaries.
- Do not test internal implementation — test the observable contract.

## E2E Tests

- Use E2E for critical user journeys, not every branch.
- E2E tests run against a preview or staging environment, not production.
- Prefer few, stable E2E tests over many fragile ones.

## Coverage

- 100% coverage is not required. Coverage of critical paths is.
- Security-sensitive code requires test coverage.
- Every bug fix must include a regression test.

## Validation Evidence

Before release, provide:

- Test command and output summary
- Preview or screenshot evidence for user-facing changes
- Known risk notes if coverage is intentionally limited

## Failing Tests

- Failing tests must be fixed before merge.
- If a test is intentionally skipped, document why.
- Do not delete tests to make CI pass — fix the underlying issue.

## Design-System Lint Gates

UI and public documentation surfaces include design-system lint gates.

- `references/design-lint-gates.json` — machine-readable lint rules
- Lint gate failures are treated as test failures and must be resolved before merge.

## Related

- `quality-testing.md` — canonical source
- `checklists/quality-testing-checklist.md`
- `examples/quality/validation-plan-example.md`
- `prompts/testing-review-prompt.md`
- `references/design-lint-gates.json`
