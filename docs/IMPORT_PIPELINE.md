# Import Pipeline

## Flow
1. User imports a `.docx` file path.
2. Raw text is extracted from DOCX.
3. Heading heuristics attempt chapter detection.
4. If no chapter headings are found, fallback path marks import as manual split candidate.
5. Parsed chapters are stored as a new version.

## Rules
- Every import creates a new version.
- Chapter hashes are generated for diff classification.
- Compare uses hash and finding fingerprint strategies.
