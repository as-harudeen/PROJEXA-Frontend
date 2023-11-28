import { noProfileImg } from "@/assets";
import { FC } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { TaskCard } from "./Task-Card";
import { TaskDetails } from "@hooks/project/team-project/useTeamUsersTasks";

interface TeamMemberTaskPlaceholderProps {
  user_name: string;
  user_profile?: string;
  user_id: string;
  tasks: TaskDetails[];
}
const TeamMemberTaskPlaceholder: FC<TeamMemberTaskPlaceholderProps> = ({
  user_name,
  user_id,
  user_profile,
  tasks,
}) => {

  return (
    <div className="min-w-[200px] md:w-[250px] bg-light_mode_secondary dark:bg-hash_one border-1 border-light_mode_text dark:border-white h-full max-h-[350px] overflow-y-scroll no-scrollbar px-6 py-4 rounded-lg">
      <div>
        <div className="flex justify-between items-center border-b-2 border-light_mode_text dark:border-white pb-4">
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
                          className="border-1 border-light_mode_text dark:border-white bg-light_mode_hard dark:bg-hash_two w-full ps-4 py-2 rounded-md break-all flex justify-between"
                        >
                          <TaskCard taskDetails={task} />
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


export default TeamMemberTaskPlaceholder;