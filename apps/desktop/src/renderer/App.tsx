import { useEffect, useMemo, useState } from "react";
import {
  ComparePage,
  DashboardPage,
  FindingsPage,
  LibraryPage,
  ManuscriptPage,
  ReviewCenterPage,
  SetupPage,
  CanonPage,
  SettingsPage
} from "./pages";

const NAV_ITEMS = [
  "Setup",
  "Library",
  "Project Dashboard",
  "Manuscript",
  "Canon",
  "Review Center",
  "Findings",
  "Compare",
  "Settings"
] as const;

type NavItem = (typeof NAV_ITEMS)[number];

const HEADER_NAV_ITEMS = ["Setup", "Library", "Review Center", "Findings", "Settings"] as const satisfies readonly NavItem[];

const FOOTER_GROUPS = [
  {
    title: "Workflow",
    items: ["Library", "Manuscript", "Review Center"] as const
  },
  {
    title: "Resources",
    items: ["Findings", "Compare", "Settings"] as const
  }
] as const;

export function App() {
  const api = window.aptApi;
  const [active, setActive] = useState<NavItem>("Setup");
  const [projectId, setProjectId] = useState<string | null>(null);
  const [versions, setVersions] = useState<Array<{ id: string; versionNumber: number; timestamp: number }>>([]);
  const [activeVersionId, setActiveVersionId] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Array<{ id: string; title: string; chapterNumber: number; content: string }>>([]);
  const [findings, setFindings] = useState<
    Array<{
      id: string;
      reviewRunId: string;
      reviewType: string;
      chapterId: string;
      findingType: string;
      severity: string;
      confidence: string;
      textAnchor: string;
      issue: string;
      whyItMatters: string;
      evidence: string;
      suggestedFix: string;
      status: string;
    }>
  >([]);

  const activeVersion = useMemo(
    () => versions.find((version) => version.id === activeVersionId) ?? versions[0] ?? null,
    [activeVersionId, versions]
  );
  const activeVersionLabel = useMemo(() => {
    if (!activeVersion) {
      return "No version selected";
    }
    return `v${activeVersion.versionNumber} • ${new Date(activeVersion.timestamp).toLocaleString()}`;
  }, [activeVersion]);

  useEffect(() => {
    if (!projectId) {
      setVersions([]);
      setActiveVersionId(null);
      setChapters([]);
      setFindings([]);
      return;
    }
    void refreshProjectData(projectId);
  }, [projectId]);

  useEffect(() => {
    if (!activeVersion?.id) {
      setChapters([]);
      return;
    }
    void loadChapters(activeVersion.id);
  }, [activeVersion?.id]);

  async function refreshProjectData(selectedProjectId: string, preferLatestVersion = false) {
    if (!api) {
      return;
    }

    const nextVersions = await api.versions.list(selectedProjectId);
    setVersions(nextVersions);
    setActiveVersionId((current) => {
      if (preferLatestVersion) {
        return nextVersions[0]?.id ?? null;
      }
      if (current && nextVersions.some((version) => version.id === current)) {
        return current;
      }
      return nextVersions[0]?.id ?? null;
    });

    const findingList = await api.findings.list(selectedProjectId);
    setFindings(findingList);
  }

  async function loadChapters(versionId: string) {
    if (!api) {
      return;
    }
    const chapterList = await api.versions.chapters(versionId);
    setChapters(chapterList);
  }

  if (!api) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-2xl rounded-xl border border-rose-700/60 bg-slate-900/80 p-5 text-slate-200">
          <h1 className="text-lg font-semibold text-rose-300">Renderer Bridge Not Available</h1>
          <p className="mt-2 text-sm text-slate-300">
            The preload API was not injected, so the renderer cannot call app services.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Restart the app and ensure preload loads successfully in Electron.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid min-h-screen grid-rows-[64px_1fr_auto]">
      <header className="flex items-center gap-4 border-b border-slate-800/80 bg-slate-950/75 px-4 backdrop-blur">
        <div className="flex min-w-0 shrink-0 items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/50 bg-slate-950 text-sm font-semibold text-sky-200">
            A
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-slate-100">APT Novel Reviewer</h1>
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Applied Practical Thinking</p>
          </div>
        </div>

        <nav className="flex min-w-0 flex-1 items-center justify-center" aria-label="Primary workflow navigation">
          <div className="flex items-center gap-1 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900/50 p-1">
            {HEADER_NAV_ITEMS.map((item) => (
              <button
                key={item}
                className={`whitespace-nowrap rounded-md px-3 py-2 text-sm transition ${
                  active === item ? "bg-sky-500/15 text-sky-100" : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                }`}
                type="button"
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        <div className="hidden shrink-0 items-center gap-3 text-right lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Runtime</p>
            <p className="text-sm text-slate-300">Local Ollama</p>
          </div>
          <div className="h-8 border-l border-slate-800" />
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-slate-500">Model</p>
            <p className="text-sm text-slate-300">gpt-oss:20b</p>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-[220px_1fr_260px] overflow-hidden">
        <aside className="border-r border-slate-800 p-3">
          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                  active === item ? "bg-emerald-500/20 text-emerald-200" : "text-slate-300 hover:bg-slate-900"
                }`}
                onClick={() => setActive(item)}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        <main className="overflow-auto p-4">
          {active === "Setup" ? <SetupPage /> : null}
          {active === "Library" ? (
            <LibraryPage onSelectProject={(nextProjectId) => setProjectId(nextProjectId)} selectedProjectId={projectId} />
          ) : null}
          {active === "Project Dashboard" ? (
            <DashboardPage
              projectId={projectId}
              versionCount={versions.length}
              findingCount={findings.length}
              activeVersionLabel={activeVersionLabel}
            />
          ) : null}
          {active === "Manuscript" ? (
            <ManuscriptPage
              projectId={projectId}
              chapters={chapters}
              activeVersionLabel={activeVersionLabel}
              onImportCompleted={() => (projectId ? refreshProjectData(projectId, true) : Promise.resolve())}
            />
          ) : null}
          {active === "Canon" ? (
            <CanonPage
              projectId={projectId}
              activeVersionLabel={activeVersionLabel}
              chapters={chapters.map((chapter) => ({
                id: chapter.id,
                chapterNumber: chapter.chapterNumber,
                title: chapter.title
              }))}
            />
          ) : null}
          {active === "Review Center" ? (
            <ReviewCenterPage
              projectId={projectId}
              versionId={activeVersion?.id ?? null}
              activeVersionLabel={activeVersionLabel}
              onReviewCompleted={() => (projectId ? refreshProjectData(projectId) : Promise.resolve())}
            />
          ) : null}
          {active === "Findings" ? (
            <FindingsPage
              projectId={projectId}
              findings={findings}
              activeVersionLabel={activeVersionLabel}
              onStatusUpdated={() => (projectId ? refreshProjectData(projectId) : Promise.resolve())}
            />
          ) : null}
          {active === "Compare" ? (
            <ComparePage projectId={projectId} versions={versions} activeVersionLabel={activeVersionLabel} />
          ) : null}
          {active === "Settings" ? <SettingsPage /> : null}
        </main>

        <aside className="border-l border-slate-800 p-3">
          <h2 className="mb-3 text-xs uppercase tracking-[0.15em] text-slate-400">Context</h2>
          <div className="space-y-2 text-sm text-slate-300">
            <p>Project: {projectId ?? "None"}</p>
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.1em] text-slate-500">Active version</p>
              <select
                value={activeVersion?.id ?? ""}
                onChange={(event) => setActiveVersionId(event.target.value || null)}
                disabled={!projectId || versions.length === 0}
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-2 py-1 text-xs"
              >
                {versions.length === 0 ? <option value="">No versions</option> : null}
                {versions.map((version) => (
                  <option key={version.id} value={version.id}>
                    v{version.versionNumber} • {new Date(version.timestamp).toLocaleDateString()}
                  </option>
                ))}
              </select>
              <p className="text-xs text-slate-500">Viewing {activeVersionLabel}</p>
            </div>
            <p>Versions: {versions.length}</p>
            <p>Chapters: {chapters.length}</p>
            <p>Findings: {findings.length}</p>
          </div>
        </aside>
      </div>

      <footer className="border-t border-slate-800/80 bg-slate-900/55 px-4 py-6 backdrop-blur">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-sky-400/50 bg-slate-950 text-sm font-semibold text-sky-200">
                A
              </div>
              <div>
                <p className="text-sm font-semibold tracking-tight text-slate-100">APT Novel Reviewer</p>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-500">Applied Practical Thinking</p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-slate-400">
              A local manuscript review workspace for project setup, canon checks, findings, and version comparison.
            </p>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-semibold text-slate-100">{group.title}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {group.items.map((item) => (
                  <li key={item}>
                    <button
                      className="text-left transition hover:text-slate-100"
                      type="button"
                      onClick={() => setActive(item)}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="my-5 border-t border-slate-800/80" />

        <div className="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-start sm:justify-between">
          <p>Runtime: Local Ollama</p>
          <p className="text-xs sm:text-right">Model: gpt-oss:20b</p>
        </div>
      </footer>
    </div>
  );
}
