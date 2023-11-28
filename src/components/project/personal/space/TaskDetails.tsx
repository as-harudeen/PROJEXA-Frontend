import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { FC, useRef, useState } from "react";
import { MdClose, MdEditNote } from "react-icons/md";
import { TaskDetailsInterface } from "@pages/Personal-Project/ProjectSpace";
import { ProjectStageInterface } from "@/interfaces/project/personal/space/stage.interface";
import { useQueryClient } from "@tanstack/react-query";
import { useFetch } from "@hooks/useFetch";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { toast } from "react-toastify";

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
      toast.error('Opps something went wrong');
    }
  };

  return (
    <div className="absolute w-full sm:w-[460px] md:w-[600px]  no-scrollbar bg-light_mode_primary dark:bg-dark_hash top-10 right-[50%] translate-x-[50%] px-12 py-6 z-20 font-poppins rounded-t-md">
      <div
        onClick={() => setTaskDetails(null)}
        className="absolute top-[-12px] right-[-12px]"
      >
        <MdClose size="32" />
      </div>
      {!onEditMode && (
        <div className="absolute right-3 top-3 flex items-center">
          <div className="cursor-pointer" onClick={() => setOnEditMode(true)}>
            <MdEditNote size="32" />
          </div>
          <div className="cursor-pointer">
            <DeleteConfirmModal
              title="Are you sure?"
              body="are you really want to delete the task?"
              confirmButtonHandler={taskDeleteHandler}
            />
          </div>
        </div>
      )}
      <div className="mb-2">
        {onEditMode ? (
          <Input
            ref={titleInpRef}
            color="hash"
            size="xl"
            placeholder="title"
            label="title"
            defaultValue={task_title}
          />
        ) : (
          <h1 className="md:text-xl text-lg ha font-semibold">{task_title}</h1>
        )}
      </div>
      <div>
        {onEditMode ? (
          <Textarea
            ref={descriptionRef}
            label="description"
            classNames={{
              label: ["dark:text-white", "text-light_mode_text"],
              inputWrapper: [
                "dark:bg-hash_one",
                "bg-light_mode_tertiary",
                "border-hash_one",
                "group-data-[focus=true]:bg-light_mode_secondary",
                "data-[hover=true]:bg-transperent",
                "dark:group-data-[focus=true]:bg-hash_one",
                "rounded-md",
              ],
              input: ["dark:text-white", "text-light_mode_text"],
            }}
            defaultValue={task_desc}
          ></Textarea>
        ) : (
          <>
            <p className="text-large ">{task_desc}</p>
          </>
        )}

        {onEditMode && (
          <div className="flex gap-2 mt-4">
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
