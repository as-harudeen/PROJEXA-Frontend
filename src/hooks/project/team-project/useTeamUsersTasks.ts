import { useFetch } from "@hooks/useFetch";
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

export interface TaskDetails {
  task_id: string;
  task_title: string;
  task_priority: number;
  task_status: 'todo' | 'doing' | 'done';
  task_desc: string;
  task_time_cap: string;
  task_comments: {
    task_comment_text: string;
    commented_at: Date;
    commented_by: {
      user_name: string;
    }
  }[];
}

enum TeamRole {
  team_admin = "team_admin",
  team_member = "team_member",
}

interface GETTeamUsersTaskResponse extends UserDetails {
  role: TeamRole;
  tasks: TaskDetails[];
}


interface RepositionTaskMutationParam {
  task_id: string;
  user_id: string;
  new_user_id: string;
}

export const useTeamUsersTasks = ({
  team_id,
  project_id,
}: TeamUsersTasksParam) => {
  const queryClient = useQueryClient();
  const QUERY_KEY = ["team", team_id, "project", project_id, "users", "tasks"];
  const { getRequest, patchRequest } = useFetch();

  const teamUsersTasks = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/task-distribution/team/${team_id}/users/tasks`
      );
      return (await response.json()) as GETTeamUsersTaskResponse[];
    },
  });

  const addNewTask = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_details,
      user_id,
    }: {
      task_details: TaskDetails;
      user_id: string;
    }) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamUsersTaskResponse[]) => {
          return prev.map((user) => {
            if (user.user_id === user_id) {
              return { ...user, tasks: [...user.tasks, task_details] };
            }
            return user;
          });
        }
      );
    },
  });

  const deleteTaskFromUserMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      user_id,
    }: {
      task_id: string;
      user_id: string;
    }) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamUsersTaskResponse[]) => {
          return prev.map((user) => {
            if (user.user_id === user_id) {
              return {
                ...user,
                tasks: user.tasks.filter((task) => task.task_id !== task_id),
              };
            }
            return user;
          });
        }
      );
    },
  });


  const repositionTaskMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      user_id,
      new_user_id,
    }: RepositionTaskMutationParam) => {
      const user_id_without_prefix = user_id.split("-")[1];
      const new_user_id_without_prefix = new_user_id.split("-")[1];

      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamUsersTaskResponse[]) => {
          const currStage = prev.find(
            (user) =>
              user.user_id === user_id_without_prefix
          );
          if (!currStage) return prev;
          const currTask = currStage.tasks.find(
            (task) => task.task_id === task_id
          );
          if (!currTask) return prev;

          console.log("Returing updated stage");
          return prev.map((user) => {
            if (
              user.user_id === user_id_without_prefix
            ) {
              return {
                ...user,
                tasks: user.tasks.filter((task) => task.task_id !== task_id),
              };
            } else if (
              user.user_id ===
              new_user_id_without_prefix
            ) {
              return { ...user, tasks: [...user.tasks, currTask] };
            }
            return user;
          });
        }
      );

      await patchRequest(
        `team/task-distribution/reposition/task/${task_id}/user/${user_id_without_prefix}`,
        { new_user_id: new_user_id_without_prefix }
      );
    },
  });

  return {
    teamUsersTasks,
    addNewTask,
    deleteTaskFromUserMutation,
    repositionTaskMutation
  };
};
