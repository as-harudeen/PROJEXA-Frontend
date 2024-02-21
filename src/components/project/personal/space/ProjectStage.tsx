import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { ProjectStageInterface } from "interfaces/project/personal/space/stage.interface";
import React, { forwardRef } from "react";
import { useParams } from "react-router-dom";

import { Draggable } from "react-beautiful-dnd";
import { TaskDetailsInterface } from "@pages/Personal-Project/ProjectSpace";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { usePersonalProjectStage } from "@hooks/project/personal-project/usePersonalProjectStage";

type ProjectStageProps = {
  setTaskDetails: React.Dispatch<
    React.SetStateAction<TaskDetailsInterface | null>
  >;
  placeholder: React.ReactNode;
} & ProjectStageInterface;

export const ProjectStage = forwardRef<HTMLDivElement, ProjectStageProps>(
  (
    { stage_id, stage_title, tasks, placeholder, setTaskDetails, ...props },
    ref
  ) => {
    const { project_id } = useParams();

    const {addTaskHandler, deleteStageHandler, taskInpRef} = usePersonalProjectStage(project_id!, stage_id);


    const taskOnClickHandler = ({
      task_id,
      task_title,
      task_desc,
    }: {
      task_id: string;
      task_title: string;
      task_desc: string;
    }) => {
      setTaskDetails({ stage_id, task_id, task_title, task_desc });
    };


    return (
      <div
        {...props}
        className="relative border h-full border-light_mode_text dark:border-white px-6 py-4 w-[300px] md:w-[360px] rounded-md bg-light_mode_primary dark:bg-hash_one bg-opacity-50 max-h-screen overflow-y-scrol shadow-lg"
      >
        <div className="absolute right-1">
          <DeleteConfirmModal
            title="Are you sure?"
            body="All tasks of this stage will also will be deleted!. 
            are you really want delete the stage? "
            confirmButtonHandler={deleteStageHandler}
          />
        </div>
        <div className="mb-4">
          <h6 className="text-light_mode_text dark:text-white font-semibold">
            {stage_title}
          </h6>
        </div>
        <div>
          <div ref={ref} className="flex flex-col gap-3 min-h-[50px]">
            {tasks.map((task, idx) => (
              <Draggable
                key={task.task_id}
                index={idx}
                draggableId={task.task_id}
              >
                {(provided) => (
                  <div
                    onClick={() => taskOnClickHandler(task)}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="border border-light_mode_text dark:border-white rounded-md px-2 md:px-4 py-2 max-h-[100px] break-all shadow-md"
                  >
                    {task.task_title}
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
          <div className="flex flex-col gap-2">
            <Input
              ref={taskInpRef}
              onKeyDown={(e) => {
                if (e.key === "Enter") addTaskHandler();
              }}
              label="Add task"
              placeholder=""
              color="border"
              variant="underlined"
            />
            <div className="flex gap-2">
              <Button onClick={addTaskHandler}>Add</Button>
              <Button onClick={() => (taskInpRef.current!.value = "")}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
