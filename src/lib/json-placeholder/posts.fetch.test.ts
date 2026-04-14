import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/cache", () => ({
  unstable_cache: <T extends (...args: unknown[]) => Promise<unknown>>(fn: T) =>
    fn,
}));

import { getPostById } from "./posts";

describe("getPostById", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns null when response is 404", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 404,
        ok: false,
      })
    );

    await expect(getPostById(999_999)).resolves.toBeNull();
  });

  it("returns parsed post when JSON is valid", async () => {
    const payload = {
      userId: 1,
      id: 7,
      title: "Title",
      body: "Body text",
    };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => payload,
      })
    );

    await expect(getPostById(7)).resolves.toEqual(payload);
  });

  it("returns null when JSON shape is invalid", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 200,
        ok: true,
        json: async () => ({ foo: "bar" }),
      })
    );

    await expect(getPostById(1)).resolves.toBeNull();
  });

  it("throws on non-404 error responses", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        status: 500,
        ok: false,
        json: async () => ({}),
      })
    );

    await expect(getPostById(1)).rejects.toThrow(/500/);
  });
});
