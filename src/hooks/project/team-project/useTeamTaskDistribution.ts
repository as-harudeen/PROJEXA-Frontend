import { EditedTaskDetails } from "@components/project/team/task-distribution/Task-Details-Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TaskDetails } from "./useTeamUsersTasks";
import { useFetch } from "@hooks/useFetch";

export type GETTeamTaskDistributionStagesResponse = {
  task_distribution_board_stage_id: string;
  task_distribution_board_stage_title: string;
  tasks: TaskDetails[];
}[];

export interface POSTCreateTaskDitstributionStageResponse {
  task_distribution_board_stage_id: string;
  task_distribution_board_stage_title: string;
}

interface UseTeamTaskDistributionParam {
  team_id: string;
  project_id: string;
}

interface ChangeTaskStageMutationParam {
  task_id: string;
  stage_id: string;
  new_stage_id: string;
}

interface UpdateTaskMutationParam {
  task_id: string;
  stage_id: string;
  updated_task_details: EditedTaskDetails;
}

export const useTeamTaskDistribution = ({
  team_id,
  project_id,
}: UseTeamTaskDistributionParam) => {
  const QUERY_KEY = ["team", team_id, "task-distribution", "stages"];

  const queryClient = useQueryClient();
  const { getRequest, postRequest, patchRequest } = useFetch();

  const teamTaskDistributionQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/task-distribution/${project_id}/stage`
      );

      // return response.data as GETTeamTaskDistributionStagesResponse;
      return (await response.json()) as GETTeamTaskDistributionStagesResponse;
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const addNewTaskDitributionStageMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (stage_name: string) => {
      const temp_stage_id = Date.now().toString();

      const newStage = {
        task_distribution_board_stage_id: temp_stage_id,
        task_distribution_board_stage_title: stage_name,
        tasks: [],
      };

      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return [...prev, newStage];
        }
      );

      const response = await postRequest(
        `team/task-distribution/${project_id}/stage`,
        {
          task_distribution_board_stage_title: stage_name,
        }
      );

      return {
        temp_stage_id,
        ...((await response.json()) as POSTCreateTaskDitstributionStageResponse),
      };
    },
    onSuccess({
      task_distribution_board_stage_id,
      task_distribution_board_stage_title,
      temp_stage_id,
    }) {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === temp_stage_id) {
              return {
                ...stage,
                task_distribution_board_stage_id,
                task_distribution_board_stage_title,
              };
            }
            return stage;
          });
        }
      );
    },
  });

  const addNewTaskDistributionStageTask = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      stage_id,
      task_title,
      task_priority,
      task_time_cap,
    }: {
      stage_id: string;
      task_title: string;
      task_priority: string;
      task_time_cap: string;
    }) => {
      const temp_task_id = Date.now().toString();
      const newTask = {
        task_id: temp_task_id,
        task_desc: "",
        task_title,
        task_priority,
        task_time_cap,
        task_status: "todo",
      };

      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          const updatedState = prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return { ...stage, tasks: [...stage.tasks, newTask] };
            }
            return stage;
          });
          return updatedState;
        }
      );

      const response = await postRequest(
        `team/task-distribution/stage/${stage_id}/task`,
        {
          task_title,
          task_priority,
          task_time_cap,
        }
      );

      const { task_id } = (await response.json()) as { task_id: string };
      return {
        stage_id,
        task_id,
        temp_task_id,
      };
    },
    onSuccess({ stage_id, task_id, temp_task_id }) {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return {
                ...stage,
                tasks: stage.tasks.map((task) => {
                  if (task.task_id === temp_task_id) {
                    console.log("Changing the task_id");
                    task.task_id = task_id;
                  }
                  return task;
                }),
              };
            }
            return stage;
          });
        }
      );
    },
  });

  const changeTaskStageMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      stage_id,
      new_stage_id,
    }: ChangeTaskStageMutationParam) => {
      const stage_id_without_prefix = stage_id.split("-")[1];
      const new_stage_id_without_prefix = new_stage_id.split("-")[1];

      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          const currStage = prev.find(
            (stage) =>
              stage.task_distribution_board_stage_id === stage_id_without_prefix
          );
          if (!currStage) return prev;
          const currTask = currStage.tasks.find(
            (task) => task.task_id === task_id
          );
          if (!currTask) return prev;

          console.log("Returing updated stage");
          return prev.map((stage) => {
            if (
              stage.task_distribution_board_stage_id === stage_id_without_prefix
            ) {
              return {
                ...stage,
                tasks: stage.tasks.filter((task) => task.task_id !== task_id),
              };
            } else if (
              stage.task_distribution_board_stage_id ===
              new_stage_id_without_prefix
            ) {
              return { ...stage, tasks: [...stage.tasks, currTask] };
            }
            return stage;
          });
        }
      );

      await patchRequest(
        `team/task-distribution/change/stage/${stage_id_without_prefix}/task/${task_id}`,
        { new_stage_id: new_stage_id_without_prefix }
      );
    },
  });

  const deleteTaskFromStageMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      stage_id,
    }: {
      task_id: string;
      stage_id: string;
    }) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return {
                ...stage,
                tasks: stage.tasks.filter((task) => task.task_id !== task_id),
              };
            }
            return stage;
          });
        }
      );
    },
  });

  const relocateTaskMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_details,
      stage_id,
    }: {
      task_details: TaskDetails;
      stage_id: string;
    }) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return { ...stage, tasks: [...stage.tasks, task_details] };
            }
            return stage;
          });
        }
      );
    },
  });

  const updateTaskMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      task_id,
      stage_id,
      updated_task_details,
    }: UpdateTaskMutationParam) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return {
                ...stage,
                tasks: stage.tasks.map((task) => {
                  if (task.task_id === task_id) {
                    return { ...task, ...updated_task_details };
                  }
                  return task;
                }),
              };
            }
            return stage;
          });
        }
      );

      await patchRequest(`team/task/${task_id}`, updated_task_details);
    },
  });

  const deleteStage = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({ stage_id }: { stage_id: string }) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.filter(
            (stage) => stage.task_distribution_board_stage_id != stage_id
          );
        }
      );
    },
  });

  return {
    teamTaskDistributionQuery,
    addNewTaskDitributionStageMutation,
    addNewTaskDistributionStageTask,
    changeTaskStageMutation,
    deleteTaskFromStageMutation,
    relocateTaskMutation,
    updateTaskMutation,
    deleteStage
  };
};
