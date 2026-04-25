import { ipcMain } from "electron";
import { noteRepo } from "@apt/db";
import { IPC } from "../../shared/ipc";

export function registerCanonIpc() {
  ipcMain.removeHandler(IPC.notesList);
  ipcMain.handle(IPC.notesList, async (_event, projectId: string, category?: "character" | "timeline") => {
    return noteRepo.listNotes(projectId, category);
  });

  ipcMain.removeHandler(IPC.notesCreate);
  ipcMain.handle(
    IPC.notesCreate,
    async (
      _event,
      input: {
        projectId: string;
        category: "character" | "timeline";
        title: string;
        content: string;
        linkedChapterId?: string | null;
      }
    ) => {
      return noteRepo.createNote(input);
    }
  );

  ipcMain.removeHandler(IPC.notesUpdate);
  ipcMain.handle(
    IPC.notesUpdate,
    async (
      _event,
      input: {
        id: string;
        title: string;
        content: string;
        linkedChapterId?: string | null;
      }
    ) => {
      noteRepo.updateNote(input);
      return { ok: true };
    }
  );

  ipcMain.removeHandler(IPC.notesDelete);
  ipcMain.handle(IPC.notesDelete, async (_event, noteId: string) => {
    noteRepo.deleteNote(noteId);
    return { ok: true };
  });
}
