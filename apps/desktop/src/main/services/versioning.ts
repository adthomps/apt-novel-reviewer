import { diffChapterHashes } from "@apt/lib";
import { versionRepo } from "@apt/db";

export function diffLatestVersions(projectId: string) {
  const versions = versionRepo.listVersions(projectId);
  if (versions.length < 2) {
    return [];
  }

  const [current, previous] = versions;
  const previousChapters = versionRepo.listChapters(previous.id).map((chapter) => ({
    chapterNumber: chapter.chapterNumber,
    title: chapter.title,
    contentHash: chapter.contentHash
  }));
  const currentChapters = versionRepo.listChapters(current.id).map((chapter) => ({
    chapterNumber: chapter.chapterNumber,
    title: chapter.title,
    contentHash: chapter.contentHash
  }));

  return diffChapterHashes(previousChapters, currentChapters);
}
