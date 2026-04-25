import { useEffect, useRef, useState } from "react";
import { Button, Card } from "@apt/ui";

interface ProjectLite {
  id: string;
  name: string;
  updatedAt: number;
}

export function LibraryPage(props: {
  onSelectProject: (projectId: string | null) => void;
  selectedProjectId: string | null;
}) {
  const [projects, setProjects] = useState<ProjectLite[]>([]);
  const [name, setName] = useState("");
  const [nameInputKey, setNameInputKey] = useState(0);
  const [pendingDeleteProject, setPendingDeleteProject] = useState<ProjectLite | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  async function reload() {
    const list = await window.aptApi.projects.list();
    setProjects(list);
  }

  useEffect(() => {
    void reload();
  }, []);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, [projects.length]);

  async function create() {
    if (!name.trim()) return;
    await window.aptApi.projects.create({ name: name.trim() });
    setName("");
    await reload();
    nameInputRef.current?.focus();
  }

  async function removeConfirmed(project: ProjectLite) {
    if (isDeleting) {
      return;
    }

    try {
      setIsDeleting(true);
      await window.aptApi.projects.delete(project.id);
      if (props.selectedProjectId === project.id) {
        props.onSelectProject(null);
      }
      await reload();
      setPendingDeleteProject(null);
      setNameInputKey((value) => value + 1);
      window.setTimeout(() => {
        window.focus();
        nameInputRef.current?.focus();
        nameInputRef.current?.select();
      }, 0);
    } finally {
      setIsDeleting(false);
    }
  }

  function requestDelete(project: ProjectLite) {
    if (isDeleting) {
      return;
    }
    setPendingDeleteProject(project);
  }

  async function open(projectId: string) {
    await window.aptApi.projects.open(projectId);
    props.onSelectProject(projectId);
  }

  return (
    <div className="space-y-4">
      <Card title="Create Project" className="space-y-3">
        <input
          key={nameInputKey}
          ref={nameInputRef}
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              void create();
            }
          }}
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          placeholder="Project name"
        />
        <Button onClick={create}>Create</Button>
      </Card>

      <Card title="Project Library">
        <div className="grid gap-3 md:grid-cols-2">
          {projects.map((project) => (
            <div key={project.id} className="rounded-lg border border-slate-800 bg-slate-900/70 p-3">
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-xs text-slate-400">Updated {new Date(project.updatedAt).toLocaleString()}</p>
              <div className="mt-3 flex gap-2">
                <Button
                  className={props.selectedProjectId === project.id ? "bg-emerald-300" : ""}
                  onClick={() => void open(project.id)}
                >
                  Open
                </Button>
                <button
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs"
                  onClick={() => requestDelete(project)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {pendingDeleteProject ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-4 shadow-xl">
            <h3 className="text-base font-semibold text-slate-100">Delete Project</h3>
            <p className="mt-2 text-sm text-slate-300">
              Delete <span className="font-semibold">{pendingDeleteProject.name}</span> permanently?
            </p>
            <p className="mt-1 text-xs text-slate-400">This action cannot be undone.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-200"
                onClick={() => setPendingDeleteProject(null)}
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                className="rounded-lg border border-rose-700/70 bg-rose-950/40 px-3 py-2 text-xs text-rose-300 disabled:opacity-60"
                onClick={() => void removeConfirmed(pendingDeleteProject)}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
