import { Input } from "@components/custom/Input";
import { TaskDistributionStage } from "@components/project/team/task-distribution/Task-distribution-stage";
import { useTeamTaskDistribution } from "@/hooks/project/team-project/useTeamTaskDistribution";

import { FC, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MdAddToPhotos } from "react-icons/md";
import { TeamMemberTaskPlaceholder } from "@components/project/team/task-distribution/Team-member-task-placeholder";
import { useTeamUsersTasks } from "@hooks/project/team-project/useTeamUsersTasks";

export const TaskDistributionCenter: FC = () => {
  const { team_id, project_id } = useParams();
  const stageNameInput = useRef<HTMLInputElement>(null);

  const {
    teamTaskDistributionQuery: { data: stages },
    addNewTaskDitributionStageMutation
  } = useTeamTaskDistribution({ team_id: team_id!, project_id: project_id! });


  const {
    teamUsersTasks: { data: users },
  } = useTeamUsersTasks({ team_id: team_id!, project_id: project_id! });

  const addStageOnClickHandler = () => {
    const stageName = stageNameInput.current!.value;
    if (!stageName) {
      toast.error("Stage name cant be empty");
      return;
    }

    addNewTaskDitributionStageMutation.mutate(stageName);
  };


  return (
    <div className="px-16 py-8 text-white font-poppins">
      <div className="mb-4">
        <h3 className="font-semibold text-2xl">Task Distribution Center</h3>
      </div>
      <div className="flex flex-col gap-6 bg-hash_one rounded-lg p-8">
        <div>
          <div>
            <div className="flex justify-between">
              <h4 className="font-medium text-xl mb-2">Project Name</h4>
              <h3 className="font-semibold">Pending</h3>
            </div>
            <span className="text-large">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit quam
              voluptatum facere natus iste magni modi praesentium sint minima!
              Nulla ipsa molestias alias? Fuga atque cum, necessitatibus totam
              quaerat quis.
            </span>
          </div>
        </div>

          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-xl font-semibold">Tasks Board</h3>
            </div>
            <div className="flex gap-3 px-8 py-12 bg-hash_two rounded-md overflow-x-scroll no-scrollbar">
              <div className="flex gap-5 h-full">
                {stages?.map((stage) => (
                  <TaskDistributionStage
                    key={stage.task_distribution_board_stage_id}
                    stage_id={stage.task_distribution_board_stage_id}
                    stage_title={stage.task_distribution_board_stage_title}
                    tasks={stage.tasks}
                  />
                ))}
              <div className="relative h-full  max-w-[300px]">
                <Input
                  ref={stageNameInput}
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
                  onClick={addStageOnClickHandler}
                  size="22"
                  className="absolute right-3 top-[50%] translate-y-[-50%]"
                />
              </div>
              </div>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <h3 className="font-semibold text-xl">Team members</h3>
            </div>
            <div className="flex gap-4 px-8 py-12 h-full overflow-x-scroll no-scrollbar bg-hash_two">
              {users?.map((user) => (
                <TeamMemberTaskPlaceholder
                  key={user.user_id}
                  user_id={user.user_id}
                  user_name={user.user_name}
                  user_profile={user.user_profile}
                  tasks={user.tasks}
                />
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};
