import { Input } from "@components/custom/Input";
import { MdAddToPhotos } from "react-icons/md";
import { FC, useEffect, useRef, useState } from "react";
import { ProjectStageInterface } from "../../interfaces/project/personal/space/stage.interface";
import { ProjectStage } from "@components/project/personal/space/ProjectStage";
import { useParams } from "react-router-dom";
import { getRequest, patchRequest, postRequest } from "../../helper/api.helper";
import {
  API_GET_PROJECT_STAGES,
  API_POST_CREATE_PROEJCT_STAGE,
} from "@/constants/api.url";
import { GetProjectStagesResponseInterface } from "../../interfaces/api-response.interface";

import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { TaskDetails } from "@components/project/personal/space/TaskDetails";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export interface TaskDetailsInterface {
  stage_id: string;
  task_id: string;
  task_title: string;
  task_desc: string;
}
export const ProjectSpace: FC = () => {
  const queryClient = useQueryClient();
  const stageInpRef = useRef<HTMLInputElement>(null);

  const [taskDetails, setTaskDetails] = useState<TaskDetailsInterface | null>(
    null
  );
  const { project_id } = useParams();

  const addProjectStageHandler = async () => {
    const newStageTitle = stageInpRef.current!.value.trim();
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
    queryClient.setQueryData(
      ["project", "personal", "stages"],
      (prev: ProjectStageInterface[]) => [...prev, newStage]
    );
    const res = await postRequest(
      `${API_POST_CREATE_PROEJCT_STAGE}/${project_id}`,
      {
        stage_title: newStageTitle,
      }
    );

    queryClient.setQueryData(
      ["project", "personal", "stages"],
      (prev: ProjectStageInterface[]) =>
        prev.map((stage) => {
          if (stage.stage_id === temp_stage_id) {
            return res.data as ProjectStageInterface;
          }
          return stage;
        })
    );
    stageInpRef.current!.value = "";
  };

  const { data: projectStages } = useQuery<ProjectStageInterface[]>({
    queryKey: ["project", "personal", "stages"],
    queryFn: async () => {
      const res = await getRequest(`${API_GET_PROJECT_STAGES}/${project_id}`);
      return res.data as GetProjectStagesResponseInterface[];
    },
  });

  const dragEndHandler = async (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

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

  return (
    <div className="text-white font-poppins px-16 py-8 relative">
      <div className="mb-8">
        <h3 className="font-semibold text-xl">Project Space</h3>
      </div>

      <DragDropContext onDragEnd={(result) => dragEndHandler(result)}>
        <div className="flex gap-5 px-4 py-6 ">
          {projectStages?.map((stage) => (
            <Droppable key={stage.stage_id} droppableId={stage.stage_id}>
              {(provided) => (
                <ProjectStage
                  placeholder={provided.placeholder}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  {...stage}
                  // setParentState={setProjectStages}
                  setTaskDetails={setTaskDetails}
                />
              )}
            </Droppable>
          ))}
          <div>
            <div className="relative max-w-[300px]">
              <Input
                ref={stageInpRef}
                size="lg"
                label="Add stage"
                color="border"
                classNames={{
                  inputWrapper: [
                    "bg-opacity-30",
                    "bg-light_hash",
                    "group-data-[focus=true]:bg-opacity-20",
                    "group-data-[hover=true]:bg-opacity-30",
                    "pe-14",
                  ],
                  label: ["font-[500]", "font-poppins"],
                }}
              />
              <MdAddToPhotos
                onClick={addProjectStageHandler}
                size="22"
                className="absolute right-3 top-[50%] translate-y-[-50%]"
              />
            </div>
          </div>
        </div>
      </DragDropContext>
      {taskDetails !== null && (
        <TaskDetails
          setTaskDetails={setTaskDetails}
          // setProjectStages={setProjectStages}
          {...taskDetails}
        />
      )}
    </div>
  );
};
