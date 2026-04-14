import type { Post } from "./types";

/** Runtime check so we never trust raw JSON without validation (no `any`). */
export function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const record = value as Record<string, unknown>;
  return (
    typeof record.userId === "number" &&
    typeof record.id === "number" &&
    typeof record.title === "string" &&
    typeof record.body === "string"
  );
}

export function parsePostsPayload(data: unknown): Post[] {
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter(isPost);
}
