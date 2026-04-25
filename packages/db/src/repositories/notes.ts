import { randomUUID } from "node:crypto";
import { getDb } from "../index";

export type NoteCategory = "character" | "timeline";

export interface NoteRecord {
  id: string;
  projectId: string;
  category: NoteCategory;
  title: string;
  content: string;
  linkedChapterId: string | null;
  createdAt: number;
  updatedAt: number;
}

export function listNotes(projectId: string, category?: NoteCategory): NoteRecord[] {
  if (!category) {
    return getDb()
      .prepare(
        `SELECT id, projectId, category, title, content, linkedChapterId, createdAt, updatedAt
         FROM notes WHERE projectId = ? ORDER BY updatedAt DESC`
      )
      .all(projectId) as NoteRecord[];
  }

  return getDb()
    .prepare(
      `SELECT id, projectId, category, title, content, linkedChapterId, createdAt, updatedAt
       FROM notes WHERE projectId = ? AND category = ? ORDER BY updatedAt DESC`
    )
    .all(projectId, category) as NoteRecord[];
}

export function createNote(input: {
  projectId: string;
  category: NoteCategory;
  title: string;
  content: string;
  linkedChapterId?: string | null;
}): NoteRecord {
  const now = Date.now();
  const note: NoteRecord = {
    id: randomUUID(),
    projectId: input.projectId,
    category: input.category,
    title: input.title.trim() || defaultTitle(input.category),
    content: input.content,
    linkedChapterId: input.linkedChapterId ?? null,
    createdAt: now,
    updatedAt: now
  };

  getDb()
    .prepare(
      `INSERT INTO notes (id, projectId, category, title, content, linkedChapterId, createdAt, updatedAt)
       VALUES (@id, @projectId, @category, @title, @content, @linkedChapterId, @createdAt, @updatedAt)`
    )
    .run(note);

  return note;
}

export function updateNote(input: {
  id: string;
  title: string;
  content: string;
  linkedChapterId?: string | null;
}): void {
  getDb()
    .prepare("UPDATE notes SET title = ?, content = ?, linkedChapterId = ?, updatedAt = ? WHERE id = ?")
    .run(input.title.trim() || "Untitled", input.content, input.linkedChapterId ?? null, Date.now(), input.id);
}

export function deleteNote(id: string): void {
  getDb().prepare("DELETE FROM notes WHERE id = ?").run(id);
}

function defaultTitle(category: NoteCategory): string {
  return category === "character" ? "Character Note" : "Timeline Note";
}
