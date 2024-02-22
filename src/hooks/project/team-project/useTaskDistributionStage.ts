import { useFetch } from "@hooks/useFetch";
import { useTeamTaskDistribution } from "./useTeamTaskDistribution";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface TaskStateInterface {
  task_title: string;
  task_priority: "1" | "2" | "3" | "4" | "5";
  task_time_cap: string;
}

export const useTaskDistributionStage = (
  team_id: string,
  project_id: string,
  stage_id: string
) => {
  const { deleteRequest } = useFetch();

  const [taskState, setTaskState] = useState<TaskStateInterface>({
    task_title: "",
    task_priority: "5",
    task_time_cap: "2",
  });

  const { addNewTaskDistributionStageTask, deleteStage } =
    useTeamTaskDistribution({
      team_id,
      project_id,
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

  const deleteStageHandler = async () => {
    const res = await deleteRequest(`team/task-distribution/stage/${stage_id}`);
    if (res.ok) {
      deleteStage.mutate({ stage_id });
    } else {
      toast.error("OPPS Something went wrong");
    }
  };

  return {
    taskState,
    taskTitleInputChangeHandler,
    taskPrioritySelectorChangeHandler,
    addTaskButtonClickHandler,
    taskTimeCapChangeHandler,
    deleteStageHandler,
  };
};
