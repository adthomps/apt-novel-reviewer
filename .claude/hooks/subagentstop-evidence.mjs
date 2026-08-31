#!/usr/bin/env node
// SubagentStop hook. Appends each finished sub-agent's final message to a
// per-session evidence file so /edi synthesis and the human have the trail the
// provenance principle requires. Never blocks.
//
// Enable per repo by adding to .claude/settings.json:
//   "hooks": { "SubagentStop": [{ "hooks": [{ "type": "command",
//     "command": "node .claude/hooks/subagentstop-evidence.mjs" }] }] }

import { appendFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";

let raw = "";
process.stdin.on("data", (d) => (raw += d));
process.stdin.on("end", () => {
  try {
    const input = JSON.parse(raw || "{}");
    const session = (input.session_id || "session").replace(/[^\w-]/g, "");
    const dir = path.join(process.cwd(), ".apt", "council-evidence");
    mkdirSync(dir, { recursive: true });
    const body = input.last_message || input.transcript || JSON.stringify(input);
    appendFileSync(
      path.join(dir, `${session}.md`),
      `\n---\n## ${input.subagent_type || "subagent"} — ${new Date().toISOString()}\n\n${body}\n`,
    );
  } catch {
    // diagnostics only
  }
});
