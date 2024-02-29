import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Select, SelectItem } from "@nextui-org/react";

import {FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { TaskCard } from "./Task-Card";
import { TaskDetails } from "@hooks/project/team-project/useTeamUsersTasks";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { useTaskDistributionStage } from "@hooks/project/team-project/useTaskDistributionStage";

interface TaskDistributionStageProps {
  stage_id: string;
  stage_title: string;
  tasks: TaskDetails[];
}


export const TaskDistributionStage: FC<TaskDistributionStageProps> = ({
  stage_id,
  stage_title,
  tasks,
}) => {
  const { team_id, project_id } = useParams();

  const {
    taskState,
    addTaskButtonClickHandler,
    deleteStageHandler,
    taskPrioritySelectorChangeHandler,
    taskTimeCapChangeHandler,
    taskTitleInputChangeHandler,
  } = useTaskDistributionStage(team_id!, project_id!, stage_id);

  return (
    <div
      key={stage_id}
      className="relative max-h-[350px] h-full overflow-y-scroll no-scrollbar w-[300px] px-6 py-4 shadow-lg bg-light_mode_primary dark:bg-white/10 rounded-md border-1 border-light_mode_text"
    >
      <div className="absolute right-1">
        <DeleteConfirmModal
          title="Are you sure?"
          body="do really want to delete this stage? "
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
                      className={` ring-1 ring-white/80 dark:bg-white/20 backdrop-blur-md bg-light_mode_hard shadow-lg w-full ps-4 py-2 rounded-md break-all flex justify-between`}
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
              color="glass"
            />
          </div>
          <div className="text-black flex gap-2">
            <Select
              label="Priority"
              onChange={taskPrioritySelectorChangeHandler}
              selectedKeys={[taskState.task_priority]}
              size="sm"
              classNames={{
                label: ["font-[500]", "font-poppins", 'text-white'],
                trigger: ['bg-white/20', 'text-white']
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
              <SelectItem key="4" value="4">
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
              color="glass"
              classNames = {{
                mainWrapper: ["bg-white"]
              }}
              // onBlur={taskTimeCapOnBlurHandler}
              onChange={taskTimeCapChangeHandler}
              endContent={
                <div className="flex items-end h-full text-white">
                  <span>h</span>
                </div>
              }
            />
          </div>
        </div>
        <div>
          <Button color="glass" className="w-full" onClick={addTaskButtonClickHandler}>
            add new task
          </Button>
        </div>
      </div>
    </div>
  );
};
