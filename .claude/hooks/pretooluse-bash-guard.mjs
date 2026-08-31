#!/usr/bin/env node
// PreToolUse hook (Bash). Blocks destructive / outward-facing commands unless
// the session sets APT_APPROVED=1 in its environment.
//
// Enable per repo by adding to .claude/settings.json:
//   "hooks": { "PreToolUse": [{ "matcher": "Bash",
//     "hooks": [{ "type": "command",
//       "command": "node .claude/hooks/pretooluse-bash-guard.mjs" }] }] }
//
// Fail-open on parse error. Matches only high-confidence patterns.

import process from "node:process";

const DANGER = [
  /\bwrangler\s+deploy\b/,
  /\b(npm|pnpm|yarn)\s+publish\b/,
  /\bgit\s+push\b.*(--force|-f)\b/,
  /\bgit\s+push\b.*\bmain\b/,
  /\brm\s+-rf\s+[/~]/,
  /\b(curl|wget)\b.*\|\s*(sh|bash)\b/,
  /\.env(\.|\b)/,
];

let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  if (process.env.APT_APPROVED === "1") return;
  try {
    const cmd = JSON.parse(raw || "{}").tool_input?.command || "";
    for (const re of DANGER) {
      if (re.test(cmd)) {
        process.stdout.write(
          JSON.stringify({
            decision: "block",
            reason:
              "APT guard: destructive or outward-facing command. Confirm with the human, then re-run in a shell where APT_APPROVED=1 is set.",
          }),
        );
        return;
      }
    }
  } catch {
    // fail open
  }
});
