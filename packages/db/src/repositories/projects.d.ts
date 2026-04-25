import type { CreateProjectInput, Project } from "@apt/types";
export declare function listProjects(): Project[];
export declare function createProject(input: CreateProjectInput & {
    projectPath: string;
}): Project;
export declare function touchProject(projectId: string): void;
export declare function deleteProject(projectId: string): void;
//# sourceMappingURL=projects.d.ts.map