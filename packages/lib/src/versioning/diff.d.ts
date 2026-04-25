export type ChangeClass = "unchanged" | "modified" | "new" | "removed";
export interface ChapterSnapshot {
    chapterNumber: number;
    title: string;
    contentHash: string;
}
export interface ChapterChange {
    chapterNumber: number;
    title: string;
    status: ChangeClass;
}
export declare function diffChapterHashes(previous: ChapterSnapshot[], current: ChapterSnapshot[]): ChapterChange[];
export interface FindingComparable {
    id: string;
    type: string;
    chapterId: string;
    issue: string;
}
export declare function compareFindings(previous: FindingComparable[], current: FindingComparable[]): {
    resolved: FindingComparable[];
    still: FindingComparable[];
    new: FindingComparable[];
};
//# sourceMappingURL=diff.d.ts.map