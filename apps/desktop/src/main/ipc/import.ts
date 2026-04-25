import { dialog, ipcMain } from "electron";
import { createManualChaptersFromText, parseDocxIntoChapters } from "@apt/lib";
import { versionRepo } from "@apt/db";
import { IPC } from "../../shared/ipc";

export function registerImportIpc() {
  ipcMain.handle(IPC.importPickDocx, async () => {
    const result = await dialog.showOpenDialog({
      title: "Select manuscript DOCX",
      properties: ["openFile"],
      filters: [{ name: "Word documents", extensions: ["docx"] }]
    });

    if (result.canceled || result.filePaths.length === 0) {
      return null;
    }

    return result.filePaths[0];
  });

  ipcMain.handle(IPC.importDocx, async (_event, projectId: string, filePath: string) => {
    const parsed = await parseDocxIntoChapters(filePath);

    if (parsed.usedFallback) {
      return {
        status: "manual_split_required" as const,
        filePath,
        fullText: parsed.fullText,
        suggestedDelimiter: "Chapter "
      };
    }

    const version = versionRepo.createVersion(projectId, filePath, parsed.chapters);
    return {
      status: "imported" as const,
      versionId: version.id,
      usedFallback: false
    };
  });

  ipcMain.handle(
    IPC.importManualSplit,
    async (_event, projectId: string, filePath: string, fullText: string, delimiter: string) => {
      const chapters = createManualChaptersFromText(fullText, delimiter);
      const version = versionRepo.createVersion(projectId, filePath, chapters);
      return {
        status: "imported" as const,
        versionId: version.id,
        usedFallback: true,
        chapterCount: chapters.length
      };
    }
  );

  ipcMain.handle(IPC.versionsList, async (_event, projectId: string) => versionRepo.listVersions(projectId));
  ipcMain.handle(IPC.chaptersList, async (_event, versionId: string) => versionRepo.listChapters(versionId));
}
