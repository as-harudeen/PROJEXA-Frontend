import { getRequest, patchRequest, postRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface TeamTaskInterface {
  task_id: string;
  task_title: string;
  task_priority: string;
  task_desc: string;
  task_status: string;
}

export type GETTeamTaskDistributionStagesResponse = {
  task_distribution_board_stage_id: string;
  task_distribution_board_stage_title: string;
  tasks: TeamTaskInterface[];
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

export const useTeamTaskDistribution = ({
  team_id,
  project_id,
}: UseTeamTaskDistributionParam) => {
  const QUERY_KEY = ["team", team_id, "task-distribution"];

  const queryClient = useQueryClient();

  const teamTaskDistributionQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(
        `team/${team_id}/project/${project_id}/task-distribution/stage`
      );
      console.log(response.data);
      return response.data as GETTeamTaskDistributionStagesResponse;
    },
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
        `team/${team_id}/project/${project_id}/task-distribution/stage`,
        {
          task_distribution_board_stage_title: stage_name,
        }
      );

      return {
        temp_stage_id,
        ...(response.data as POSTCreateTaskDitstributionStageResponse),
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
    }: {
      stage_id: string;
      task_title: string;
      task_priority: string;
    }) => {
      const temp_task_id = Date.now().toString();
      const newTask = {
        task_id: temp_task_id,
        task_desc: "",
        task_title,
        task_priority,
      };

      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamTaskDistributionStagesResponse) => {
          return prev.map((stage) => {
            if (stage.task_distribution_board_stage_id === stage_id) {
              return { ...stage, tasks: [...stage.tasks, newTask] };
            }
            return stage;
          });
        }
      );

      ("team/:team_id/project/:project_id/task-distribution/stage/:stage_id/task");
      const response = await postRequest(
        `team/${team_id}/project/${project_id}/task-distribution/stage/${stage_id}/task`,
        {
          task_title,
          task_priority,
        }
      );

      const { task_id } = response.data as { task_id: string };
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
        `team/${team_id}/project/${project_id}/task-distribution/change/stage/${stage_id_without_prefix}/task/${task_id}`,
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
      task_details: TeamTaskInterface;
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

  return {
    teamTaskDistributionQuery,
    addNewTaskDitributionStageMutation,
    addNewTaskDistributionStageTask,
    changeTaskStageMutation,
    deleteTaskFromStageMutation,
    relocateTaskMutation
  };
};
