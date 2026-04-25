import path from "node:path";
import { ipcMain } from "electron";
import { projectRepo } from "@apt/db";
import { IPC } from "../../shared/ipc";
import { getDefaultProjectsRoot } from "../services/paths";

export function registerProjectsIpc() {
  ipcMain.handle(IPC.projectsList, async () => projectRepo.listProjects());

  ipcMain.handle(IPC.projectsCreate, async (_event, input: { name: string; description?: string }) => {
    const projectPath = path.join(getDefaultProjectsRoot(), sanitizeFolderName(input.name));
    return projectRepo.createProject({ ...input, projectPath });
  });

  ipcMain.handle(IPC.projectsDelete, async (_event, projectId: string) => {
    projectRepo.deleteProject(projectId);
  });

  ipcMain.handle(IPC.projectsOpen, async (_event, projectId: string) => {
    projectRepo.touchProject(projectId);
  });
}

function sanitizeFolderName(name: string): string {
  return name.trim().replace(/[^a-zA-Z0-9-_ ]/g, "").replace(/\s+/g, "-").toLowerCase();
}
