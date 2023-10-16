import { Input } from "@components/custom/Input";
import { MdAddToPhotos } from "react-icons/md";
import { FC, useEffect, useRef, useState } from "react";
import { ProjectStageInterface } from "../../interfaces/project/personal/space/stage.interface";
import { ProjectStage } from "@components/project/personal/space/ProjectStage";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../helper/api.helper";
import {
  API_GET_PROJECT_STAGES,
  API_POST_CREATE_PROEJCT_STAGE,
} from "@/constants/api.url";
import { GetProjectStagesResponseInterface } from "../../interfaces/api-response.interface";

import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const ProjectSpace: FC = () => {
  const stageInpRef = useRef<HTMLInputElement>(null);
  const [projectStages, setProjectStages] = useState<ProjectStageInterface[]>(
    []
  );

  const { project_id } = useParams();

  const addProjectStageHandler = async () => {
    const newStageTitle = stageInpRef.current!.value;
    await postRequest(`${API_POST_CREATE_PROEJCT_STAGE}/${project_id}`, {
      stage_title: newStageTitle,
    });
    const newStage: ProjectStageInterface = {
      stage_id: Date.now().toString(),
      stage_title: newStageTitle,
      tasks: [],
    };
    setProjectStages((prev) => [...prev, newStage]);
    stageInpRef.current!.value = "";
  };

  const getProjectStages = async () => {
    const res = await getRequest(`${API_GET_PROJECT_STAGES}/${project_id}`);
    console.log(res.data);
    setProjectStages(res.data as GetProjectStagesResponseInterface[]);
  };

  useEffect(() => {
    getProjectStages();
  }, []);

  return (
    <div className="text-white font-poppins px-16 py-8">
      <div className="mb-8">
        <h3 className="font-semibold text-xl">Project Space</h3>
      </div>

      <DragDropContext onDragEnd={(result) => console.log(result)}>
        <div className="flex gap-5 px-4 py-6 ">
          {projectStages.map((stage) => (
            <Droppable key={stage.stage_id} droppableId={stage.stage_id}>
              {(provided) => (
                <ProjectStage {...provided.droppableProps} ref={provided.innerRef} {...stage} setParentState={setProjectStages} />
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
    </div>
  );
};
