import { useEffect, useMemo, useState } from "react";
import { Badge, Button, Card } from "@apt/ui";

type Category = "character" | "timeline";

interface CanonNote {
  id: string;
  projectId: string;
  category: Category;
  title: string;
  content: string;
  linkedChapterId: string | null;
  createdAt: number;
  updatedAt: number;
}

export function CanonPage(props: {
  projectId: string | null;
  activeVersionLabel: string;
  chapters: Array<{ id: string; chapterNumber: number; title: string }>;
}) {
  const [category, setCategory] = useState<Category>("character");
  const [notes, setNotes] = useState<CanonNote[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [linkedChapterId, setLinkedChapterId] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isBusy, setIsBusy] = useState(false);

  useEffect(() => {
    if (!props.projectId) {
      setNotes([]);
      setSelectedId(null);
      setTitle("");
      setContent("");
      setLinkedChapterId("");
      return;
    }

    void loadNotes(props.projectId, category);
  }, [props.projectId, category]);

  const selectedNote = useMemo(() => {
    const fallback = notes[0]?.id ?? null;
    const target = selectedId ?? fallback;
    return notes.find((note) => note.id === target) ?? null;
  }, [notes, selectedId]);

  useEffect(() => {
    if (!selectedNote) {
      setTitle("");
      setContent("");
      setLinkedChapterId("");
      return;
    }
    setTitle(selectedNote.title);
    setContent(selectedNote.content);
    setLinkedChapterId(selectedNote.linkedChapterId ?? "");
  }, [selectedNote?.id]);

  async function loadNotes(projectId: string, selectedCategory: Category) {
    try {
      const next = await window.aptApi.notes.list(projectId, selectedCategory);
      setNotes(next);
      setSelectedId(next[0]?.id ?? null);
      setMessage("");
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Failed to load notes.";
      if (detail.includes("No handler registered")) {
        setMessage("Canon notes service is out of sync. Restart the desktop app (close all app windows, then run dev again).");
      } else {
        setMessage(`Failed to load notes: ${detail}`);
      }
    }
  }

  async function createNote() {
    if (!props.projectId || isBusy) return;

    try {
      setIsBusy(true);
      const created = await window.aptApi.notes.create({
        projectId: props.projectId,
        category,
        title: category === "character" ? "New Character" : "New Timeline Entry",
        content: "",
        linkedChapterId: null
      });

      await loadNotes(props.projectId, category);
      setSelectedId(created.id);
      setMessage("Note created.");
    } catch (error) {
      setMessage(error instanceof Error ? `Create failed: ${error.message}` : "Create failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function saveNote() {
    if (!selectedNote || isBusy) return;

    try {
      setIsBusy(true);
      await window.aptApi.notes.update({
        id: selectedNote.id,
        title,
        content,
        linkedChapterId: linkedChapterId || null
      });
      if (props.projectId) {
        await loadNotes(props.projectId, category);
        setSelectedId(selectedNote.id);
      }
      setMessage("Note saved.");
    } catch (error) {
      setMessage(error instanceof Error ? `Save failed: ${error.message}` : "Save failed.");
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteNote() {
    if (!selectedNote || !props.projectId || isBusy) return;

    try {
      setIsBusy(true);
      await window.aptApi.notes.delete(selectedNote.id);
      await loadNotes(props.projectId, category);
      setMessage("Note deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? `Delete failed: ${error.message}` : "Delete failed.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card title="Canon Notes" className="space-y-3">
        <p className="text-xs text-slate-400">Version context for chapter links: {props.activeVersionLabel}</p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className={`rounded-lg border px-3 py-1 text-xs ${
              category === "character" ? "border-emerald-600/80 bg-emerald-950/30 text-emerald-300" : "border-slate-700"
            }`}
            onClick={() => setCategory("character")}
          >
            Character Notes
          </button>
          <button
            className={`rounded-lg border px-3 py-1 text-xs ${
              category === "timeline" ? "border-emerald-600/80 bg-emerald-950/30 text-emerald-300" : "border-slate-700"
            }`}
            onClick={() => setCategory("timeline")}
          >
            Timeline Notes
          </button>
          <Badge tone="info">Project-scoped and persisted</Badge>
        </div>

        {!props.projectId ? <p className="text-sm text-slate-400">Select a project to manage canon notes.</p> : null}
        {message ? (
          <p className={`text-xs ${message.toLowerCase().includes("failed") ? "text-rose-300" : "text-emerald-300"}`}>
            {message}
          </p>
        ) : null}

        <div className="grid gap-3 lg:grid-cols-[280px_1fr]">
          <div className="space-y-2 rounded-lg border border-slate-800 bg-slate-950/40 p-2">
            <Button disabled={!props.projectId || isBusy} onClick={() => void createNote()}>
              {isBusy ? "Working..." : "Add Note"}
            </Button>
            <div className="max-h-80 space-y-2 overflow-auto">
              {notes.length === 0 ? <p className="text-xs text-slate-500">No notes yet.</p> : null}
              {notes.map((note) => (
                <button
                  key={note.id}
                  className={`w-full rounded border p-2 text-left ${
                    selectedNote?.id === note.id ? "border-emerald-600/70 bg-slate-900" : "border-slate-800 bg-slate-950"
                  }`}
                  onClick={() => setSelectedId(note.id)}
                >
                  <p className="text-sm text-slate-200">{note.title || "Untitled"}</p>
                  <p className="text-[11px] text-slate-500">Updated {new Date(note.updatedAt).toLocaleString()}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-950/40 p-3">
            {selectedNote ? (
              <>
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                  placeholder={category === "character" ? "Character name" : "Timeline event title"}
                />
                <select
                  value={linkedChapterId}
                  onChange={(event) => setLinkedChapterId(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
                >
                  <option value="">No chapter link</option>
                  {props.chapters.map((chapter) => (
                    <option key={chapter.id} value={chapter.id}>
                      Ch {chapter.chapterNumber}: {chapter.title}
                    </option>
                  ))}
                </select>
                <textarea
                  value={content}
                  onChange={(event) => setContent(event.target.value)}
                  className="h-72 w-full rounded-lg border border-slate-700 bg-slate-950 p-3 text-sm"
                  placeholder={
                    category === "character"
                      ? "Traits, motivations, voice constraints, relationships, and canon facts."
                      : "Chronology, event ordering, fixed dates, and timeline constraints."
                  }
                />
                <div className="flex gap-2">
                  <Button disabled={isBusy} onClick={() => void saveNote()}>
                    {isBusy ? "Saving..." : "Save"}
                  </Button>
                  <button
                    className="rounded-lg border border-rose-700/70 px-3 py-2 text-xs text-rose-300 disabled:opacity-60"
                    onClick={() => void deleteNote()}
                    disabled={isBusy}
                  >
                    Delete
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Select a note or create a new one.</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
