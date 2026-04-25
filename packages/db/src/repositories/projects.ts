import { randomUUID } from "node:crypto";
import type { CreateProjectInput, Project } from "@apt/types";
import { getDb } from "../index";

export function listProjects(): Project[] {
  const statement = getDb().prepare("SELECT * FROM projects ORDER BY updatedAt DESC");
  return statement.all() as Project[];
}

export function createProject(input: CreateProjectInput & { projectPath: string }): Project {
  const now = Date.now();
  const project: Project = {
    id: randomUUID(),
    name: input.name.trim(),
    description: input.description?.trim() || null,
    createdAt: now,
    updatedAt: now,
    lastOpenedAt: now,
    projectPath: input.projectPath
  };

  getDb()
    .prepare(
      `INSERT INTO projects (id, name, description, createdAt, updatedAt, lastOpenedAt, projectPath)
       VALUES (@id, @name, @description, @createdAt, @updatedAt, @lastOpenedAt, @projectPath)`
    )
    .run(project);

  return project;
}

export function touchProject(projectId: string): void {
  const now = Date.now();
  getDb()
    .prepare("UPDATE projects SET lastOpenedAt = ?, updatedAt = ? WHERE id = ?")
    .run(now, now, projectId);
}

export function deleteProject(projectId: string): void {
  getDb().prepare("DELETE FROM projects WHERE id = ?").run(projectId);
}
