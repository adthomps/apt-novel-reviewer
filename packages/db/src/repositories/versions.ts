import { randomUUID } from "node:crypto";
import type { Chapter, Version } from "@apt/types";
import { getDb } from "../index";

export interface ChapterInsert {
  chapterNumber: number;
  title: string;
  content: string;
  contentHash: string;
  wordCount: number;
  characterCount: number;
}

export function createVersion(projectId: string, importedFrom: string, chapters: ChapterInsert[]): Version {
  const db = getDb();
  const now = Date.now();
  const latest = db
    .prepare("SELECT COALESCE(MAX(versionNumber), 0) as lastVersion FROM versions WHERE projectId = ?")
    .get(projectId) as { lastVersion: number };

  const version: Version = {
    id: randomUUID(),
    projectId,
    versionNumber: latest.lastVersion + 1,
    timestamp: now,
    chapterCount: chapters.length,
    importedFrom
  };

  const insertVersion = db.prepare(
    `INSERT INTO versions (id, projectId, versionNumber, timestamp, chapterCount, importedFrom)
     VALUES (@id, @projectId, @versionNumber, @timestamp, @chapterCount, @importedFrom)`
  );

  const insertChapter = db.prepare(
    `INSERT INTO chapters (
      id, versionId, projectId, chapterNumber, title, content, contentHash, wordCount, characterCount
    ) VALUES (
      @id, @versionId, @projectId, @chapterNumber, @title, @content, @contentHash, @wordCount, @characterCount
    )`
  );

  const tx = db.transaction(() => {
    insertVersion.run(version);
    chapters.forEach((chapter) => {
      const record: Chapter = {
        id: randomUUID(),
        versionId: version.id,
        projectId,
        chapterNumber: chapter.chapterNumber,
        title: chapter.title,
        content: chapter.content,
        contentHash: chapter.contentHash,
        wordCount: chapter.wordCount,
        characterCount: chapter.characterCount
      };
      insertChapter.run(record);
    });
  });

  tx();
  return version;
}

export function listVersions(projectId: string): Version[] {
  return getDb()
    .prepare("SELECT * FROM versions WHERE projectId = ? ORDER BY versionNumber DESC")
    .all(projectId) as Version[];
}

export function listChapters(versionId: string): Chapter[] {
  return getDb()
    .prepare("SELECT * FROM chapters WHERE versionId = ? ORDER BY chapterNumber ASC")
    .all(versionId) as Chapter[];
}
