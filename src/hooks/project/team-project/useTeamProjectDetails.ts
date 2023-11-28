import { useFetch } from "@hooks/useFetch";
import { ProjectStatusEnum, UpdateProjectInterface } from "@/interfaces/project";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


interface TaskDetails {
  task_priority: number;
  task_status: "todo" | "doing" | "done";
  task_title: string;
  task_desc: string;
  task_time_cap: number;
  assigned_to: {
    user_name: string;
    user_profile: string;
  };
}

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
  project_status: ProjectStatusEnum;
  isCurrentUserLeader: boolean;
  tasks: {
    [key: `P${number}`]: {
      todo: TaskDetails[];
      doing: TaskDetails[];
      done: TaskDetails[];
    };
  },
  completedTaskPercentage: number;
}



export const useTeamProjectDetails = (team_id: string, project_id: string) => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["team", team_id, "project", project_id];
  const {getRequest, patchRequest} = useFetch();

  const teamProjectDetailsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/projects/project/${project_id}`
      );
      return (await response.json()) as GETTeamProjectDetailsResponse;
    },
  });

  const updateProjectDetails = (updatedDetails: UpdateProjectInterface) => {
    queryClient.setQueryData(QUERY_KEY, (prev: GETTeamProjectDetailsResponse) => {
      return {...prev, ...updatedDetails}
    })
  };

  const updateStatusMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      new_project_status,
    }: {
      project_id: string;
      new_project_status: string;
    }) => {
      await patchRequest(`team/projects/project/${project_id}/status`, {
        new_project_status,
      });
      return new_project_status;
    },
    onSuccess(new_project_status) {
      queryClient.setQueryData(QUERY_KEY, (prev: GETTeamProjectDetailsResponse) => ({
        ...prev,
        project_status: new_project_status,
      }));
    },
  });

  return {
    teamProjectDetailsQuery,
    updateStatusMutation,
    updateProjectDetails,
  };
};
