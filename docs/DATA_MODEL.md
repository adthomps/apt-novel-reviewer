# Data Model

## Tables
- `projects`
- `versions`
- `chapters`
- `review_runs`
- `findings`
- `notes`
- `warnings`
- `version_comparisons`

## Relationship Summary
- Project has many versions.
- Version has many chapters.
- Version has many review runs.
- Review run has many findings.
- Comparison stores resolved/still/new classification between versions.

## Migration
Initial schema is in:
- `packages/db/src/migrations/001_init.sql`
