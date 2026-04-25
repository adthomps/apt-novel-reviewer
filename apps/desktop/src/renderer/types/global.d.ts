import type { CreateProjectInput, RuntimeStatus, ReviewMode } from "@apt/types";

declare global {
  interface Window {
    aptApi: {
      runtime: {
        getStatus: () => Promise<RuntimeStatus>;
        getModels: () => Promise<string[]>;
      };
      projects: {
        list: () => Promise<Array<{ id: string; name: string; updatedAt: number }>>;
        create: (input: CreateProjectInput) => Promise<{ id: string; name: string }>;
        delete: (projectId: string) => Promise<void>;
        open: (projectId: string) => Promise<void>;
      };
      notes: {
        list: (
          projectId: string,
          category?: "character" | "timeline"
        ) => Promise<
          Array<{
            id: string;
            projectId: string;
            category: "character" | "timeline";
            title: string;
            content: string;
            linkedChapterId: string | null;
            createdAt: number;
            updatedAt: number;
          }>
        >;
        create: (input: {
          projectId: string;
          category: "character" | "timeline";
          title: string;
          content: string;
          linkedChapterId?: string | null;
        }) => Promise<{
          id: string;
          projectId: string;
          category: "character" | "timeline";
          title: string;
          content: string;
          linkedChapterId: string | null;
          createdAt: number;
          updatedAt: number;
        }>;
        update: (input: {
          id: string;
          title: string;
          content: string;
          linkedChapterId?: string | null;
        }) => Promise<{ ok: true }>;
        delete: (noteId: string) => Promise<{ ok: true }>;
      };
      imports: {
        pickDocxFile: () => Promise<string | null>;
        importDocx: (
          projectId: string,
          filePath: string
        ) => Promise<
          | { status: "imported"; versionId: string; usedFallback: boolean }
          | {
              status: "manual_split_required";
              filePath: string;
              fullText: string;
              suggestedDelimiter: string;
            }
        >;
        importManualSplit: (
          projectId: string,
          filePath: string,
          fullText: string,
          delimiter: string
        ) => Promise<{ status: "imported"; versionId: string; usedFallback: true; chapterCount: number }>;
      };
      versions: {
        list: (projectId: string) => Promise<Array<{ id: string; versionNumber: number; timestamp: number }>>;
        chapters: (versionId: string) => Promise<Array<{ id: string; title: string; chapterNumber: number; content: string }>>;
      };
      reviews: {
        start: (input: { projectId: string; versionId: string; reviewType: ReviewMode; chapterId?: string }) => Promise<{ runId: string; status: string; errors?: string[] }>;
        listRuns: (versionId: string) => Promise<
          Array<{
            id: string;
            versionId: string;
            reviewType: string;
            model: string;
            status: string;
            startedAt: number;
            completedAt: number | null;
            errorMessage: string | null;
          }>
        >;
        deleteRun: (runId: string) => Promise<{ ok: true; deletedCount: number }>;
        deleteRunsByStatus: (versionId: string, statuses: Array<"success" | "partial" | "error">) => Promise<{ ok: true; deletedCount: number }>;
      };
      findings: {
        list: (projectId: string) => Promise<
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
        >;
        export: (input: {
          projectId: string;
          format: "json" | "csv";
          activeVersionLabel: string;
          findings: Array<{
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
          }>;
        }) => Promise<{ ok: true; canceled: boolean; filePath?: string }>;
        updateStatus: (findingId: string, status: "new" | "still" | "resolved") => Promise<{ ok: true }>;
      };
      compare: {
        versions: (
          projectId: string,
          fromVersionId: string,
          toVersionId: string
        ) => Promise<{
          resolved: Array<{ id: string; type: string; chapterId: string; issue: string }>;
          still: Array<{ id: string; type: string; chapterId: string; issue: string }>;
          new: Array<{ id: string; type: string; chapterId: string; issue: string }>;
        }>;
      };
    };
  }
}

export {};
