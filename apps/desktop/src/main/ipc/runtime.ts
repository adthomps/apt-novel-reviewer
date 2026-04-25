import { ipcMain } from "electron";
import { IPC } from "../../shared/ipc";
import { detectRuntime } from "../services/runtime";

export function registerRuntimeIpc() {
  ipcMain.handle(IPC.runtimeGetStatus, async () => detectRuntime());
  ipcMain.handle(IPC.runtimeGetModels, async () => {
    const status = await detectRuntime();
    return status.availableModels;
  });
}
