import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { patchRequest } from "@/helper/api.helper";
import { Textarea } from "@nextui-org/react";
import { FC, useRef, useState } from "react";
import { MdClose, MdEditNote } from "react-icons/md";
import { TaskDetailsInterface } from "@pages/Personal-Project/ProjectSpace";
import { ProjectStageInterface } from "@/interfaces/project/personal/space/stage.interface";
import { useQueryClient } from "@tanstack/react-query";

interface EditTaskRequestBodyInterface {
  task_title?: string;
  task_desc?: string;
}

interface TaskDetailsProps {
  stage_id: string;
  task_id: string;
  task_title: string;
  task_desc: string;
  setTaskDetails: React.Dispatch<
    React.SetStateAction<TaskDetailsInterface | null>
  >;
}

export const TaskDetails: FC<TaskDetailsProps> = ({
  stage_id,
  task_id,
  task_title,
  task_desc,
  setTaskDetails,
}) => {
  const queyrClient = useQueryClient();
  const [onEditMode, setOnEditMode] = useState(false);
  const titleInpRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

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
      ["project", "personal", "stages"],
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
  return (
    <div className="absolute w-[800px] h-full bg-dark_hash top-10 right-[50%] translate-x-[50%] px-12 py-6 z-20 font-poppins rounded-t-md">
      <div
        onClick={() => setTaskDetails(null)}
        className="absolute top-[-12px] right-[-12px]"
      >
        <MdClose size="32" />
      </div>
      {!onEditMode && (
        <div
          onClick={() => setOnEditMode(true)}
          className="absolute right-3 top-3"
        >
          <MdEditNote size="32" />
        </div>
      )}
      <div>
        {onEditMode ? (
          <Input
            ref={titleInpRef}
            color="secondary"
            classNames={{
              inputWrapper: [
                "bg-hash_one",
                "data-[hover=true]:bg-hash_two",
                "group-data-[focus=true]:bg-hash_two",
              ],
              innerWrapper: ["focus-within:bg-red-500"],
              input: ["text-white"],
            }}
            placeholder="title"
            label="title"
            defaultValue={task_title}
          />
        ) : (
          <h1 className="text-2xl ha font-semibold">{task_title}</h1>
        )}
      </div>
      <div>
        {onEditMode ? (
          <Textarea
            ref={descriptionRef}
            classNames={{
              inputWrapper: [
                "bg-hash_one",
                "data-[hover=true]:bg-hash_two",
                "group-data-[focus=true]:bg-hash_two",
              ],
              innerWrapper: ["focus-within:bg-red-500"],
            }}
            defaultValue={task_desc}
          ></Textarea>
        ) : (
          <>
            <h3 className="font-medium text-xl">Description</h3>
            <p className="text-large ">{task_desc}</p>
          </>
        )}

        {onEditMode && (
          <div className="flex gap-2">
            <Button onClick={() => setOnEditMode(false)} size="custom">
              cancel
            </Button>
            <Button onClick={saveButtonHandler}>save</Button>
          </div>
        )}
      </div>
    </div>
  );
};
