export interface Project {
    id: string;
    name: string;
    description: string | null;
    createdAt: number;
    updatedAt: number;
    lastOpenedAt: number | null;
    projectPath: string;
}
export interface CreateProjectInput {
    name: string;
    description?: string;
}
//# sourceMappingURL=project.d.ts.map