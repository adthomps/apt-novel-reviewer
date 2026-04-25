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
export declare function listNotes(projectId: string, category?: NoteCategory): NoteRecord[];
export declare function createNote(input: {
    projectId: string;
    category: NoteCategory;
    title: string;
    content: string;
    linkedChapterId?: string | null;
}): NoteRecord;
export declare function updateNote(input: {
    id: string;
    title: string;
    content: string;
    linkedChapterId?: string | null;
}): void;
export declare function deleteNote(id: string): void;
//# sourceMappingURL=notes.d.ts.map