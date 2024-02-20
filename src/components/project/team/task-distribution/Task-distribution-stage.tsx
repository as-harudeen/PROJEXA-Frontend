import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { useTeamTaskDistribution } from "@/hooks/project/team-project/useTeamTaskDistribution";
import { Select, SelectItem } from "@nextui-org/react";

import { ChangeEvent, FC, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { TaskCard } from "./Task-Card";
import { TaskDetails } from "@hooks/project/team-project/useTeamUsersTasks";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { useFetch } from "@hooks/useFetch";
import { toast } from "react-toastify";

interface TaskDistributionStageProps {
  stage_id: string;
  stage_title: string;
  tasks: TaskDetails[];
}

interface TaskStateInterface {
  task_title: string;
  task_priority: "1" | "2" | "3" | "4" | "5";
  task_time_cap: string;
}

export const TaskDistributionStage: FC<TaskDistributionStageProps> = ({
  stage_id,
  stage_title,
  tasks,
}) => {
  const [taskState, setTaskState] = useState<TaskStateInterface>({
    task_title: "",
    task_priority: "5",
    task_time_cap: "2",
  });

  const { team_id, project_id } = useParams();
  const { deleteRequest } = useFetch();

  const { addNewTaskDistributionStageTask, deleteStage } =
    useTeamTaskDistribution({
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
      task_time_cap: taskState.task_time_cap,
    });
    setTaskState((prev) => ({ ...prev, task_title: "" }));
  };

  const taskTimeCapChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value || !isNaN(+value)) {
      setTaskState((prev) => ({ ...prev, task_time_cap: value }));
    }
  };

  // const taskTimeCapOnBlurHandler = (
  //   e: React.FocusEvent<HTMLInputElement, Element>
  // ) => {
  //   const value = e.currentTarget.value;
  //   console.log(value);
  //   if (value === "") {
  //     setTaskState((prev) => ({ ...prev, task_time_cap: "2" }));
  //   }
  // };

  const deleteStageHandler = async () => {
    const res = await deleteRequest(`team/task-distribution/stage/${stage_id}`);
    if (res.ok) {
      deleteStage.mutate({ stage_id });
    } else {
      toast.error("OPPS Something went wrong");
    }
  };

  return (
    <div
      key={stage_id}
      className="relative max-h-[350px] h-full overflow-y-scroll no-scrollbar w-[300px] px-6 py-4 shadow-lg bg-light_mode_primary dark:bg-hash_one rounded-md border-1 border-light_mode_text"
    >
      <div className="absolute right-1">
        <DeleteConfirmModal
          title="Are you sure?"
          body="All tasks of this stage will also will be deleted!. 
            are you really want delete the stage? "
          confirmButtonHandler={deleteStageHandler}
        />
      </div>
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
                      className={`border-1 border-light_mode_text dark:border-white dark:bg-hash_two bg-light_mode_hard shadow-lg w-full ps-4 py-2 rounded-md break-all flex justify-between`}
                    >
                      <TaskCard stage_id={stage_id} taskDetails={task} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provider.placeholder}
            </div>
          )}
        </Droppable>
        {taskState.task_title && (
          <div className="border-1 border-light_mode_text dark:border-white w-full px-4 py-2 rounded-md break-all">
            <h6>{taskState.task_title}</h6>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 mt-10">
        <div className="flex flex-col gap-2">
          <div className="flex-1">
            <Input
              value={taskState.task_title}
              onChange={taskTitleInputChangeHandler}
              onKeyUp={(e) => {
                if (e.key === "Enter") addTaskButtonClickHandler();
              }}
              size="sm"
              label="new task"
              color="border"
              classNames={{
                inputWrapper: [
                  "dark:bg-opacity-30",
                  "dark:bg-light_hash",
                  "group-data-[focus=true]:bg-opacity-20",
                  "group-data-[hover=true]:bg-opacity-30",
                  "pe-14",
                ],
                label: ["font-[500]", "font-poppins"],
              }}
            />
          </div>
          <div className="text-black flex gap-2">
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

            <Input
              type="number"
              size="sm"
              label="Time Cap"
              value={taskState.task_time_cap}
              // onBlur={taskTimeCapOnBlurHandler}
              onChange={taskTimeCapChangeHandler}
              endContent={
                <div className="flex items-end h-full">
                  <span>h</span>
                </div>
              }
            />
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
