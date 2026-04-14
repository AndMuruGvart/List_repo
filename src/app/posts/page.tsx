import type { Metadata } from "next";

import { PostCard } from "@/components/posts/post-card";
import { PostsPagination } from "@/components/posts/posts-pagination";
import { POSTS_PER_PAGE } from "@/lib/json-placeholder/constants";
import {
  clampPage,
  getCachedPostsPage,
  getCachedPostsTotalCount,
  parsePositiveInt,
} from "@/lib/json-placeholder/posts";

type PostsIndexPageProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: PostsIndexPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams;
  const total = await getCachedPostsTotalCount();
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const current = clampPage(parsePositiveInt(pageParam, 1), totalPages);
  return {
    title: `Посты — страница ${current}`,
    description: `Страница ${current} из ${totalPages}. По ${POSTS_PER_PAGE} записей за запрос.`,
  };
}

export default async function PostsPage({ searchParams }: PostsIndexPageProps) {
  const { page: pageParam } = await searchParams;
  const total = await getCachedPostsTotalCount();
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const currentPage = clampPage(parsePositiveInt(pageParam, 1), totalPages);
  const posts = await getCachedPostsPage(currentPage);

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Посты</h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed">
          Данные:{" "}
          <code className="bg-muted rounded px-1 py-0.5 text-xs">
            GET /posts?_limit={POSTS_PER_PAGE}&amp;_page={currentPage}
          </code>
          . Откройте карточку — кнопка «Назад» вернёт на эту страницу списка.
        </p>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <li key={post.id}>
            <PostCard post={post} listPage={currentPage} />
          </li>
        ))}
      </ul>

      <PostsPagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
