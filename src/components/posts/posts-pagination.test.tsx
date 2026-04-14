import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PostsPagination } from "./posts-pagination";

describe("PostsPagination", () => {
  it("renders nothing when there is only one page", () => {
    const { container } = render(
      <PostsPagination currentPage={1} totalPages={1} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("marks the current page link", () => {
    render(<PostsPagination currentPage={2} totalPages={5} />);
    const current = screen.getByLabelText("Страница 2");
    expect(current).toHaveAttribute("aria-current", "page");
    expect(current).toHaveAttribute("href", "/posts?page=2");
  });

  it("links previous and next when in range", () => {
    render(<PostsPagination currentPage={2} totalPages={4} />);
    expect(screen.getByLabelText("Предыдущая страница")).toHaveAttribute(
      "href",
      "/posts?page=1"
    );
    expect(screen.getByLabelText("Следующая страница")).toHaveAttribute(
      "href",
      "/posts?page=3"
    );
  });

  it("does not expose previous link on the first page", () => {
    render(<PostsPagination currentPage={1} totalPages={3} />);
    expect(
      screen.queryByLabelText("Предыдущая страница")
    ).not.toBeInTheDocument();
  });

  it("does not expose next link on the last page", () => {
    render(<PostsPagination currentPage={3} totalPages={3} />);
    expect(
      screen.queryByLabelText("Следующая страница")
    ).not.toBeInTheDocument();
  });
});
