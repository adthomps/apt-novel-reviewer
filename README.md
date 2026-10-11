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
- Package declaration builds write to ignored `packages/*/dist` directories; generated declarations do not belong in `src`.
- `pnpm release:dir` - build the unpacked Windows x64 application in `release/win-unpacked`
- `pnpm release:win` - build the Windows installer and its SHA-256 checksum in `release`

## Windows Installation and Setup

Windows 10 22H2 or newer (x64) is the initial release target. Run
`APT-Novel-Reviewer-<version>-x64-Setup.exe` to install for your current Windows
account. Node, pnpm, and developer tools are not needed on the user's computer.
The installer offers shortcuts and an installation directory choice. This local
release is unsigned; Windows may display an unknown-publisher/SmartScreen prompt.
Only install a build from a source you trust. No automatic updates or publishing
are configured.

In Setup:
1. Choose **Install Ollama**, run the official Windows installer, and choose
   **Check again**. Use **Locate ollama.exe** for a custom installation location.
2. Choose **Start Ollama** if it is not already running. Existing Ollama processes
   are reused; only a server started by this app is stopped when the app exits.
3. Choose **Download model** for `gpt-oss:20b`. Progress is shown for each layer;
   cancellation stops this app's request, and retry asks Ollama to pull again.
   Ollama may retain downloaded layers for subsequent attempts.

Installation and model download require internet. Ollama and model storage are
separate from the application and require substantial free disk space. Available
memory and GPU hardware affect review performance. Manuscripts are sent only to
the local Ollama endpoint; reviews stay local. The app does not install Ollama
silently or download a model until you request it. Custom executable selection
applies to the current app session.

Upgrades and uninstall preserve project/manuscript data and the SQLite database
under `%APPDATA%\@apt\desktop\apt-novel-reviewer`. Development uses the separate
`APT-Novel-Reviewer-Dev` directory. Uninstall does not remove Ollama or its models.

### Building a release

On a Windows x64 build machine, install Node 22 LTS or newer, pnpm 9.12.1, and
Visual Studio Build Tools with **Desktop development with C++** if prebuilt native
binaries are unavailable. Run `pnpm install`, then `pnpm release:win`. The build
downloads required Electron/NSIS tools, rebuilds SQLite for Electron, bundles SQL
migrations, and generates `<installer>.sha256`. The pnpm configuration limits
dependency path lengths to accommodate NSIS on Windows. After building a release,
run `pnpm --filter @apt/desktop rebuild-native` if development needs a native rebuild.

Before sharing a release, test on a clean Windows account or VM without developer
tools: launch via shortcut, create a project, import DOCX, restart and verify data,
complete Ollama setup and run a review. Also test upgrade and uninstall/reinstall
for data retention. A build on a developer machine does not establish these clean
machine acceptance criteria.

For a developer-machine packaged smoke test, run `node scripts/smoke-release.mjs`
after building. It launches from a non-repository working directory and checks
the Setup screen, preload API, SQLite migrations, and DOCX import, then deletes
its temporary project. Add `--review` to run a real local review when Ollama and
the model are already ready. An installed executable path can be supplied as the
first argument. `--keep` prints a retained test project ID; a later run with
`--verify=<id>` checks persistence and removes that test project. The script uses
a temporary local debug port (9337); normal application launches do not enable it.

## Graphify

See [docs/graphify.md](docs/graphify.md) for the manuscript-safe code architecture scope, exclusions, questions, and review workflow.
