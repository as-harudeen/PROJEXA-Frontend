import { UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export function useInfiniteScroll<T>(
  queryKey: string[],
  fetchMoreDataMutation: UseMutationResult<
    T[],
    Error,
    {
      currPage: number;
      searchValue: string;
    },
    unknown
  >,
) {

  const queryClient = useQueryClient();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [currPage, setCurrPage] = useState(1);
  console.log(currPage);
  const [hasMore, setHasMore] = useState(true);



  const fetchData = async () => {
    const s = searchInputRef.current?.value;
    const previousDataCount = (queryClient.getQueryData(queryKey) as T[])
      ?.length;

    await fetchMoreDataMutation.mutateAsync({
      searchValue: s || "",
      currPage: currPage,
    });
    const currDataCount = (queryClient.getQueryData(queryKey) as T[])?.length;

    if (
      currDataCount - previousDataCount <
      +import.meta.env.VITE_FETCH_TEAM_LIMIT
    ) {
      setHasMore(false);
    }
  };

  const searchFetchDataHandler = async () => {
    queryClient.setQueryData(queryKey, []);
    await fetchData();
  };

  let timer: NodeJS.Timeout;

  const searchInputChangeHandler = () => {
    setCurrPage(1);
    // setSearchParam({p: '1'})
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      console.log("fetching");
      searchFetchDataHandler();
    }, 1000);
  };

  const increasePage = () => {
    setCurrPage(prev => prev + 1);
    // setSearchParam({p: `${currPage + 1}`});
  }

  useEffect(() => {
    fetchData();
  }, [currPage]);

  return {
    hasMore,
    searchInputRef,
    setHasMore,
    searchInputChangeHandler,
    increasePage
  };
}
