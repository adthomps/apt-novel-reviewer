#!/usr/bin/env node
// APT design check (APT-019): one entry point for contrast, token drift, and design lint.
//
// Run from a product repo root after `apt-assets sync` has installed the design manifest:
//   node .apt/design/bin/apt-design-check.mjs [--config apt-design.json] [--only contrast,drift,lint] [--json]
//
// apt-design.json (see references/apt-design.schema.json):
//   tier        1 = canonical APT values, 2 = own palette with APT semantic names, 3 = no checks
//   css         stylesheet holding (or importing) the theme tokens
//   themes      optional { dark, light } block selectors, e.g. { "dark": ":root {", "light": ".light {" }
//   exclusions  Tier 1 tokens allowed to differ: [{ token, themes?, reason, decision }]
//   lint        { roots, allowlist, disable, baseline }  (baseline: accepted finding count, ratchets down)
//
// Exit code 1 when any enabled check fails.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { checkContrast, readThemes } from "../../skills/design/apt-contrast-check/check-contrast.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const generatedDir = path.resolve(here, "..", "generated");
const repoRoot = process.cwd();

const arg = (name) => {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
};
const asJson = process.argv.includes("--json");
const configPath = path.resolve(arg("config") || "apt-design.json");
if (!existsSync(configPath)) {
  console.error(`APT design check: ${path.relative(repoRoot, configPath)} not found. Add one (tier, css) - see .apt/design/README.md.`);
  process.exit(1);
}
const config = JSON.parse(readFileSync(configPath, "utf8"));
const tier = Number(config.tier);
const only = arg("only") ? new Set(arg("only").split(",")) : null;
const enabled = (name) => tier !== 3 && (!only || only.has(name));
const designVersion = existsSync(path.resolve(here, "..", "VERSION")) ? readFileSync(path.resolve(here, "..", "VERSION"), "utf8").trim() : "unknown";

const results = [];
const record = (check, failures, summary) => results.push({ check, status: failures.length ? "fail" : "pass", summary, failures });

const cssPath = config.css ? path.resolve(repoRoot, config.css) : null;
const themes = cssPath && existsSync(cssPath) ? readThemes(cssPath, config.themes || {}) : null;
if (tier !== 3 && !themes) {
  record("config", [`stylesheet not found: ${config.css}`], "apt-design.json css path");
}

// ── Contrast ────────────────────────────────────────────────────────────────
if (themes && enabled("contrast")) {
  const { checked, failures } = checkContrast(themes);
  record("contrast", failures, `${checked} token pairs checked against WCAG AA`);
}

// ── Token drift ─────────────────────────────────────────────────────────────
const TIER2_REQUIRED = [
  "background", "foreground", "card", "card-foreground", "primary", "primary-foreground",
  "muted", "muted-foreground", "border", "destructive", "destructive-foreground", "success", "warning",
];
const normalize = (value) => String(value).replace(/\s+/g, " ").replace(/\s*\/\s*/g, " / ").trim();

function excluded(token, theme) {
  return (config.exclusions || []).some(
    (item) => item.token === token && (!item.themes || item.themes.includes(theme)),
  );
}

if (themes && enabled("drift")) {
  const failures = [];
  let compared = 0;
  if (tier === 1) {
    const canonical = readThemes(path.join(generatedDir, "apt-tokens.css"));
    for (const theme of ["dark", "light"]) {
      const local = themes[theme];
      if (!local) {
        if (theme === "dark") failures.push("dark theme block not found");
        continue; // dark-only products have no light block to compare
      }
      for (const [token, value] of Object.entries(canonical[theme])) {
        if (["radius", "motion-fast", "motion-medium", "motion-slow"].includes(token)) continue;
        if (excluded(token, theme)) continue;
        compared += 1;
        if (!(token in local)) failures.push(`${theme}: --${token} missing (canonical ${value})`);
        else if (normalize(local[token]) !== normalize(value)) failures.push(`${theme}: --${token} is ${local[token]}, canonical ${value}`);
      }
    }
    for (const item of config.exclusions || []) {
      if (!item.reason || !item.decision) failures.push(`exclusion --${item.token} needs a reason and a decision record`);
    }
  } else if (tier === 2) {
    for (const theme of ["dark", "light"]) {
      if (!themes[theme]) continue;
      for (const token of TIER2_REQUIRED) {
        compared += 1;
        if (!(token in themes[theme])) failures.push(`${theme}: semantic token --${token} missing`);
      }
    }
  }
  record("drift", failures, tier === 1 ? `${compared} tokens compared to canonical v${designVersion}` : `${compared} semantic token names checked`);
}

// ── Design lint ─────────────────────────────────────────────────────────────
const RULES = {
  "raw-palette": /\b(?:bg|text|border|ring|from|to|via|decoration|placeholder|fill|stroke|outline)-(?:blue|green|emerald|yellow|amber|red|gray|slate|zinc|neutral|stone|purple|violet|indigo|pink|rose|fuchsia|orange|lime|teal|cyan|sky)-(?:50|100|200|300|400|500|600|700|800|900|950)(?:\/\d+)?\b/g,
  "raw-monochrome": /\b(?:bg|text|border|ring|from|to|via)-(?:white|black)(?:\/\d+)?\b/g,
  "raw-hex": /(?<![\w&-])#[0-9a-fA-F]{3,8}\b/g,
  // Menu and dropdown highlight uses focus:bg-accent (Radix moves focus to the highlighted option).
  // focus-visible:bg-accent replaces the blue focus ring, so it still fails.
  "accent-interaction": /\bfocus-visible:bg-accent(?:\/\d+)?\b/g,
};
const IGNORE_MARKER = "design-check-ignore";
const LINT_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".css"]);
const SKIP_DIRS = new Set(["node_modules", "dist", ".output", ".apt", ".apt-backups", "build", "coverage", "graphify-out"]);

function walk(dir, files = []) {
  if (!existsSync(dir)) return files;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (LINT_EXTENSIONS.has(path.extname(entry.name))) files.push(full);
  }
  return files;
}

if (enabled("lint")) {
  const lint = config.lint || {};
  const roots = (lint.roots || ["apps/web/src"]).map((root) => path.resolve(repoRoot, root));
  const allowlist = new Set((lint.allowlist || []).map((file) => path.resolve(repoRoot, file)));
  if (cssPath) allowlist.add(cssPath); // the token stylesheet is where literal values belong
  const disabled = new Set(lint.disable || []);
  const failures = [];
  let scanned = 0;
  for (const file of roots.flatMap((root) => walk(root))) {
    if (allowlist.has(file) || !statSync(file).isFile()) continue;
    scanned += 1;
    const lines = readFileSync(file, "utf8").split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes(IGNORE_MARKER)) return;
      for (const [rule, pattern] of Object.entries(RULES)) {
        if (disabled.has(rule)) continue;
        pattern.lastIndex = 0;
        for (const match of line.matchAll(pattern)) {
          failures.push(`${path.relative(repoRoot, file)}:${index + 1} ${rule}: ${match[0]}`);
        }
      }
    });
  }
  // Ratchet: lint.baseline is the number of findings a repo has accepted while it cleans up.
  // The check fails only when findings rise above it, and asks for the baseline to come down
  // when they fall below it, so the count can only go one way.
  const baseline = Number.isInteger(lint.baseline) ? lint.baseline : 0;
  if (baseline > 0 && failures.length <= baseline) {
    const note = failures.length < baseline ? `; lower lint.baseline to ${failures.length}` : "";
    results.push({ check: "lint", status: "pass", summary: `${scanned} files scanned, ${failures.length} findings within baseline ${baseline}${note}`, failures: [] });
  } else {
    record("lint", failures, `${scanned} files scanned${baseline > 0 ? `, ${failures.length} findings above baseline ${baseline}` : ""}`);
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const passed = results.every((result) => result.status === "pass");
if (asJson) {
  console.log(JSON.stringify({ designVersion, tier, status: passed ? "pass" : "fail", results }, null, 2));
} else {
  console.log(`APT design check (design v${designVersion}, tier ${tier}): ${tier === 3 ? "no checks for tier 3" : passed ? "PASS" : "FAIL"}`);
  for (const result of results) {
    console.log(`- ${result.check}: ${result.status} (${result.summary})`);
    for (const failure of result.failures.slice(0, 50)) console.log(`    ${failure}`);
    if (result.failures.length > 50) console.log(`    ... ${result.failures.length - 50} more`);
  }
}
process.exit(passed ? 0 : 1);
