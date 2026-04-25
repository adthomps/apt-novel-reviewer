export type ChangeClass = "unchanged" | "modified" | "new" | "removed";

export interface ChapterSnapshot {
  chapterNumber: number;
  title: string;
  contentHash: string;
}

export interface ChapterChange {
  chapterNumber: number;
  title: string;
  status: ChangeClass;
}

export function diffChapterHashes(previous: ChapterSnapshot[], current: ChapterSnapshot[]): ChapterChange[] {
  const prevByNumber = new Map(previous.map((chapter) => [chapter.chapterNumber, chapter]));
  const curByNumber = new Map(current.map((chapter) => [chapter.chapterNumber, chapter]));
  const chapterNumbers = new Set<number>([...prevByNumber.keys(), ...curByNumber.keys()]);

  return Array.from(chapterNumbers)
    .sort((a, b) => a - b)
    .map((chapterNumber) => {
      const prev = prevByNumber.get(chapterNumber);
      const cur = curByNumber.get(chapterNumber);

      if (!prev && cur) {
        return { chapterNumber, title: cur.title, status: "new" as const };
      }
      if (prev && !cur) {
        return { chapterNumber, title: prev.title, status: "removed" as const };
      }
      if (prev && cur && prev.contentHash !== cur.contentHash) {
        return { chapterNumber, title: cur.title, status: "modified" as const };
      }
      return { chapterNumber, title: cur?.title ?? prev?.title ?? `Chapter ${chapterNumber}`, status: "unchanged" as const };
    });
}

export interface FindingComparable {
  id: string;
  type: string;
  chapterId: string;
  issue: string;
}

export function compareFindings(previous: FindingComparable[], current: FindingComparable[]) {
  const fingerprint = (f: FindingComparable) => `${f.type}|${f.chapterId}|${normalize(f.issue)}`;

  const previousSet = new Set(previous.map(fingerprint));
  const currentSet = new Set(current.map(fingerprint));

  const resolved = previous.filter((item) => !currentSet.has(fingerprint(item)));
  const still = current.filter((item) => previousSet.has(fingerprint(item)));
  const fresh = current.filter((item) => !previousSet.has(fingerprint(item)));

  return { resolved, still, new: fresh };
}

function normalize(value: string): string {
  return value.toLowerCase().replace(/\s+/g, " ").trim();
}
