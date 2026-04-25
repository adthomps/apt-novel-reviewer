import { useMemo, useState } from "react";
import { Button, Card } from "@apt/ui";

interface ChapterLite {
  id: string;
  chapterNumber: number;
  title: string;
  content: string;
}

export function ManuscriptPage(props: {
  projectId: string | null;
  chapters: ChapterLite[];
  activeVersionLabel: string;
  onImportCompleted: () => Promise<void>;
}) {
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [importMessage, setImportMessage] = useState<string>("");
  const [manualSplitText, setManualSplitText] = useState<string>("");
  const [manualDelimiter, setManualDelimiter] = useState<string>("Chapter ");
  const [manualSplitPath, setManualSplitPath] = useState<string>("");

  const activeChapter = useMemo(() => {
    const fallback = props.chapters[0]?.id ?? null;
    const id = activeChapterId ?? fallback;
    return props.chapters.find((item) => item.id === id) ?? null;
  }, [activeChapterId, props.chapters]);

  async function chooseDocx() {
    if (!props.projectId) return;
    const picked = await window.aptApi.imports.pickDocxFile();
    if (picked) {
      setSelectedPath(picked);
      setImportMessage("");
    }
  }

  async function importDocx() {
    if (!props.projectId || !selectedPath) return;

    const result = await window.aptApi.imports.importDocx(props.projectId, selectedPath);
    if (result.status === "manual_split_required") {
      setManualSplitPath(result.filePath);
      setManualSplitText(result.fullText);
      setManualDelimiter(result.suggestedDelimiter);
      setImportMessage("No chapter headings detected. Use manual split below.");
      return;
    }

    setImportMessage("Import completed and new version created.");
    setManualSplitPath("");
    setManualSplitText("");
    await props.onImportCompleted();
  }

  async function runManualSplit() {
    if (!props.projectId || !manualSplitPath || !manualSplitText || !manualDelimiter.trim()) return;

    try {
      await window.aptApi.imports.importManualSplit(
        props.projectId,
        manualSplitPath,
        manualSplitText,
        manualDelimiter
      );
      setImportMessage("Manual split import completed.");
      setManualSplitPath("");
      setManualSplitText("");
      await props.onImportCompleted();
    } catch (error) {
      setImportMessage(error instanceof Error ? error.message : "Manual split failed.");
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <Card title="Import DOCX" className="space-y-3">
        <p className="text-xs text-slate-400">Active manuscript version: {props.activeVersionLabel}</p>
        <Button disabled={!props.projectId} onClick={chooseDocx}>
          Choose DOCX File
        </Button>
        <p className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-300">
          {selectedPath || "No file selected"}
        </p>
        <Button disabled={!props.projectId || !selectedPath} onClick={importDocx}>
          Import as New Version
        </Button>
        <p className="text-xs text-slate-400">Every import creates a new manuscript version.</p>
        {importMessage ? <p className="text-xs text-emerald-300">{importMessage}</p> : null}

        {manualSplitText ? (
          <div className="space-y-2 rounded-lg border border-amber-700/50 bg-amber-950/20 p-3">
            <p className="text-xs font-semibold text-amber-200">Manual chapter split required</p>
            <p className="text-xs text-amber-100/80">
              Enter a delimiter that appears between chapters (for example: <span className="font-mono">Chapter </span> or
              <span className="font-mono"> --- </span>). If your file is one chapter, leave delimiter blank to import as a single chapter.
            </p>
            <input
              value={manualDelimiter}
              onChange={(event) => setManualDelimiter(event.target.value)}
              className="w-full rounded-lg border border-amber-800 bg-slate-950 px-3 py-2 text-sm"
              placeholder="Delimiter"
            />
            <textarea
              value={manualSplitText}
              onChange={(event) => setManualSplitText(event.target.value)}
              className="h-36 w-full rounded-lg border border-amber-800 bg-slate-950 p-3 text-xs"
            />
            <Button onClick={runManualSplit}>Import Using Manual Split</Button>
          </div>
        ) : null}
      </Card>

      <Card title="Chapter Reader">
        <p className="mb-3 text-xs text-slate-400">Reading version: {props.activeVersionLabel}</p>
        {!props.projectId ? <p className="text-sm text-slate-400">Select a project first.</p> : null}
        <div className="grid gap-3 md:grid-cols-[220px_1fr]">
          <div className="max-h-[420px] overflow-auto rounded-lg border border-slate-800 p-2">
            {props.chapters.map((chapter) => (
              <button
                key={chapter.id}
                className="mb-2 w-full rounded-md border border-slate-700 px-2 py-2 text-left text-xs hover:bg-slate-800"
                onClick={() => setActiveChapterId(chapter.id)}
              >
                {chapter.chapterNumber}. {chapter.title}
              </button>
            ))}
          </div>
          <article className="max-h-[420px] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-sm leading-relaxed">
            {activeChapter?.content || "No chapters yet."}
          </article>
        </div>
      </Card>
    </div>
  );
}
