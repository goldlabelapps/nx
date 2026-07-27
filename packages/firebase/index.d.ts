export type FirebaseHistoryEntry = {
  id: string;
  kind: string;
  title: string;
  summary: string;
  status: string;
  createdAt: string;
  link: string;
};

export declare function isFirebaseHistoryEnabled(): boolean;
export declare function readHistoryEntries(limitCount?: number): Promise<FirebaseHistoryEntry[]>;
export declare function addHistoryEntry(
  entry: Omit<FirebaseHistoryEntry, "id" | "createdAt">,
): Promise<FirebaseHistoryEntry>;
