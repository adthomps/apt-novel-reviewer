import fs from "node:fs";
import path from "node:path";
import Database from "better-sqlite3";

let db: Database.Database | null = null;

export function initDb(dbPath: string): Database.Database {
  if (db) {
    return db;
  }

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = new Database(dbPath);
  db.pragma("foreign_keys = ON");
  db.exec(loadMigrationSql());
  return db;
}

export function getDb(): Database.Database {
  if (!db) {
    throw new Error("Database not initialized");
  }

  return db;
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}

export * as projectRepo from "./repositories/projects";
export * as versionRepo from "./repositories/versions";
export * as reviewRepo from "./repositories/reviews";
export * as compareRepo from "./repositories/compare";
export * as noteRepo from "./repositories/notes";

function loadMigrationSql(): string {
  const candidates = [
    path.resolve(__dirname, "migrations", "001_init.sql"),
    path.resolve(process.cwd(), "packages", "db", "src", "migrations", "001_init.sql"),
    path.resolve(process.cwd(), "..", "..", "packages", "db", "src", "migrations", "001_init.sql")
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return fs.readFileSync(candidate, "utf8");
    }
  }

  throw new Error(`Migration file not found. Checked: ${candidates.join(", ")}`);
}
