import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { createElement, type ComponentProps, type ReactNode } from "react";
import { afterEach, vi } from "vitest";

afterEach(() => {
  cleanup();
});

/** Renders real `<a href>` so RTL queries work without the Next runtime. */
vi.mock("next/link", () => ({
  default: function MockLink({
    href,
    children,
    ...rest
  }: { href: string; children?: ReactNode } & Omit<
    ComponentProps<"a">,
    "href" | "children"
  >) {
    return createElement("a", { href, ...rest }, children);
  },
}));
