import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import useQueryString from "../hooks/use-query-string";
import { Button } from "./ui/button";

export const Pagination = ({ totalDataCount }) => {
  const PER_PAGE_DATA_COUNT = 10;

  const maxPages = Math.ceil(totalDataCount / PER_PAGE_DATA_COUNT);

  const queryPush = useQueryString();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  let maxPageButtons = maxPages >= 5 ? 5 : maxPages || 1;

  let startPage = currentPage - 3 <= 0 ? 1 : currentPage - 3;
  if (currentPage >= maxPages) {
    startPage = currentPage - 4 <= 1 ? 1 : currentPage - 4;
  }

  const handleClick = (page) => {
    if (page === currentPage) return;
    queryPush({ page });
  };

  const showJumpAheadButton = maxPages > 5 && maxPages > currentPage + 1;
  const showJumpBackButton = maxPages > 5 && currentPage > 4;

  if (showJumpAheadButton && showJumpBackButton) {
    maxPageButtons = 3;
    startPage = currentPage - 1;
  }

  const handleJumpAhead = () => {
    if (currentPage + 5 > maxPages) {
      handleClick(maxPages);
    } else {
      handleClick(currentPage + 5);
    }
  };

  const handleJumpBack = () => {
    if (currentPage - 5 <= 0) {
      handleClick(1);
    } else {
      handleClick(currentPage - 5);
    }
  };

  return (
    <div className="mx-auto flex items-center gap-1.5 rounded-full bg-background_2 px-3 py-2 shadow-md border xs:gap-2 mt-5">
      <Button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full bg-background"
      >
        <ChevronLeft className="size-4" />
      </Button>
      {showJumpBackButton && (
        <>
          <Button
            onClick={() => handleClick(1)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background"
          >
            1
          </Button>
          <Button
            onClick={handleJumpBack}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsLeft className="hidden size-4 group-hover:block" />
          </Button>
        </>
      )}
      {Array.from({ length: maxPageButtons }).map((_, index) => {
        const page = startPage + index;
        const isActive = currentPage === page;
        const variant = isActive ? "default" : "ghost";
        return (
          <Button
            onClick={() => handleClick(page)}
            key={index}
            variant={variant}
            size="icon"
            className="size-8 rounded-full"
          >
            {page}
          </Button>
        );
      })}
      {showJumpAheadButton && (
        <>
          <Button
            onClick={handleJumpAhead}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background text-muted-foreground"
          >
            <MoreHorizontal className="size-4 group-hover:hidden" />
            <ChevronsRight className="hidden size-4 group-hover:block" />
          </Button>
          <Button
            onClick={() => handleClick(maxPages)}
            variant="ghost"
            size="icon"
            className="group size-8 rounded-full bg-background"
          >
            {maxPages}
          </Button>
        </>
      )}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === (maxPages || 1)}
        variant="ghost"
        size="icon"
        className="size-8 rounded-full bg-background"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
};
