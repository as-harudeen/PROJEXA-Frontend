import { API_POST_CREATE_STAGE_TASK } from "@/constants/api.url";
import { useFetch } from "@hooks/useFetch";
import { ProjectStageInterface } from "@/interfaces/project/personal/space/stage.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export const usePersonalProjectStage = (
  project_id: string,
  stage_id: string
) => {
  const QUERY_KEY = ["project", "personal", "stages", project_id];
  const queryClient = useQueryClient();
  const taskInpRef = useRef<HTMLInputElement>(null);

  const { postRequest, deleteRequest } = useFetch();

  const addTaskHandler = async () => {
    const taskTitle = taskInpRef.current!.value;
    taskInpRef.current!.value = "";
    const temp_task_id = Date.now().toString();
    const newTask = {
      task_id: temp_task_id,
      task_title: taskTitle,
      task_desc: "",
    };
    queryClient.setQueryData(
      QUERY_KEY,
      (prev: ProjectStageInterface[]) =>
        prev.map((stage) => {
          if (stage.stage_id === stage_id) {
            return { ...stage, tasks: [...stage.tasks, newTask] };
          }
          return stage;
        })
    );
    const res = await postRequest(
      `${API_POST_CREATE_STAGE_TASK}/${project_id}/${stage_id}`,
      { task_title: taskTitle }
    );
    //todo change the response type to another folder
    const task_id = ((await res.json()) as { task_id: string }).task_id;

    queryClient.setQueryData(
      QUERY_KEY,
      (prev: ProjectStageInterface[]) =>
        prev.map((stage) => {
          if (stage.stage_id === stage_id) {
            return {
              ...stage,
              tasks: stage.tasks.map((task) => {
                if (task.task_id === temp_task_id) {
                  task.task_id = task_id;
                }
                return task;
              }),
            };
          }
          return stage;
        })
    );
  };


  const deleteStageHandler = async () => {
    const res = await deleteRequest(`project-stage/${stage_id}`);
    if (res.ok) {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: ProjectStageInterface[]) =>
          prev.filter((stage) => stage.stage_id !== stage_id)
      );
    }
  };


  return {addTaskHandler, deleteStageHandler, taskInpRef};
};
