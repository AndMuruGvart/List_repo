import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

type PostsPaginationProps = {
  currentPage: number;
  totalPages: number;
};

/** Server-friendly pagination using `next/link` for client-side navigations. */
export function PostsPagination({
  currentPage,
  totalPages,
}: PostsPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent className="flex-wrap gap-1">
        <PaginationItem>
          {currentPage > 1 ? (
            <Link
              href={`/posts?page=${currentPage - 1}`}
              aria-label="Предыдущая страница"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pl-2"
              )}
            >
              <ChevronLeftIcon className="size-4" />
              <span className="hidden sm:inline">Назад</span>
            </Link>
          ) : (
            <span
              aria-disabled
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "pointer-events-none gap-1 pl-2 opacity-40"
              )}
            >
              <ChevronLeftIcon className="size-4" />
              <span className="hidden sm:inline">Назад</span>
            </span>
          )}
        </PaginationItem>

        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <PaginationItem key={page}>
              <Link
                href={`/posts?page=${page}`}
                aria-label={`Страница ${page}`}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  buttonVariants({
                    variant: isActive ? "outline" : "ghost",
                    size: "icon",
                  })
                )}
              >
                {page}
              </Link>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          {currentPage < totalPages ? (
            <Link
              href={`/posts?page=${currentPage + 1}`}
              aria-label="Следующая страница"
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "gap-1 pr-2"
              )}
            >
              <span className="hidden sm:inline">Вперёд</span>
              <ChevronRightIcon className="size-4" />
            </Link>
          ) : (
            <span
              aria-disabled
              className={cn(
                buttonVariants({ variant: "ghost", size: "default" }),
                "pointer-events-none gap-1 pr-2 opacity-40"
              )}
            >
              <span className="hidden sm:inline">Вперёд</span>
              <ChevronRightIcon className="size-4" />
            </span>
          )}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
