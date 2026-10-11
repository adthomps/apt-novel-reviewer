import { dialog, ipcMain, shell } from "electron";
import { z } from "zod";
import { IPC } from "../../shared/ipc";
import { beginModelPull, cancelModelPull, detectRuntime, getPullStatus, selectOllamaExecutable, startOllama } from "../services/runtime";

export function registerRuntimeIpc() {
  const handle = (channel: string, action: () => unknown) => ipcMain.handle(channel, (_event, ...args: unknown[]) => {
    z.tuple([]).parse(args);
    return action();
  });
  handle(IPC.runtimeOpenDownloadPage, () => shell.openExternal("https://ollama.com/download/windows"));
  handle(IPC.runtimeSelectExecutable, async () => {
    const result = await dialog.showOpenDialog({ title: "Locate ollama.exe", properties: ["openFile"], filters: [{ name: "Ollama executable", extensions: ["exe"] }] });
    if (result.canceled || !result.filePaths[0]) return false;
    selectOllamaExecutable(result.filePaths[0]);
    return true;
  });
  handle(IPC.runtimeStart, () => startOllama());
  handle(IPC.runtimeBeginPull, () => beginModelPull());
  handle(IPC.runtimeCancelPull, () => cancelModelPull());
  handle(IPC.runtimeGetPullStatus, () => getPullStatus());
  handle(IPC.runtimeGetStatus, async () => detectRuntime());
  handle(IPC.runtimeGetModels, async () => {
    const status = await detectRuntime();
    return status.availableModels;
  });
}
