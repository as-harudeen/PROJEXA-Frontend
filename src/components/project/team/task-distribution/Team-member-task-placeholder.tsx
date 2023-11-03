import { noProfileImg, test_img } from "@/assets";
import { TaskInterface } from "@/interfaces/project/personal/space/stage.interface";
import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskCard } from "./Task-Card";

interface TeamMemberTaskPlaceholderProps {
  user_name: string;
  user_profile?: string;
  user_id: string;
  tasks: TaskInterface[];
}

export const TeamMemberTaskPlaceholder: FC<TeamMemberTaskPlaceholderProps> = ({
  user_name,
  user_id,
  user_profile,
  tasks,
}) => {
  return (
    <div className="w-[250px] border-1 h-full max-h-[350px] overflow-y-scroll no-scrollbar px-6 py-4 rounded-lg">
      <div>
        <div className="flex justify-between items-center border-b-2 pb-4">
          <h6 className="font-semibold text-lg">{user_name}</h6>
          <img
            className="w-[40px] h-[40px] object-cover rounded-full"
            src={
              user_profile
                ? `${import.meta.env.VITE_BASE_URL}/${user_profile}`
                : noProfileImg
            }
            alt="user profile"
          />
        </div>
        <Droppable droppableId={`userId-${user_id}`}>
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
                      {...provider.draggableProps}
                      {...provider.dragHandleProps}
                      ref={provider.innerRef}
                      className="border-1 w-full ps-4 py-2 rounded-md break-all flex justify-between"
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
      </div>
    </div>
  );
};
