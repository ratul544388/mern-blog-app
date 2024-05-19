import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useIntersectionObserver } from "usehooks-ts";
import fetcher from "../lib/fetcher";
const useInfinityQuery = ({ api, query = {}, queryKey }) => {
  const { data, isPending, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: ({ pageParam }) => fetcher(api, { ...query, page: pageParam }),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        const nextPageParam = lastPage.length ? allPages.length + 1 : undefined;
        return nextPageParam;
      },
    });

  const { isIntersecting, ref } = useIntersectionObserver();

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, isIntersecting]);


  const queryData = data?.pages?.flatMap((page) => page);

  return {
    data: queryData,
    isPending,
    isError,
    hasNextPage,
    ref,
  };
};

export default useInfinityQuery;
