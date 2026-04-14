import { describe, expect, it } from "vitest";

import { isPost, parsePostsPayload } from "./guards";
import type { Post } from "./types";

const validPost: Post = {
  userId: 1,
  id: 1,
  title: "t",
  body: "b",
};

describe("isPost", () => {
  it("accepts a well-formed post object", () => {
    expect(isPost(validPost)).toBe(true);
  });

  it("rejects non-objects", () => {
    expect(isPost(null)).toBe(false);
    expect(isPost(undefined)).toBe(false);
    expect(isPost("x")).toBe(false);
    expect(isPost(1)).toBe(false);
  });

  it("rejects objects with wrong field types", () => {
    expect(
      isPost({
        userId: "1",
        id: 1,
        title: "t",
        body: "b",
      })
    ).toBe(false);
    expect(
      isPost({
        userId: 1,
        id: 1,
        title: 2,
        body: "b",
      })
    ).toBe(false);
  });
});

describe("parsePostsPayload", () => {
  it("returns only valid items from a mixed array", () => {
    const mixed: unknown[] = [
      validPost,
      { invalid: true },
      {
        userId: 2,
        id: 2,
        title: "ok",
        body: "ok",
      },
    ];
    const result = parsePostsPayload(mixed);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual(validPost);
    expect(result[1]?.id).toBe(2);
  });

  it("returns empty array for non-array input", () => {
    expect(parsePostsPayload({})).toEqual([]);
    expect(parsePostsPayload(null)).toEqual([]);
  });
});
