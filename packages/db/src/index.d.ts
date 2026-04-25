import Database from "better-sqlite3";
export declare function initDb(dbPath: string): Database.Database;
export declare function getDb(): Database.Database;
export declare function closeDb(): void;
export * as projectRepo from "./repositories/projects";
export * as versionRepo from "./repositories/versions";
export * as reviewRepo from "./repositories/reviews";
export * as compareRepo from "./repositories/compare";
export * as noteRepo from "./repositories/notes";
//# sourceMappingURL=index.d.ts.map