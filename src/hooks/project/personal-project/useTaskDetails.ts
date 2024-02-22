import { useFetch } from "@hooks/useFetch";
import {
  EditTaskRequestBodyInterface,
  ProjectStageInterface,
} from "@/interfaces/project/personal/space/stage.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import { TaskDetailsInterface } from "@pages/Personal-Project/ProjectSpace";

interface IuseTaskDetailsParam {
  project_id: string;
  stage_id: string;
  task_id: string;
  task_title: string;
  task_desc: string;
  setTaskDetails: React.Dispatch<
    React.SetStateAction<TaskDetailsInterface | null>
  >;
}

export const useTaskDetails = ({
  project_id,
  stage_id,
  task_id,
  task_title,
  task_desc,
  setTaskDetails,
}: IuseTaskDetailsParam) => {

  const titleInpRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const [onEditMode, setOnEditMode] = useState(false);

  const queyrClient = useQueryClient();

  const { patchRequest, deleteRequest } = useFetch();

  const saveButtonHandler = async () => {
    const taskTitle = titleInpRef.current!.value.trim();
    if (!taskTitle) {
      console.log("Task title can't be empty");
      return;
    }
    const updatedData: EditTaskRequestBodyInterface = {};

    const taskDescription = descriptionRef.current!.value.trim();

    if (taskTitle !== task_title) {
      updatedData.task_title = taskTitle;
    }
    if (taskDescription !== task_desc) {
      updatedData.task_desc = taskDescription;
    }

    if (!Object.keys(updatedData).length) return;
    await patchRequest(`task/edit/${stage_id}/${task_id}`, updatedData);

    setTaskDetails((prev) => {
      if (prev !== null) {
        return { ...prev, ...updatedData };
      }
      return prev;
    });

    queyrClient.setQueryData(
      ["project", "personal", "stages", project_id],
      (prev: ProjectStageInterface[]) =>
        prev.map((stage) => {
          if (stage.stage_id === stage_id) {
            return {
              ...stage,
              tasks: stage.tasks.map((task) => {
                if (task.task_id === task_id) {
                  return { ...task, ...updatedData };
                }
                return task;
              }),
            };
          }
          return stage;
        })
    );
    setOnEditMode(false);
  };

  const taskDeleteHandler = async () => {
    const res = await deleteRequest(`task/${task_id}`);

    if (res.ok) {
      queyrClient.setQueryData(
        ["project", "personal", "stages"],
        (prev: ProjectStageInterface[]) =>
          prev.map((stage) => {
            if (stage.stage_id === stage_id) {
              return {
                ...stage,
                tasks: stage.tasks.filter((task) => task.task_id !== task_id),
              };
            }
            return stage;
          })
      );
    } else {
      toast.error("Opps something went wrong");
    }
  };

  return {
    onEditMode,
    titleInpRef,
    descriptionRef,
    saveButtonHandler,
    taskDeleteHandler,
    setOnEditMode
  };
};
