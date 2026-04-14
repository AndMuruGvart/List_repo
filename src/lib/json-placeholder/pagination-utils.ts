import { JSON_PLACEHOLDER_BASE, POSTS_PER_PAGE } from "./constants";

/** Builds list URL with JSONPlaceholder pagination query (`_limit`, `_page`). */
export function buildPostsPageUrl(page: number): string {
  const search = new URLSearchParams({
    _limit: String(POSTS_PER_PAGE),
    _page: String(page),
  });
  return `${JSON_PLACEHOLDER_BASE}/posts?${search.toString()}`;
}

export function clampPage(page: number, totalPages: number): number {
  if (!Number.isFinite(page) || page < 1) {
    return 1;
  }
  if (page > totalPages) {
    return totalPages;
  }
  return page;
}

export function parsePositiveInt(
  value: string | string[] | undefined,
  fallback: number
): number {
  if (value === undefined) {
    return fallback;
  }
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}
