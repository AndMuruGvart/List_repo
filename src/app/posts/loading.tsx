import { Skeleton } from "@/components/ui/skeleton";

export default function PostsLoading() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10">
      <div className="space-y-2">
        <Skeleton className="h-9 w-48" />
        <Skeleton className="h-4 w-full max-w-xl" />
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <li key={index}>
            <div className="bg-card text-card-foreground flex flex-col gap-3 rounded-xl border p-6 shadow-xs">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-5 w-[85%]" />
              <Skeleton className="h-16 w-full" />
            </div>
          </li>
        ))}
      </ul>
      <Skeleton className="mx-auto h-10 w-72" />
    </main>
  );
}
