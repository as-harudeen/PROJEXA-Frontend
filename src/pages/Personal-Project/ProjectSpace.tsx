import { FC, useState } from "react";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Input } from "@components/custom/Input";
import { MdAddToPhotos } from "react-icons/md";
import { ProjectStage } from "@components/project/personal/space/ProjectStage";
import { TaskDetails } from "@components/project/personal/space/TaskDetails";


import { useParams } from "react-router-dom";
import { usePersonalProjectSpace } from "@hooks/project/personal-project/usePersonalProjectSpace";

export interface TaskDetailsInterface {
  stage_id: string;
  task_id: string;
  task_title: string;
  task_desc: string;
}
export const ProjectSpace: FC = () => {

  const [taskDetails, setTaskDetails] = useState<TaskDetailsInterface | null>(
    null
  );
  const { project_id } = useParams();

  const {
    addProjectStageHandler,
    dragEndHandler,
    personalProjectSpaceQuery,
    stageInpRef,
  } = usePersonalProjectSpace(project_id!);

  const { data: projectStages } = personalProjectSpaceQuery;

  return (
    <div className="text-light_mode_text dark:text-white font-poppins px-8 md:px-16 py-8 relative">
      <div className="mb-8">
        <h3 className="font-semibold text-xl">Project Space</h3>
      </div>

      <DragDropContext onDragEnd={(result) => dragEndHandler(result)}>
        <div className="flex gap-5 px-4 py-6 overflow-x-scroll no-scrollbar">
          {projectStages?.map((stage) => (
            <Droppable key={stage.stage_id} droppableId={stage.stage_id}>
              {(provided) => (
                <ProjectStage
                  placeholder={provided.placeholder}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  {...stage}
                  setTaskDetails={setTaskDetails}
                />
              )}
            </Droppable>
          ))}
          <div>
            <div className="relative min-w-[200px] max-w-[300px]">
              <Input
                ref={stageInpRef}
                onKeyUp={(e) => {
                  if (e.key === "Enter") addProjectStageHandler();
                }}
                size="lg"
                label="Add stage"
                color="border"
                classNames={{
                  inputWrapper: [
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
          {...taskDetails}
        />
      )}
    </div>
  );
};
