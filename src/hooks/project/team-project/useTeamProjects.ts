import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";

type GETTeamProjectsResponse = {
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
  const teamProjectsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(`/team/${team_id}/projects`);
      return response.data as GETTeamProjectsResponse;
    },
  });

  return {
    teamProjectsQuery
  }
};
