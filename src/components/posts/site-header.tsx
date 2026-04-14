import Link from "next/link";

/** Thin top bar so pages share the same chrome without extra client JS. */
export function SiteHeader() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-full max-w-4xl items-center gap-4 px-4">
        <Link
          href="/posts"
          className="text-sm font-semibold tracking-tight text-foreground hover:underline"
        >
          JSONPlaceholder
        </Link>
        <span className="text-muted-foreground text-xs">демо-пагинация</span>
      </div>
    </header>
  );
}
