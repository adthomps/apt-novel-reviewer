#!/usr/bin/env node
// APT contrast contract check (APT-018).
// Every text token must reach WCAG AA (4.5:1) on every surface it is used on, in each theme.
//
// CLI:    node check-contrast.mjs [--css apps/web/src/index.css] [--dark ".dark {"] [--light ":root {"]
// Module: import { readThemes, checkContrast } from "./check-contrast.mjs" (used by apt-design-check).
//
// Theme blocks are detected when not given: a ".light" block means :root is dark (dark-first);
// otherwise a ".dark" block means :root is light; otherwise a single :root theme, checked as dark.
// Local `@import` of other stylesheets (for example the generated .apt/design/generated/apt-tokens.css)
// is followed, so imported values count and local blocks override them.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

export const MIN_CONTRAST = 4.5;

/** CSS text of a stylesheet with its local @imports inlined first (one level deep is enough). */
function cssWithImports(cssPath, seen = new Set()) {
  if (seen.has(cssPath) || !existsSync(cssPath)) return "";
  seen.add(cssPath);
  const css = readFileSync(cssPath, "utf8");
  const imported = [];
  for (const match of css.matchAll(/@import\s+(?:url\()?["']([^"')]+)["']\)?[^;]*;/g)) {
    const target = match[1];
    if (/^(https?:)?\/\//.test(target) || !/\.css$/.test(target)) continue;
    imported.push(cssWithImports(path.resolve(path.dirname(cssPath), target), seen));
  }
  return `${imported.join("\n")}\n${css}`;
}

/** Merges every block opened by `selector` in order, so later blocks override earlier ones. */
function readBlock(css, selector) {
  const tokens = {};
  let found = false;
  let from = 0;
  for (;;) {
    const start = css.indexOf(selector, from);
    if (start < 0) break;
    found = true;
    const end = css.indexOf("}", start);
    for (const match of css.slice(start, end).matchAll(/--([a-z0-9-]+):\s*([^;]+);/g)) tokens[match[1]] = match[2].trim();
    from = end;
  }
  return found ? tokens : null;
}

/**
 * Reads the dark and light token maps of a stylesheet.
 * Returns { dark: {name: value} | null, light: {...} | null, darkSelector, lightSelector, rootTheme }.
 */
export function readThemes(cssPath, { dark, light } = {}) {
  const css = cssWithImports(path.resolve(cssPath));
  const hasLightClass = /(^|[\s}])\.light\s*\{/m.test(css);
  const hasDarkClass = /(^|[\s}])\.dark\s*\{/m.test(css);
  const darkSelector = dark || (hasLightClass || !hasDarkClass ? ":root {" : ".dark {");
  const lightSelector = light || (hasLightClass ? ".light {" : hasDarkClass ? ":root {" : null);
  return {
    dark: readBlock(css, darkSelector),
    light: lightSelector ? readBlock(css, lightSelector) : null,
    darkSelector,
    lightSelector,
    rootTheme: darkSelector === ":root {" ? "dark" : "light",
  };
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

export function contrastRatio(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === null || lb === null) return null;
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/** Checks the APT-018 pairs. Returns { checked, failures: string[] }. */
export function checkContrast(themes) {
  const failures = [];
  let checked = 0;
  const plan = [
    // apt-surface-elevated is a dark panel in both themes, so it is a text surface only in dark.
    { name: "dark", tokens: themes.dark, surfaces: ["background", "card", "muted", "secondary", "apt-surface-elevated"] },
    { name: "light", tokens: themes.light, surfaces: ["background", "card", "muted", "secondary"] },
  ];
  for (const { name, tokens, surfaces } of plan) {
    if (!tokens) {
      if (name === "dark") failures.push(`dark: theme block "${themes.darkSelector}" not found`);
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
      const ratio = contrastRatio(tokens[fg], tokens[bg]);
      if (ratio === null) continue;
      checked += 1;
      if (ratio < MIN_CONTRAST) failures.push(`${name}: --${fg} on --${bg} = ${ratio.toFixed(2)}:1`);
    }
  }
  return { checked, failures };
}

function main() {
  const arg = (name) => {
    const index = process.argv.indexOf(`--${name}`);
    return index >= 0 ? process.argv[index + 1] : undefined;
  };
  const cssPath = path.resolve(arg("css") || "apps/web/src/index.css");
  if (!existsSync(cssPath)) {
    console.error(`Contrast check: stylesheet not found: ${cssPath}`);
    process.exit(1);
  }
  const { checked, failures } = checkContrast(readThemes(cssPath, { dark: arg("dark"), light: arg("light") }));
  const relative = path.relative(process.cwd(), cssPath);
  if (failures.length) {
    console.error(`APT contrast check failed for ${relative} (WCAG AA ${MIN_CONTRAST}:1):`);
    for (const failure of failures) console.error(`- ${failure}`);
    process.exit(1);
  }
  console.log(`APT contrast check passed: ${checked} token pairs meet WCAG AA in ${relative}.`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main();
