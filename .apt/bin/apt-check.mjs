#!/usr/bin/env node
// Installed as .apt/bin/apt-check.mjs by apt-principles-agents. Do not edit the installed copy:
// edit apt-principles-agents/bin/apt-check-shim.mjs and sync.
//
// Finds the canonical apt-principles-agents checkout and runs its bin/apt-check.mjs against this
// repository. Lookup order: APT_PRINCIPLES_AGENTS_ROOT, ../apt-principles-agents (local
// workspace), ./_apt-principles-agents (the CI checkout path). Without a checkout it skips
// locally and fails in CI, where the workflow is expected to provide one.
//
//   node .apt/bin/apt-check.mjs [--mode push|ci] [--only ...] [--json]

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const candidates = [
  process.env.APT_PRINCIPLES_AGENTS_ROOT,
  path.resolve(repoRoot, "..", "apt-principles-agents"),
  path.resolve(repoRoot, "_apt-principles-agents"),
].filter(Boolean);
const root = candidates.find((candidate) => existsSync(path.join(candidate, "bin", "apt-check.mjs")));

if (!root) {
  const message = "apt-check: apt-principles-agents not found (set APT_PRINCIPLES_AGENTS_ROOT or check it out next to this repo).";
  if (process.env.CI) {
    console.error(message);
    process.exit(1);
  }
  console.log(`${message} Skipped.`);
  process.exit(0);
}

const result = spawnSync(
  process.execPath,
  [path.join(root, "bin", "apt-check.mjs"), "--repo-root", repoRoot, ...process.argv.slice(2)],
  { stdio: "inherit" },
);
process.exit(result.status ?? 1);
