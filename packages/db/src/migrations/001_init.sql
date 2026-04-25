PRAGMA journal_mode=WAL;

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  lastOpenedAt INTEGER,
  projectPath TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS versions (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  versionNumber INTEGER NOT NULL,
  timestamp INTEGER NOT NULL,
  chapterCount INTEGER NOT NULL,
  importedFrom TEXT NOT NULL,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(projectId, versionNumber)
);

CREATE TABLE IF NOT EXISTS chapters (
  id TEXT PRIMARY KEY,
  versionId TEXT NOT NULL,
  projectId TEXT NOT NULL,
  chapterNumber INTEGER NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  contentHash TEXT NOT NULL,
  wordCount INTEGER NOT NULL,
  characterCount INTEGER NOT NULL,
  FOREIGN KEY(versionId) REFERENCES versions(id) ON DELETE CASCADE,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(versionId, chapterNumber)
);

CREATE TABLE IF NOT EXISTS review_runs (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  versionId TEXT NOT NULL,
  templateId TEXT NOT NULL,
  reviewType TEXT NOT NULL,
  model TEXT NOT NULL,
  status TEXT NOT NULL,
  startedAt INTEGER NOT NULL,
  completedAt INTEGER,
  errorMessage TEXT,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(versionId) REFERENCES versions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS findings (
  id TEXT PRIMARY KEY,
  reviewRunId TEXT NOT NULL,
  chapterId TEXT,
  projectId TEXT NOT NULL,
  findingType TEXT NOT NULL,
  severity TEXT NOT NULL,
  confidence TEXT NOT NULL,
  textAnchor TEXT,
  issue TEXT NOT NULL,
  whyItMatters TEXT NOT NULL,
  evidence TEXT NOT NULL,
  suggestedFix TEXT NOT NULL,
  status TEXT,
  createdAt INTEGER NOT NULL,
  resolvedAt INTEGER,
  FOREIGN KEY(reviewRunId) REFERENCES review_runs(id) ON DELETE CASCADE,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  category TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  linkedChapterId TEXT,
  createdAt INTEGER NOT NULL,
  updatedAt INTEGER NOT NULL,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS warnings (
  id TEXT PRIMARY KEY,
  projectId TEXT,
  reviewRunId TEXT,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL,
  timestamp INTEGER NOT NULL,
  resolved INTEGER NOT NULL DEFAULT 0,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(reviewRunId) REFERENCES review_runs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS version_comparisons (
  id TEXT PRIMARY KEY,
  projectId TEXT NOT NULL,
  fromVersionId TEXT NOT NULL,
  toVersionId TEXT NOT NULL,
  generatedAt INTEGER NOT NULL,
  comparison TEXT NOT NULL,
  FOREIGN KEY(projectId) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(fromVersionId) REFERENCES versions(id) ON DELETE CASCADE,
  FOREIGN KEY(toVersionId) REFERENCES versions(id) ON DELETE CASCADE,
  UNIQUE(projectId, fromVersionId, toVersionId)
);

CREATE INDEX IF NOT EXISTS idx_versions_projectId ON versions(projectId);
CREATE INDEX IF NOT EXISTS idx_chapters_versionId ON chapters(versionId);
CREATE INDEX IF NOT EXISTS idx_chapters_hash ON chapters(contentHash);
CREATE INDEX IF NOT EXISTS idx_review_runs_versionId ON review_runs(versionId);
CREATE INDEX IF NOT EXISTS idx_findings_reviewRunId ON findings(reviewRunId);
CREATE INDEX IF NOT EXISTS idx_findings_status ON findings(status);
