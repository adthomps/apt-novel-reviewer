import path from "node:path";
import fs from "node:fs";
import { app } from "electron";

export function getAppDataDir(): string {
  const base = app.getPath("userData");
  const dir = path.join(base, "apt-novel-reviewer");
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function getDbPath(): string {
  return path.join(getAppDataDir(), "apt.db");
}

export function getDefaultProjectsRoot(): string {
  const documents = app.getPath("documents");
  const root = path.join(documents, "APT-Projects");
  fs.mkdirSync(root, { recursive: true });
  return root;
}
