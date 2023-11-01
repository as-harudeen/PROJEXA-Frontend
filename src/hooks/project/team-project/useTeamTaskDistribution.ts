import { getRequest, postRequest } from "@/helper/api.helper";
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


  return {
    teamTaskDistributionQuery,
    addNewTaskDitributionStageMutation
  };
};
