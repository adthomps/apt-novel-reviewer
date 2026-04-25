import { contextBridge, ipcRenderer } from "electron";
import { IPC } from "../shared/ipc";

contextBridge.exposeInMainWorld("aptApi", {
  runtime: {
    getStatus: () => ipcRenderer.invoke(IPC.runtimeGetStatus),
    getModels: () => ipcRenderer.invoke(IPC.runtimeGetModels)
  },
  projects: {
    list: () => ipcRenderer.invoke(IPC.projectsList),
    create: (input: { name: string; description?: string }) => ipcRenderer.invoke(IPC.projectsCreate, input),
    delete: (projectId: string) => ipcRenderer.invoke(IPC.projectsDelete, projectId),
    open: (projectId: string) => ipcRenderer.invoke(IPC.projectsOpen, projectId)
  },
  notes: {
    list: (projectId: string, category?: "character" | "timeline") =>
      ipcRenderer.invoke(IPC.notesList, projectId, category),
    create: (input: {
      projectId: string;
      category: "character" | "timeline";
      title: string;
      content: string;
      linkedChapterId?: string | null;
    }) => ipcRenderer.invoke(IPC.notesCreate, input),
    update: (input: { id: string; title: string; content: string; linkedChapterId?: string | null }) =>
      ipcRenderer.invoke(IPC.notesUpdate, input),
    delete: (noteId: string) => ipcRenderer.invoke(IPC.notesDelete, noteId)
  },
  imports: {
    pickDocxFile: () => ipcRenderer.invoke(IPC.importPickDocx),
    importDocx: (projectId: string, filePath: string) => ipcRenderer.invoke(IPC.importDocx, projectId, filePath),
    importManualSplit: (projectId: string, filePath: string, fullText: string, delimiter: string) =>
      ipcRenderer.invoke(IPC.importManualSplit, projectId, filePath, fullText, delimiter)
  },
  versions: {
    list: (projectId: string) => ipcRenderer.invoke(IPC.versionsList, projectId),
    chapters: (versionId: string) => ipcRenderer.invoke(IPC.chaptersList, versionId)
  },
  reviews: {
    start: (input: { projectId: string; versionId: string; reviewType: string; chapterId?: string }) =>
      ipcRenderer.invoke(IPC.reviewStart, input),
    listRuns: (versionId: string) => ipcRenderer.invoke(IPC.reviewRunsList, versionId),
    deleteRun: (runId: string) => ipcRenderer.invoke(IPC.reviewRunDelete, runId),
    deleteRunsByStatus: (versionId: string, statuses: string[]) =>
      ipcRenderer.invoke(IPC.reviewRunsDeleteByStatus, versionId, statuses)
  },
  findings: {
    list: (projectId: string) => ipcRenderer.invoke(IPC.findingsList, projectId),
    export: (input: {
      projectId: string;
      format: "json" | "csv";
      activeVersionLabel: string;
      findings: Array<{
        id: string;
        reviewRunId: string;
        reviewType: string;
        chapterId: string;
        findingType: string;
        severity: string;
        confidence: string;
        textAnchor: string;
        issue: string;
        whyItMatters: string;
        evidence: string;
        suggestedFix: string;
        status: string;
      }>;
    }) => ipcRenderer.invoke(IPC.findingsExport, input),
    updateStatus: (findingId: string, status: "new" | "still" | "resolved") =>
      ipcRenderer.invoke(IPC.findingUpdateStatus, findingId, status)
  },
  compare: {
    versions: (projectId: string, fromVersionId: string, toVersionId: string) =>
      ipcRenderer.invoke(IPC.compareVersions, projectId, fromVersionId, toVersionId)
  }
});
