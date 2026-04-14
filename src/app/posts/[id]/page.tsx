import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { POSTS_PER_PAGE } from "@/lib/json-placeholder/constants";
import {
  clampPage,
  getCachedPostsTotalCount,
  getPostById,
  parsePositiveInt,
} from "@/lib/json-placeholder/posts";
import { cn } from "@/lib/utils";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnPage?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: PostDetailPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id)) {
    return { title: "Пост" };
  }
  const post = await getPostById(id);
  if (!post) {
    return { title: "Не найдено" };
  }
  return {
    title: post.title.slice(0, 72),
    description: post.body.slice(0, 160),
  };
}

export default async function PostDetailPage({
  params,
  searchParams,
}: PostDetailPageProps) {
  const { id: rawId } = await params;
  const id = Number.parseInt(rawId, 10);
  if (!Number.isFinite(id)) {
    notFound();
  }

  const post = await getPostById(id);
  if (!post) {
    notFound();
  }

  const { returnPage: returnParam } = await searchParams;
  const total = await getCachedPostsTotalCount();
  const totalPages = Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
  const returnPage = clampPage(parsePositiveInt(returnParam, 1), totalPages);

  const listHref =
    returnPage > 1 ? `/posts?page=${returnPage}` : "/posts";

  return (
    <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-10">
      <Link
        href={listHref}
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "w-fit gap-1 px-0"
        )}
      >
        ← Назад к списку
        {returnPage > 1 ? (
          <span className="text-muted-foreground font-normal">
            (стр. {returnPage})
          </span>
        ) : null}
      </Link>

      <Card>
        <CardHeader className="gap-2">
          <CardDescription>
            Пост №{post.id} · пользователь {post.userId}
          </CardDescription>
          <CardTitle className="text-2xl leading-snug">{post.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
            {post.body}
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
