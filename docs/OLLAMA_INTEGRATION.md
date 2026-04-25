# Ollama Integration

## Runtime Requirements
- Ollama installed locally
- Ollama service running
- `gpt-oss:20b` model available

## API Usage
- `GET /api/tags` for runtime/model detection
- `POST /api/generate` for review execution

## Contract
- Prompts enforce JSON-only output.
- Parser extracts JSON and validates with Zod schema.
- Invalid payloads become failed review runs with error details.
