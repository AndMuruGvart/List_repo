import { describe, expect, it } from "vitest";

import { POSTS_PER_PAGE } from "./constants";
import {
  buildPostsPageUrl,
  clampPage,
  parsePositiveInt,
} from "./pagination-utils";

describe("buildPostsPageUrl", () => {
  it("includes _limit and _page query params", () => {
    const url = buildPostsPageUrl(3);
    expect(url).toContain("_limit=10");
    expect(url).toContain("_page=3");
    expect(url).toMatch(/^https:\/\/jsonplaceholder\.typicode\.com\/posts\?/);
  });

  it("uses POSTS_PER_PAGE constant for _limit", () => {
    const url = buildPostsPageUrl(1);
    expect(url).toContain(`_limit=${POSTS_PER_PAGE}`);
  });
});

describe("clampPage", () => {
  it("clamps below 1 to 1", () => {
    expect(clampPage(0, 5)).toBe(1);
    expect(clampPage(-3, 5)).toBe(1);
  });

  it("clamps above totalPages", () => {
    expect(clampPage(10, 5)).toBe(5);
  });

  it("returns page when in range", () => {
    expect(clampPage(3, 5)).toBe(3);
  });

  it("treats non-finite page as 1", () => {
    expect(clampPage(Number.NaN, 5)).toBe(1);
    expect(clampPage(Number.POSITIVE_INFINITY, 5)).toBe(1);
  });
});

describe("parsePositiveInt", () => {
  it("parses a positive string", () => {
    expect(parsePositiveInt("4", 1)).toBe(4);
  });

  it("uses first element of string array", () => {
    expect(parsePositiveInt(["7", "8"], 1)).toBe(7);
  });

  it("returns fallback for invalid or non-positive values", () => {
    expect(parsePositiveInt(undefined, 2)).toBe(2);
    expect(parsePositiveInt("0", 2)).toBe(2);
    expect(parsePositiveInt("abc", 2)).toBe(2);
    expect(parsePositiveInt("-5", 2)).toBe(2);
  });
});
