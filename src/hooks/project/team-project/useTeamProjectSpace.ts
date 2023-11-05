import { getRequest, patchRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export type TaskStatus = "todo" | "doing" | "done";

interface TaskDetails {
  task_id: string;
  task_title: string;
  task_desc: string;
  task_priority: string;
  task_status: TaskStatus;
}

interface GETTeamProjectTaskResponse {
  todo_tasks: TaskDetails[];
  doing_tasks: TaskDetails[];
  done_tasks: TaskDetails[];
}

interface ChangeTaskStatusParam {
  task_id: string;
  task_status: TaskStatus;
  new_task_status: TaskStatus;
}

export const useTeamProjectSpace = ({
  team_id,
  project_id,
}: {
  team_id: string;
  project_id: string;
}) => {
  const QUERY_KEY = ["team", team_id, "project", project_id, "space"];
  const queryClient = useQueryClient();

  const teamProjectSpaceQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/${team_id}/project/${project_id}/task`
      );

      console.log(response.data);
      return response.data as GETTeamProjectTaskResponse;
    },
  });

  const changeTaskStatusMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      task_status,
      new_task_status,
    }: ChangeTaskStatusParam) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamProjectTaskResponse) => {
          const currentTask = prev[`${task_status}_tasks`].find(
            (task) => task.task_id === task_id
          );
          if (!currentTask) {
            console.log("Could not found task");
            return prev;
          }

          return {
            ...prev,
            [`${task_status}_tasks`]: prev[`${task_status}_tasks`].filter(
              (task) => task.task_id !== task_id
            ),
            [`${new_task_status}_tasks`]: [
              ...prev[`${new_task_status}_tasks`],
              currentTask,
            ],
          };
        }
      );

      await patchRequest(
        `team/${team_id}/project/${project_id}/task/${task_id}/status`,
        {
          new_task_status,
        }
      );
    },
  });

  return {
    teamProjectSpaceQuery,
    changeTaskStatusMutation,
  };
};
