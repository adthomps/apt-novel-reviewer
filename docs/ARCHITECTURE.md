# Architecture

## High-Level
- Electron main process handles filesystem, DB, and Ollama calls.
- Preload exposes a strict, minimal API surface.
- Renderer handles page state and presentation.

## Data Path
1. Renderer requests action through `window.aptApi`.
2. Preload forwards to IPC channels.
3. Main process validates and executes logic.
4. Main process persists/retrieves from SQLite.
5. Renderer receives typed result payloads.

## Security
- `contextIsolation: true`
- `nodeIntegration: false`
- Renderer does not call Ollama directly.
- CSP restricts connect target to local Ollama endpoint.
