import { FC, Suspense, lazy, useRef } from "react";
import { Input } from "@components/custom/Input";
import { TaskDistributionStage } from "@components/project/team/task-distribution/Task-distribution-stage";
const TeamMemberTaskPlaceholder = lazy(
  () =>
    import(
      "@components/project/team/task-distribution/Team-member-task-placeholder"
    )
);
// import { TeamMemberTaskPlaceholder } from "@components/project/team/task-distribution/Team-member-task-placeholder";
import { useTeamTaskDistribution } from "@hooks/project/team-project/useTeamTaskDistribution";
import {
  DnDOperation,
  determineDnDOperation,
} from "@/utils/task-distribution/projectBoardDnD";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useTeamUsersTasks } from "@hooks/project/team-project/useTeamUsersTasks";
import { MdAddToPhotos } from "react-icons/md";
import { useTeamProjectDetails } from "@hooks/project/team-project/useTeamProjectDetails";
import { useFetch } from "@hooks/useFetch";
import { Loading } from "@components/project/Loading";

export const TaskDistributionCenter: FC = () => {
  const { team_id, project_id } = useParams();
  const stageNameInput = useRef<HTMLInputElement>(null);
  const { patchRequest } = useFetch();

  const {
    teamProjectDetailsQuery: { data: project, isLoading },
  } = useTeamProjectDetails(team_id!, project_id!);

  const {
    teamTaskDistributionQuery: { data: stages },
    addNewTaskDitributionStageMutation,
    changeTaskStageMutation,
    deleteTaskFromStageMutation,
    relocateTaskMutation,
  } = useTeamTaskDistribution({ team_id: team_id!, project_id: project_id! });

  const {
    teamUsersTasks: { data: users },
    addNewTask,
    deleteTaskFromUserMutation,
    repositionTaskMutation,
  } = useTeamUsersTasks({ team_id: team_id!, project_id: project_id! });

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

      await patchRequest(`team/task-distribution/task/${task_id}/assign`, {
        user_id,
      });
    } else if (operationType === DnDOperation.UserToStage) {
      // user to stage handler

      const user_id = source.droppableId.split("-")[1];
      const stage_id = destination.droppableId.split("-")[1];

      const currentUser = users?.find((user) => user.user_id === user_id);
      if (!currentUser) {
        console.log("Could not find user");
        return;
      }

      const currentTask = currentUser.tasks.find(
        (task) => task.task_id === task_id
      );
      if (!currentTask) {
        console.log("Could not find task");
        return;
      }

      deleteTaskFromUserMutation.mutate({ user_id, task_id });
      relocateTaskMutation.mutate({ stage_id, task_details: currentTask });

      await patchRequest(
        `team/task-distribution/user/${user_id}/relocate/task/${task_id}`,
        { stage_id }
      );
    } else if (operationType === DnDOperation.UserToUser) {
      // user to user
      repositionTaskMutation.mutate({
        task_id,
        user_id: source.droppableId,
        new_user_id: destination.droppableId,
      });
    }
  };
  if (isLoading) return <Loading />;
  return (
    <div className="px-16 py-8 text-light_mode_text  dark:text-white font-poppins">
      <div className="md:mb-6 mb-4">
        <h3 className="font-semibold my-6 sm:my-0 text-xl sm:text-2xl">
          Task Distribution Center
        </h3>
      </div>
      <div className="flex flex-col gap-6 bg-light_mode_secondary dark:bg-white/10  ring-1 ring-white/30 rounded-lg p-8">
        <div>
          <div className="md:min-h-[400px] sm:min-h-[200px]">
            <div className="flex justify-between">
              <h4 className="font-medium text-lg sm:text-xl md:text-2xl mb-2">
                {project?.project_name}
              </h4>
              <h3 className="font-semibold">{project?.project_status}</h3>
            </div>
            <span className="text-medium md:text-large">
              {project?.project_desc}
            </span>
          </div>
        </div>

        <DragDropContext onDragEnd={(result) => dragEndHandler(result)}>
          <div className="flex flex-col gap-3">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">Tasks Board</h3>
            </div>
            <div className="flex gap-3 px-8 py-12 shadow-lg bg-light_mode_hard dark:bg-dark_hash rounded-md overflow-x-scroll no-scrollbar">
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
                    onKeyUp={(e) => {
                      if (e.key === "Enter") addStageOnClickHandler();
                    }}
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
            <div className="flex gap-4 px-8 py-12 h-full overflow-x-scroll no-scrollbar bg-light_mode_hard shadow-lg dark:bg-hash_two">
              <Suspense fallback={<div>loading</div>}>
                {users?.map((user) => (
                  <TeamMemberTaskPlaceholder
                    key={user.user_id}
                    user_id={user.user_id}
                    user_name={user.user_name}
                    user_profile={user.user_profile}
                    tasks={user.tasks}
                  />
                ))}
              </Suspense>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
