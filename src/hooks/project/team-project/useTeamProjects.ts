import { useFetch } from "@hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
  const QUERY_KEY = ["team", "projects"];
  const queryClient = useQueryClient();
  const { getRequest } = useFetch();

  const teamProjectsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/projects/${team_id}?l=${
          import.meta.env.VITE_FETCH_TEAM_PROJECT_LIMIT
        }`
      );
      return (await response.json()) as GETTeamProjectsResponse;
    },
  });

  const fetchMoreDataMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      currPage,
      searchValue,
    }: {
      currPage: number;
      searchValue: string;
    }) => {

      const res = await getRequest(
        `team/projects/${team_id}?p=${currPage}&l=${
          import.meta.env.VITE_FETCH_TEAM_PROJECT_LIMIT
        }&s=${searchValue || ""}`
      );
      // return res.data as GETTeamProjectsResponse;
      return (await res.json()) as GETTeamProjectsResponse;

    },
    onSuccess: (data) => {
      if ((data as GETTeamProjectsResponse).length === 0) {
        return;
      }
      queryClient.setQueryData(QUERY_KEY, (prev: GETTeamProjectsResponse) => {
        return [...prev, ...data];
      });
    },
  });
  




  return {
    QUERY_KEY,
    teamProjectsQuery,
    fetchMoreDataMutation,
  };
};
