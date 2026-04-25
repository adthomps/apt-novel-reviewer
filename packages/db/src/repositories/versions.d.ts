import type { Chapter, Version } from "@apt/types";
export interface ChapterInsert {
    chapterNumber: number;
    title: string;
    content: string;
    contentHash: string;
    wordCount: number;
    characterCount: number;
}
export declare function createVersion(projectId: string, importedFrom: string, chapters: ChapterInsert[]): Version;
export declare function listVersions(projectId: string): Version[];
export declare function listChapters(versionId: string): Chapter[];
//# sourceMappingURL=versions.d.ts.map