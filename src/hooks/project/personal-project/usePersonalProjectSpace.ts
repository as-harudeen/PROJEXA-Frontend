import {
  API_GET_PROJECT_STAGES,
  API_POST_CREATE_PROEJCT_STAGE,
} from "@/constants/api.url";
import { useFetch } from "@hooks/useFetch";
import { ProjectStageInterface } from "@/interfaces/project/personal/space/stage.interface";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { toast } from "react-toastify";
import { GetProjectStagesResponseInterface } from "@/interfaces/api-response.interface";
import { DropResult } from "react-beautiful-dnd";

export const usePersonalProjectSpace = (project_id: string) => {
  const QUERY_KEY = ["project", "personal", "stages", project_id];

  const stageInpRef = useRef<HTMLInputElement>(null);

  const { getRequest, postRequest, patchRequest } = useFetch();
  const queryClient = useQueryClient();

  const personalProjectSpaceQuery = useQuery<ProjectStageInterface[]>({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await getRequest(`${API_GET_PROJECT_STAGES}/${project_id}`);
      return (await res.json()) as GetProjectStagesResponseInterface[];
    },
  });

  const addProjectStageHandler = async () => {
    const newStageTitle = stageInpRef.current!.value.trim();
    stageInpRef.current!.value = "";

    if (newStageTitle === "") {
      toast.error("Stage title can't be empty");
      return;
    }
    const temp_stage_id = Date.now().toString();
    const newStage: ProjectStageInterface = {
      stage_id: temp_stage_id,
      stage_title: newStageTitle,
      tasks: [],
    };
    queryClient.setQueryData(QUERY_KEY, (prev: ProjectStageInterface[]) => [
      ...prev,
      newStage,
    ]);
    const res = await postRequest(
      `${API_POST_CREATE_PROEJCT_STAGE}/${project_id}`,
      {
        stage_title: newStageTitle,
      }
    );

    const responseData = (await res.json()) as ProjectStageInterface;

    queryClient.setQueryData(QUERY_KEY, (prev: ProjectStageInterface[]) => {
      const updatedState = prev.map((stage) => {
        if (stage.stage_id === temp_stage_id) {
          return responseData;
        }
        return stage;
      });
      return updatedState;
    });
  };

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const { data: projectStages } = personalProjectSpaceQuery;
    if (destination.droppableId === source.droppableId) {
      if (destination.index !== source.index) {
        await patchRequest(`task/${source.droppableId}/${draggableId}`, {
          new_position: destination.index,
        });
        queryClient.setQueryData(
          ["project", "personal", "stages"],
          (prev: ProjectStageInterface[]) =>
            prev.map((stage) => {
              if (stage.stage_id === source.droppableId) {
                const currTask = stage.tasks[source.index];
                stage.tasks.splice(source.index, 1);
                stage.tasks.splice(destination.index, 0, currTask);
              }
              return stage;
            })
        );
      }
    } else {
      const newProjectStages = [...(projectStages as ProjectStageInterface[])];
      const dragStage = newProjectStages.find(
        (stage) => stage.stage_id === source.droppableId
      );
      if (!dragStage) return;
      const [task] = dragStage.tasks.splice(source.index, 1);
      if (!task) return;

      const dropStage = newProjectStages.find(
        (stage) => stage.stage_id === destination.droppableId
      );
      if (!dropStage) return;

      dropStage.tasks.splice(destination.index, 0, task);
      await patchRequest(`task/${source.droppableId}/${draggableId}`, {
        new_position: destination.index,
        new_stage_id: destination.droppableId,
      });
      queryClient.setQueryData(
        ["project", "personal", "stages"],
        newProjectStages
      );
    }
  };

  return {
    personalProjectSpaceQuery,
    stageInpRef,
    addProjectStageHandler,
    dragEndHandler
  };
};
