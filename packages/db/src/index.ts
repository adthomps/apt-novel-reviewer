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
  for (const sql of loadMigrationSqlFiles()) {
    for (const statement of splitSqlStatements(sql)) {
      try {
        db.exec(statement);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        // Additive migrations may re-run against existing DBs.
        if (!/duplicate column name/i.test(message)) {
          throw error;
        }
      }
    }
  }
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

function splitSqlStatements(sql: string): string[] {
  return sql
    .split(";")
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .map((part) => `${part};`);
}

function loadMigrationSqlFiles(): string[] {
  const dirCandidates = [
    path.resolve(__dirname, "migrations"),
    path.resolve(process.cwd(), "packages", "db", "src", "migrations"),
    path.resolve(process.cwd(), "..", "..", "packages", "db", "src", "migrations")
  ];

  for (const dir of dirCandidates) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    const files = fs
      .readdirSync(dir)
      .filter((name) => /^\d+_.*\.sql$/i.test(name))
      .sort((a, b) => a.localeCompare(b));

    if (files.length === 0) {
      continue;
    }

    return files.map((name) => fs.readFileSync(path.join(dir, name), "utf8"));
  }

  throw new Error(`Migration directory not found. Checked: ${dirCandidates.join(", ")}`);
}
