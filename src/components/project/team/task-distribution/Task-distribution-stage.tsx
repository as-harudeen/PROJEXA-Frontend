import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import {
  TeamTaskInterface,
  useTeamTaskDistribution,
} from "@hooks/team/useTeamTaskDistribution";
import { Select, SelectItem } from "@nextui-org/react";

import { ChangeEvent, FC, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { TaskCard } from "./Task-Card";

interface TaskDistributionStageProps {
  stage_id: string;
  stage_title: string;
  tasks: TeamTaskInterface[];
}

interface TaskStateInterface {
  task_id: string;
  task_title: string;
  task_priority: "1" | "2" | "3" | "4" | "5";
}

export const TaskDistributionStage: FC<TaskDistributionStageProps> = ({
  stage_id,
  stage_title,
  tasks,
}) => {
  const [taskState, setTaskState] = useState<TaskStateInterface>({
    task_id: "temp_task_id",
    task_title: "",
    task_priority: "5",
  });

  const { team_id, project_id } = useParams();

  const { addNewTaskDistributionStageTask } = useTeamTaskDistribution({
    team_id: team_id!,
    project_id: project_id!,
  });

  const taskTitleInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTaskState((prev) => ({ ...prev, task_title: value }));
  };

  const taskPrioritySelectorChangeHandler = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedPriority = e.target.value;
    if (
      selectedPriority == "1" ||
      selectedPriority == "2" ||
      selectedPriority == "3" ||
      selectedPriority == "4" ||
      selectedPriority == "5"
    )
      setTaskState((prev) => ({ ...prev, task_priority: selectedPriority }));
  };

  const addTaskButtonClickHandler = () => {
    addNewTaskDistributionStageTask.mutate({
      stage_id,
      task_title: taskState.task_title,
      task_priority: taskState.task_priority,
    });
    setTaskState({
      task_id: "temp_task_id",
      task_title: "",
      task_priority: "5",
    });
  };

  return (
    <div
      key={stage_id}
      className="max-h-[350px] h-full overflow-y-scroll no-scrollbar w-[300px] px-6 py-4 bg-hash_one rounded-md border-1"
    >
      <div>
        <h4 className="font-normal text-large">{stage_title}</h4>
      </div>
      <div>
        <Droppable droppableId={`stageId-${stage_id}`}>
          {(provider) => (
            <div
              className="flex flex-col py-6 gap-3"
              {...provider.droppableProps}
              ref={provider.innerRef}
            >
              {tasks.map((task, idx) => (
                <Draggable
                  key={task.task_id}
                  index={idx}
                  draggableId={task.task_id}
                >
                  {(provider) => (
                    <div
                      {...provider.dragHandleProps}
                      {...provider.draggableProps}
                      ref={provider.innerRef}
                      key={task.task_id}
                      className={`border-1 w-full ps-4 py-2 rounded-md break-all flex justify-between`}
                    >
                      <TaskCard
                        task_title={task.task_title}
                        task_priority={+task.task_priority}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
        {taskState.task_title && (
          <div className="border-1 w-full px-4 py-2 rounded-md break-all">
            <h6>{taskState.task_title}</h6>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <div className="flex-1">
            <Input
              value={taskState.task_title}
              onChange={taskTitleInputChangeHandler}
              size="sm"
              label="new task"
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
          </div>
          <div className="text-black">
            <Select
              label="Priority"
              onChange={taskPrioritySelectorChangeHandler}
              selectedKeys={[taskState.task_priority]}
              size="sm"
              classNames={{
                label: ["font-[500]", "font-poppins"],
              }}
            >
              <SelectItem key="1" value="1">
                {"1"}
              </SelectItem>
              <SelectItem key="2" value="2">
                {"2"}
              </SelectItem>
              <SelectItem key="3" value="3">
                {"3"}
              </SelectItem>
              <SelectItem key="3" value="3">
                {"4"}
              </SelectItem>
              <SelectItem key="5" value="5">
                {"5"}
              </SelectItem>
            </Select>
          </div>
        </div>
        <div>
          <Button className="w-full" onClick={addTaskButtonClickHandler}>
            add new task
          </Button>
        </div>
      </div>
    </div>
  );
};
