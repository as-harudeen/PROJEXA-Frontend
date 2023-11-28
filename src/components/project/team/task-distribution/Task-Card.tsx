import React, { FC, useState } from "react";
import { TaskDetailsModal } from "./Task-Details-Modal";
import { TaskDetails } from "@hooks/project/team-project/useTeamUsersTasks";

interface TaskCardProps {
  taskDetails: TaskDetails;
  stage_id?: string;
}

export const PRIORITY_LEVEL_COLORS = [
  "bg-[#ff0000]",
  "bg-[#ff5e00]",
  "bg-[#ffd500]",
  "bg-[#13bd00]",
  "bg-[#0048ff]",
];

export const TaskCard: FC<TaskCardProps> = ({ taskDetails, stage_id }) => {
  const { task_title, task_priority, task_status } = taskDetails;
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };



  return (
    <React.Fragment>
      <div onClick={onOpen} className="flex-1">

        <h6>{task_title}</h6>
        {
          task_status && (

            <div>
          <h5 className="font-semibold font-nunito mt-2 text-xs bg-white text-black px-2 py-1 rounded-sm">
            {task_status}
          </h5>
        </div>
          )
        }
      </div>
      <div
        className={`h-[25px] w-[10px] rounded-sm ${
          PRIORITY_LEVEL_COLORS[task_priority - 1]
        }`}
      ></div>
      <TaskDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        taskDetails={taskDetails}
        stage_id={stage_id}
      />
    </React.Fragment>
  );
};
