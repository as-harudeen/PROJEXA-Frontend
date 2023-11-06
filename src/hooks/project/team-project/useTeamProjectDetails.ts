import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";

interface GETTeamProjectDetailsResponse {
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
}

export const useTeamProjectDetails = (team_id: string, project_id: string) => {
  const QUERY_KEY = ["team", team_id, "project", project_id];

  const teamProjectDetailsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `/team/${team_id}/projects/${project_id}`
      );
      return response.data as GETTeamProjectDetailsResponse;
    },
  });

  return {
    teamProjectDetailsQuery,
  };
};
