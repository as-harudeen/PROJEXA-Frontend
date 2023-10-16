import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { ProjectStageInterface } from "interfaces/project/personal/space/stage.interface";
import React, { forwardRef, useRef } from "react";
import { postRequest } from "../../../../helper/api.helper";
import { API_POST_CREATE_STAGE_TASK } from "@/constants/api.url";
import { useParams } from "react-router-dom";

import { Draggable } from "react-beautiful-dnd";

type ProjectStageProps = {
  setParentState: React.Dispatch<React.SetStateAction<ProjectStageInterface[]>>;
  placeholder: React.ReactNode;
} & ProjectStageInterface;

export const ProjectStage = forwardRef<HTMLDivElement, ProjectStageProps>(
  (
    { stage_id, stage_title, tasks, setParentState, placeholder, ...props },
    ref
  ) => {
    const taskInpRef = useRef<HTMLInputElement>(null);
    const { project_id } = useParams();

    const addTaskHandler = async () => {
      const taskTitle = taskInpRef.current!.value;
      await postRequest(
        `${API_POST_CREATE_STAGE_TASK}/${project_id}/${stage_id}`,
        { task_title: taskTitle }
      );
      const newTask = {
        task_id: Date.now().toString(),
        task_title: taskTitle,
      };

      setParentState((prev) =>
        prev.map((stage) => {
          if (stage.stage_id === stage_id) {
            return { ...stage, tasks: [...stage.tasks, newTask] };
          }
          return stage;
        })
      );
      taskInpRef.current!.value = "";
    };
    return (
      <div {...props} className="border-2 border-white px-6 py-4 h-full w-[360px] rounded-md bg-hash_one bg-opacity-50">
        <div className="mb-4">
          <h6 className="text-white font-semibold">{stage_title}</h6>
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
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className="border-2 border-white rounded-md px-4 py-2 max-h-[100px] break-all overflow-auto"
                  >
                    {task.task_title}
                  </div>
                )}
              </Draggable>
            ))}
            {placeholder}
          </div>
          <Input
            ref={taskInpRef}
            label="Add task"
            placeholder=""
            color="border"
            variant="underlined"
          />
          <Button onClick={addTaskHandler}>Add</Button>
          <Button onClick={() => (taskInpRef.current!.value = "")}>
            Cancel
          </Button>
        </div>
      </div>
    );
  }
);

