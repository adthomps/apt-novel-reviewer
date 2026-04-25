# PROJECT_RULES.md

## Product Boundaries
- This is a review tool, not a writing tool.
- Every import creates a new manuscript version.
- Review outputs must be schema-validated JSON.

## Technical Rules
- Keep app local-first.
- Ollama endpoint is local only.
- Default model for V1 is `gpt-oss:20b`.
- Use SQLite for structured persistence.
- Use Zod for all runtime contracts.

## UI Rules (APT)
- Dark-first palette
- Card-based layouts
- Low visual noise
- Single accent focus
- Subtle motion only

## Quality Rules
- New logic should include unit tests where practical.
- Keep modules small and single-purpose.
- Avoid introducing hidden global state.
