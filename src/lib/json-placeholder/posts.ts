import { unstable_cache } from "next/cache";

import { JSON_PLACEHOLDER_BASE } from "./constants";
import { parsePostsPayload, isPost } from "./guards";
import { buildPostsPageUrl } from "./pagination-utils";
import type { Post } from "./types";

export { clampPage, parsePositiveInt } from "./pagination-utils";

const POSTS_TOTAL_CACHE_KEY = "jsonplaceholder-posts-total-count";

/**
 * Total number of posts (used for pagination).
 * Cached server-side to avoid recounting on every list request.
 */
export const getCachedPostsTotalCount = unstable_cache(
  async (): Promise<number> => {
    const response = await fetch(`${JSON_PLACEHOLDER_BASE}/posts`, {
      next: { revalidate: 3600, tags: ["posts-meta"] },
    });
    if (!response.ok) {
      throw new Error(`Failed to load posts metadata: ${response.status}`);
    }
    const payload: unknown = await response.json();
    return parsePostsPayload(payload).length;
  },
  [POSTS_TOTAL_CACHE_KEY],
  { revalidate: 3600, tags: ["posts-meta"] }
);

/**
 * Paginated posts. Arguments participate in the `unstable_cache` key, so each
 * `page` value is cached independently.
 */
export const getCachedPostsPage = unstable_cache(
  async (page: number): Promise<Post[]> => {
    const response = await fetch(buildPostsPageUrl(page), {
      next: { revalidate: 300, tags: [`posts-page-${page}`] },
    });
    if (!response.ok) {
      throw new Error(`Failed to load posts page ${page}: ${response.status}`);
    }
    const payload: unknown = await response.json();
    return parsePostsPayload(payload);
  },
  ["jsonplaceholder-posts-page"],
  { revalidate: 300, tags: ["posts"] }
);

export async function getPostById(id: number): Promise<Post | null> {
  const response = await fetch(`${JSON_PLACEHOLDER_BASE}/posts/${id}`, {
    next: { revalidate: 600, tags: [`post-${id}`] },
  });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error(`Failed to load post ${id}: ${response.status}`);
  }
  const payload: unknown = await response.json();
  return isPost(payload) ? payload : null;
}
