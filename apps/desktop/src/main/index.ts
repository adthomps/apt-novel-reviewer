import path from "node:path";
import fs from "node:fs";
import { app, BrowserWindow } from "electron";
import { initDb } from "@apt/db";
import { registerImportIpc } from "./ipc/import";
import { registerProjectsIpc } from "./ipc/projects";
import { registerReviewIpc } from "./ipc/reviews";
import { registerRuntimeIpc } from "./ipc/runtime";
import { registerCanonIpc } from "./ipc/canon";
import { getDbPath } from "./services/paths";

let mainWindow: BrowserWindow | null = null;
const isDev = Boolean(process.env.ELECTRON_RENDERER_URL);

if (isDev) {
  const devUserDataPath = path.join(app.getPath("appData"), "APT-Novel-Reviewer-Dev");
  migrateLegacyDevDatabase(devUserDataPath);
  app.setPath("userData", devUserDataPath);
  app.setPath("sessionData", path.join(devUserDataPath, "session"));
  app.commandLine.appendSwitch("disable-gpu-shader-disk-cache");
}

async function createWindow() {
  const preloadPath = resolvePreloadPath();

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 760,
    title: "APT Novel Reviewer",
    backgroundColor: "#0f1419",
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  mainWindow.webContents.on("preload-error", (_event, preloadScript, error) => {
    console.error("[preload-error]", preloadScript, error);
  });

  mainWindow.webContents.on("render-process-gone", (_event, details) => {
    console.error("[render-process-gone]", details.reason, details.exitCode);
  });

  if (process.env.ELECTRON_RENDERER_URL) {
    await mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}

app.whenReady().then(async () => {
  initDb(getDbPath());
  registerRuntimeIpc();
  registerProjectsIpc();
  registerCanonIpc();
  registerImportIpc();
  registerReviewIpc();
  await createWindow();

  app.on("activate", async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function resolvePreloadPath(): string {
  const candidates = [
    path.join(__dirname, "../preload/index.mjs"),
    path.join(__dirname, "../preload/index.js")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  throw new Error(`Preload bundle not found. Checked: ${candidates.join(", ")}`);
}

function migrateLegacyDevDatabase(stableUserDataPath: string): void {
  const stableDbPath = path.join(stableUserDataPath, "apt-novel-reviewer", "apt.db");
  if (fs.existsSync(stableDbPath)) {
    return;
  }

  const appDataPath = app.getPath("appData");
  const legacyPrefix = "APT-Novel-Reviewer-Dev-";

  const legacyCandidates = fs
    .readdirSync(appDataPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(legacyPrefix))
    .map((entry) => path.join(appDataPath, entry.name, "apt-novel-reviewer", "apt.db"))
    .filter((candidate) => fs.existsSync(candidate));

  if (legacyCandidates.length === 0) {
    return;
  }

  const latestLegacyDb = legacyCandidates
    .map((candidate) => ({
      candidate,
      mtime: fs.statSync(candidate).mtimeMs
    }))
    .sort((a, b) => b.mtime - a.mtime)[0]?.candidate;

  if (!latestLegacyDb) {
    return;
  }

  fs.mkdirSync(path.dirname(stableDbPath), { recursive: true });
  fs.copyFileSync(latestLegacyDb, stableDbPath);
}
