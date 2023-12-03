import { useFetch } from "@hooks/useFetch";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useState } from "react";

export type GETTeamProjectsResponse = {
  project_name: string;
  project_desc: string;
  project_start_date: Date;
  project_end_date: Date;
  project_reference: {
    title: string;
    link: string;
  }[];
  team_project_id: string;
  project_status: "pending" | "onprogress" | "completed";
}[];

export const useTeamProjects = (team_id: string) => {
  const { getRequest } = useFetch();

  const [search, setSearch] = useState("");

  const QUERY_KEY = ["team", "projects", team_id, search];

  const fetchData = async ({ pageParam = 1 }) => {
    const res = await getRequest(
      `team/projects/${team_id}?p=${pageParam}&l=${
        import.meta.env.VITE_FETCH_TEAM_PROJECT_LIMIT
      }&s=${search || ""}`
    );
    return res.json();
  };

  const teamProjectsQuery = useInfiniteQuery({
    queryKey: QUERY_KEY,
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage =
        lastPage.length == import.meta.env.VITE_FETCH_TEAM_PROJECT_LIMIT
          ? allPages.length + 1
          : undefined;
      return nextPage;
    },
  });

  return {
    teamProjectsQuery,
    setSearch,
  };
};
