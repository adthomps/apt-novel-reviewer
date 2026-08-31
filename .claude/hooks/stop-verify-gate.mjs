#!/usr/bin/env node
// Stop hook. Warn-only by default: when the session ends with a dirty tree that
// touches an enforceable domain, print which review agents the change implies so
// the human can see whether the council was actually run. Never blocks unless
// APT_STOP_GATE=block is set.
//
// Enable per repo by adding to .claude/settings.json:
//   "hooks": { "Stop": [{ "hooks": [{ "type": "command",
//     "command": "node .claude/hooks/stop-verify-gate.mjs" }] }] }

import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const ENFORCEABLE = {
  "security-risk": "apt-security-reviewer / kasumi / samara",
  security: "kasumi",
  payments: "wrex + the payments council",
  api: "glyph + the api council",
  architecture: "javik + the architecture council",
  ai: "apt-router / apt-principal",
  ecommerce: "kaidan + the ecommerce council",
};

function changedFiles() {
  try {
    return execSync("git diff --name-only HEAD", { encoding: "utf8" }).split(/\r?\n/).filter(Boolean);
  } catch {
    return [];
  }
}

const files = changedFiles();
if (files.length === 0) process.exit(0);

const hits = new Set();
for (const f of files) {
  const parts = f.split("/");
  for (const [dir, council] of Object.entries(ENFORCEABLE)) {
    if (parts.includes(dir) || parts.includes(`${dir}s`)) hits.add(council);
  }
  if (/\bpayment|checkout|auth|token|webhook/i.test(f)) hits.add(ENFORCEABLE.payments);
}

if (hits.size === 0) process.exit(0);

const msg =
  `[apt stop-gate] the change touches enforceable surfaces. Before this is "done", these reviews should have run:\n` +
  [...hits].map((h) => `  - ${h}`).join("\n") +
  `\nRun /edi or node ../apt-principles-agents/scripts/run-council.mjs <plan> to convene them.`;

if (process.env.APT_STOP_GATE === "block") {
  process.stdout.write(JSON.stringify({ decision: "block", reason: msg }));
} else {
  process.stderr.write(msg + "\n");
}
