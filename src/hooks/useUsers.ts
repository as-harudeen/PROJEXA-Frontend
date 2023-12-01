import { useInfiniteQuery } from "@tanstack/react-query";
import { useFetch } from "./useFetch";
import { useState } from "react";

export type GETgetAllUsersResponseType = {
  user_name: string;
  user_profile: string;
  user_id: string;
}[];

export const useUsers = () => {
  const { getRequest} = useFetch();

  const [search, setSearch] = useState("");

  const fetchData = async ({ pageParam = 1 }) => {
    const response = await getRequest(
      `user/get-all-users?l=${
        import.meta.env.VITE_FETCH_USERS_LIMIT
      }&p=${pageParam}&s=${search}`
    );
    return response.json();
  };


  const usersQuery = useInfiniteQuery({
    queryKey: ["users", search],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length == import.meta.env.VITE_FETCH_USERS_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
  });

  return {
    usersQuery,
    setSearch
  }
};
