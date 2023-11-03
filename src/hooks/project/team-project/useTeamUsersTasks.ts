import { getRequest, patchRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface TeamUsersTasksParam {
  team_id: string;
  project_id: string;
}

interface UserDetails {
  user_id: string;
  user_name: string;
  user_profile: string;
}

interface TaskDetails {
  task_id: string;
  task_title: string;
  task_priority: string;
  task_status: string;
  task_desc: string;
}

enum TeamRole {
  team_admin = "team_admin",
  team_member = "team_member",
}

interface GETTeamUsersTaskResponse extends UserDetails {
  role: TeamRole;
  tasks: TaskDetails[];
}



export const useTeamUsersTasks = ({
  team_id,
  project_id,
}: TeamUsersTasksParam) => {
  const QUERY_KEY = ["team", team_id, "project", project_id, "users", "tasks"];

  const teamUsersTasks = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/${team_id}/project/${project_id}/task-distribution/users/tasks`
      );
      return response.data as GETTeamUsersTaskResponse[];
    },
  });



  return {
    teamUsersTasks,
  };
};
