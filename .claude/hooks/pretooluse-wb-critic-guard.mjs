#!/usr/bin/env node
// PreToolUse hook (Edit|Write|MultiEdit). While a Working Backwards critic
// review is in progress (.wb-critic.lock exists at the repository root),
// blocks edits to writer artifacts so the critic cannot rewrite what it is
// scoring. critic-review.md and session.json stay writable. Never writes PASS.
// Ported from APT Commerce .cursor/hooks/wb-critic-guard.mjs.
//
// Enable per repo by adding to .claude/settings.json:
//   "hooks": { "PreToolUse": [{ "matcher": "Edit|Write|MultiEdit",
//     "hooks": [{ "type": "command",
//       "command": "node .claude/hooks/pretooluse-wb-critic-guard.mjs" }] }] }
//
// Fail-open: any parse/IO error allows the edit.

import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const WRITER_ARTIFACTS = new Set([
  "press-release.md",
  "faq-external.md",
  "faq-internal.md",
  "faq.md",
  "requirements.md",
  "engineering-handoff.md",
  "engineering-prompt.md",
  "readiness.md",
  "readme.md",
]);

let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw || "{}");
    const root = input.cwd || process.cwd();
    if (!existsSync(path.join(root, ".wb-critic.lock"))) return;
    const file = String(input.tool_input?.file_path || input.tool_input?.path || "").replaceAll("\\", "/");
    if (!/(^|\/)working-backwards\/[^/]+\//.test(file)) return;
    if (WRITER_ARTIFACTS.has(path.posix.basename(file).toLowerCase())) {
      process.stdout.write(JSON.stringify({
        decision: "block",
        reason: "Working Backwards critic review in progress (.wb-critic.lock). The critic writes only critic-review.md and session.json; writer artifacts change in a writer session after the verdict.",
      }));
    }
  } catch {
    // fail open
  }
});
