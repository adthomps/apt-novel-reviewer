#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const packageDir = process.cwd();
const allowedExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);
const ignoredDirs = new Set(["node_modules", "dist", "out", "coverage", ".turbo"]);
const startDirs = ["src", "test", "tests"];
const issues = [];

function walk(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return;
  }

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        walk(path.join(dirPath, entry.name));
      }
      continue;
    }

    const filePath = path.join(dirPath, entry.name);
    if (!allowedExtensions.has(path.extname(filePath))) {
      continue;
    }

    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\r?\n/);

    lines.forEach((line, index) => {
      const lineNumber = index + 1;
      if (line.includes("<<<<<<<") || line.includes(">>>>>>>") || line === "=======") {
        issues.push(`${path.relative(packageDir, filePath)}:${lineNumber} contains merge conflict markers`);
      }
      if (/[ \t]+$/.test(line)) {
        issues.push(`${path.relative(packageDir, filePath)}:${lineNumber} has trailing whitespace`);
      }
    });
  }
}

for (const startDir of startDirs) {
  walk(path.join(packageDir, startDir));
}

if (issues.length) {
  process.stderr.write(`Lint failed for ${path.basename(packageDir)}\n`);
  for (const issue of issues) {
    process.stderr.write(`- ${issue}\n`);
  }
  process.exit(1);
}

process.stdout.write(`Lint passed for ${path.basename(packageDir)}\n`);
