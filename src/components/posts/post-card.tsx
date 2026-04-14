import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Post } from "@/lib/json-placeholder/types";

import styles from "./post-card.module.css";

type PostCardProps = {
  post: Post;
  /** Current list page — passed through so "back" can restore pagination. */
  listPage: number;
};

export function PostCard({ post, listPage }: PostCardProps) {
  const href = `/posts/${post.id}?returnPage=${listPage}`;

  return (
    <Link href={href} className={`${styles.link} block h-full`}>
      <Card className={`${styles.card} h-full`}>
        <CardHeader className="gap-1">
          <CardDescription className="line-clamp-1">
            Пост №{post.id}
          </CardDescription>
          <CardTitle className="text-lg leading-snug line-clamp-2">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
            {post.body}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
