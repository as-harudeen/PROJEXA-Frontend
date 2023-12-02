import { useFetch } from "@hooks/useFetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export interface TeamInterface {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
  team_lead: {
    user_name: string;
    user_profile: string;
  };
}


export const useTeam = () => {

  const {getRequest} = useFetch();
  const [search, setSearch] = useState("");
  
  
  const QUERY_KEY = ["team" , search];

  const fetchData = async ({ pageParam = 1 }) => {
    const response = await getRequest(
      `team?l=${
        import.meta.env.VITE_FETCH_TEAM_LIMIT
      }&p=${pageParam}&s=${search}`
    );
    return response.json();
  };


  const teamQuery = useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length == import.meta.env.VITE_FETCH_TEAM_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
  });





  return {
    teamQuery,
    setSearch
  };
};
