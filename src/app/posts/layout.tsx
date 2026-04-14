import type { Metadata } from "next";

import { SiteHeader } from "@/components/posts/site-header";

export const metadata: Metadata = {
  title: {
    default: "Посты",
    template: "%s · JSONPlaceholder",
  },
  description:
    "Список постов с пагинацией (_limit, _page) и отдельными страницами записей.",
};

export default function PostsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="bg-muted/30 flex flex-1 flex-col">{children}</div>
    </>
  );
}
