import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { Textarea } from "@nextui-org/react";
import { FC } from "react";
import { MdClose, MdEditNote } from "react-icons/md";
import { TaskDetailsInterface } from "@pages/Personal-Project/ProjectSpace";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { useParams } from "react-router-dom";
import { useTaskDetails } from "@hooks/project/personal-project/useTaskDetails";

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
  const { project_id } = useParams();

  const {
    titleInpRef,
    descriptionRef,
    onEditMode,
    saveButtonHandler,
    taskDeleteHandler,
    setOnEditMode,
  } = useTaskDetails({
    project_id: project_id!,
    stage_id,
    task_id,
    task_title,
    task_desc,
    setTaskDetails,
  });

  return (
    <div className="absolute w-full sm:w-[460px] md:w-[600px] min-h-[50vh] no-scrollbar bg-light_mode_primary dark:bg-dark_hash/50 backdrop-blur-xl ring-1  top-10 right-[50%] translate-x-[50%] px-12 py-6 z-20 font-poppins rounded-t-md shadow-lg shadow-slate-600">
      <div
        onClick={() => setTaskDetails(null)}
        className="absolute top-[-8px] right-[-8px] cursor-pointer"
      >
        <div className="rounded-full bg-red-50/20 hover:bg-red-50/40">
          <MdClose size="22" />
        </div>
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
      {onEditMode && (
        <div className="pb-4">
          <h1>Edit task</h1>
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
