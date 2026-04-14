import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostCard } from "./post-card";
import type { Post } from "@/lib/json-placeholder/types";

const samplePost: Post = {
  userId: 1,
  id: 12,
  title: "Test post title",
  body: "Body content for the card.",
};

describe("PostCard", () => {
  it("renders a link with post id and returnPage from listPage", () => {
    render(<PostCard post={samplePost} listPage={4} />);

    const link = screen.getByRole("link", { name: /Test post title/i });
    expect(link).toHaveAttribute("href", "/posts/12?returnPage=4");
  });

  it("shows post id in the description line", () => {
    render(<PostCard post={samplePost} listPage={1} />);
    expect(screen.getByText(/Пост №12/)).toBeInTheDocument();
  });
});
