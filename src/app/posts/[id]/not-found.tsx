import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PostNotFound() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-start gap-6 px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Пост не найден</h1>
      <p className="text-muted-foreground text-sm leading-relaxed">
        Запись отсутствует или была удалена в демо-API.
      </p>
      <Link href="/posts" className={cn(buttonVariants({ size: "sm" }))}>
        К списку постов
      </Link>
    </main>
  );
}
