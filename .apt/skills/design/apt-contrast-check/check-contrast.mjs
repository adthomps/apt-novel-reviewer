#!/usr/bin/env node
// APT contrast contract check (APT-018).
// Every text token must reach WCAG AA (4.5:1) on every surface it is used on, in each theme.
//
// Usage: node check-contrast.mjs [--css apps/web/src/index.css] [--dark ".dark {"] [--light ":root {"]
// Without --dark/--light, the theme blocks are detected: a file with a ".dark {" block treats
// ".dark" as dark and ":root" as light; otherwise ":root" is dark and ".light" is light.
// Exits 1 and lists every failing pair when any pair is below AA.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

const MIN_CONTRAST = 4.5;

function arg(name) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

const cssPath = path.resolve(arg("css") || "apps/web/src/index.css");
if (!existsSync(cssPath)) {
  console.error(`Contrast check: stylesheet not found: ${cssPath}`);
  process.exit(1);
}
const css = readFileSync(cssPath, "utf8");
// Detection order: a ".light" block means :root is dark (dark-first, e.g. the toolboxes);
// otherwise a ".dark" block means :root is light (e.g. the APT site); otherwise the file has
// a single :root theme, checked as dark. Explicit --dark/--light always win.
const hasLightClass = /(^|\s)\.light\s*\{/m.test(css);
const hasDarkClass = /(^|\s)\.dark\s*\{/m.test(css);
const darkSelector = arg("dark") || (hasLightClass || !hasDarkClass ? ":root {" : ".dark {");
const lightSelector = arg("light") || (hasLightClass ? ".light {" : hasDarkClass ? ":root {" : null);

/** Reads `--name: value;` declarations from the first block opened by `selector`. */
function readThemeTokens(selector) {
  const start = css.indexOf(selector);
  if (start < 0) return null;
  const end = css.indexOf("}", start);
  const tokens = {};
  for (const match of css.slice(start, end).matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) {
    tokens[match[1]] = match[2].trim();
  }
  return tokens;
}

/** Relative luminance of an "H S% L%" channel triplet; null for anything else (e.g. var()). */
function luminance(value) {
  const match = /^(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%/.exec(value);
  if (!match) return null;
  const h = Number(match[1]);
  const s = Number(match[2]) / 100;
  const l = Number(match[3]) / 100;
  const a = s * Math.min(l, 1 - l);
  const channel = (n) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)));
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(0) + 0.7152 * channel(8) + 0.0722 * channel(4);
}

function contrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const themes = [
  // apt-surface-elevated is a dark panel in both themes, so it is a text surface only in dark.
  { name: "dark", selector: darkSelector, surfaces: ["background", "card", "muted", "secondary", "apt-surface-elevated"] },
  { name: "light", selector: lightSelector, surfaces: ["background", "card", "muted", "secondary"] },
];

const failures = [];
let checked = 0;
for (const { name, selector, surfaces } of themes) {
  if (!selector) continue; // single-theme stylesheet: no light block to check
  const tokens = readThemeTokens(selector);
  if (!tokens) {
    failures.push(`${name}: theme block "${selector}" not found`);
    continue;
  }
  const pairs = [];
  for (const text of ["foreground", "muted-foreground", "success", "warning"]) {
    for (const surface of surfaces) pairs.push([text, surface]);
  }
  // Primary text is AA on background and card only; on raised surfaces links use
  // text-foreground with an underline (APT-018).
  pairs.push(["primary", "background"], ["primary", "card"]);
  for (const fill of ["primary", "success", "warning", "destructive"]) pairs.push([`${fill}-foreground`, fill]);

  for (const [fg, bg] of pairs) {
    if (!tokens[fg] || !tokens[bg]) continue; // the product does not define this token
    const ratio = contrast(tokens[fg], tokens[bg]);
    if (ratio === null) continue;
    checked += 1;
    if (ratio < MIN_CONTRAST) failures.push(`${name}: --${fg} on --${bg} = ${ratio.toFixed(2)}:1`);
  }
}

const relative = path.relative(process.cwd(), cssPath);
if (failures.length) {
  console.error(`APT contrast check failed for ${relative} (WCAG AA ${MIN_CONTRAST}:1):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}
console.log(`APT contrast check passed: ${checked} token pairs meet WCAG AA in ${relative}.`);
