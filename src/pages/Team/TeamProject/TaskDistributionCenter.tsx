import { Input } from "@components/custom/Input";
import { TaskDistributionStage } from "@components/project/team/task-distribution/Task-distribution-stage";
import { TeamMemberTaskPlaceholder } from "@components/project/team/task-distribution/Team-member-task-placeholder";
import { useTeamTaskDistribution } from "@hooks/project/team-project/useTeamTaskDistribution";
import {
  DnDOperation,
  determineDnDOperation,
} from "@/utils/task-distribution/projectBoardDnD";
import { FC, useRef } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTeamUsersTasks } from "@hooks/project/team-project/useTeamUsersTasks";
import { patchRequest } from "@/helper/api.helper";
import { MdAddToPhotos } from "react-icons/md";


export const TaskDistributionCenter: FC = () => {
  const { team_id, project_id } = useParams();
  const stageNameInput = useRef<HTMLInputElement>(null);

  const {
    teamTaskDistributionQuery: { data: stages },
    addNewTaskDitributionStageMutation,
    changeTaskStageMutation,
    deleteTaskFromStageMutation,
  } = useTeamTaskDistribution({ team_id: team_id!, project_id: project_id! });

  const {
    teamUsersTasks: { data: users },
    addNewTask,
  } = useTeamUsersTasks({ team_id: team_id!, project_id: project_id! });
  console.log(users);
  const addStageOnClickHandler = () => {
    const stageName = stageNameInput.current!.value;
    if (!stageName) {
      toast.error("Stage name cant be empty");
      return;
    }

    addNewTaskDitributionStageMutation.mutate(stageName);
  };

  const dragEndHandler = async (result: DropResult) => {
    const { source, destination, draggableId: task_id } = result;
    if (!destination?.droppableId) {
      console.log("could not find valid destination");
      return;
    }
    if (source.droppableId === destination.droppableId) {
      console.log("no changes");
      return;
    }
    console.log(destination.droppableId, source.droppableId);
    const operationType = determineDnDOperation(
      source.droppableId,
      destination.droppableId
      );
      
    if (operationType === DnDOperation.StageToStage) {
      ///stage to stage handler
      changeTaskStageMutation.mutate({
        new_stage_id: destination.droppableId,
        stage_id: source.droppableId,
        task_id,
      });
    } else if (operationType === DnDOperation.StageToUser) {
      /// stage to user operation
      const user_id = destination.droppableId.split("-")[1];
      const stage_id = source.droppableId.split("-")[1];

      const currentStage = stages?.find(
        (stage) => stage.task_distribution_board_stage_id === stage_id
      );
      if (!currentStage) {
        console.log("Could not find stage");
        return;
      }
      const currentTask = currentStage.tasks.find(
        (task) => task.task_id === task_id
      );
      if (!currentTask) {
        console.log("could not find task");
        return;
      }

      deleteTaskFromStageMutation.mutate({ stage_id, task_id });
      addNewTask.mutate({ task_details: currentTask, user_id });

      await patchRequest(
        `team/${team_id}/project/${project_id}/task-distribution/task/${task_id}/assign`,
        { user_id }
      );

    } else if (operationType === DnDOperation.UserToStage) {
      // user to stage handler


    } else if (operationType === DnDOperation.UserToUser) {
      // user to user

    }
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

        <DragDropContext onDragEnd={(result) => dragEndHandler(result)}>
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
        </DragDropContext>
      </div>
    </div>
  );
};
