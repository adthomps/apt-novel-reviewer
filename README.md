# APT Local Novel Review Desktop App (V1)

Local-first desktop review tool for manuscript analysis with Ollama.

## Scope
- Import `.docx` manuscripts as versions
- Parse manuscript into chapters
- Run local review modes through Ollama (`gpt-oss:20b`)
- Persist projects, versions, chapters, review runs, findings
- Compare findings across versions (`resolved`, `still`, `new`)

Non-goals are enforced from the prompt: no chat assistant, no cloud APIs, no in-app rewriting/editor workflow.

## Tech Stack
- Electron + React + TypeScript + Vite
- Tailwind CSS with APT dark-first card-based styling
- SQLite (`better-sqlite3`)
- Ollama local API
- Zod schema validation

## Workspace Layout
- `apps/desktop`: Electron application (main, preload, renderer)
- `packages/types`: shared domain types
- `packages/lib`: parsing, schema, prompt, compare logic
- `packages/db`: SQLite migrations and repositories
- `packages/ui`: reusable UI components and tokens
- `docs`: architecture and product docs

## Current Implementation Status
- App shell with required layout regions
- Setup page runtime/model detection
- Library page project create/open/delete
- Manuscript import pipeline with chapter parsing and version creation
- Review engine with all required modes and JSON validation path
- Findings list and compare views
- Base settings and canon pages
- Unit tests for parsing/diff/JSON result handling in `packages/lib`

## Local Run (Windows)
1. Install Node 22 LTS (recommended) and pnpm.
2. Install dependencies:
   - `pnpm install`
3. Start the app:
   - `pnpm dev`

### Important Native Dependency Note
`better-sqlite3` requires native tooling. On Windows, if install fails:
- Install Visual Studio Build Tools with "Desktop development with C++"
- Or use Node 22 LTS where prebuilt binaries are more available

## Scripts
- `pnpm dev` - run desktop app in development mode
- `pnpm build` - build all workspace packages/apps
- `pnpm typecheck` - recursive TypeScript checks
- `pnpm test` - recursive tests
