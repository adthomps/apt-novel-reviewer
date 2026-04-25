export interface Version {
    id: string;
    projectId: string;
    versionNumber: number;
    timestamp: number;
    chapterCount: number;
    importedFrom: string;
}
export interface Chapter {
    id: string;
    versionId: string;
    projectId: string;
    chapterNumber: number;
    title: string;
    content: string;
    contentHash: string;
    wordCount: number;
    characterCount: number;
}
export type ChapterDiffStatus = "unchanged" | "modified" | "new" | "removed";
export interface ChapterDiff {
    chapterId: string;
    title: string;
    status: ChapterDiffStatus;
}
//# sourceMappingURL=manuscript.d.ts.map