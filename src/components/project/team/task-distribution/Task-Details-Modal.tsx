import { useTeamTaskDistribution } from "@hooks/project/team-project/useTeamTaskDistribution";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from "@nextui-org/react";
import { ChangeEvent, FC, useRef, useState } from "react";
import { PRIORITY_LEVEL_COLORS } from "./Task-Card";
import { Input } from "@components/custom/Input";
import { useParams } from "react-router-dom";
import { TaskDetails } from "@hooks/project/team-project/useTeamUsersTasks";
import moment from "moment";
import { useFetch } from "@hooks/useFetch";
import { DeleteConfirmModal } from "@components/project/DeleteConfirmModal";
import { toast } from "react-toastify";
import { Button } from "@components/custom/Button";

interface TaskDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskDetails: Omit<TaskDetails, "task_status">;
  stage_id?: string;
}

export interface EditedTaskDetails {
  task_title?: string;
  task_desc?: string;
  task_priority?: string;
  task_time_cap?: string;
}

export const TaskDetailsModal: FC<TaskDetailsModalProps> = ({
  isOpen,
  onClose,
  taskDetails,
  stage_id,
}) => {
  const {
    task_id,
    task_title,
    task_desc,
    task_priority,
    task_time_cap,
    task_comments,
  } = taskDetails;

  const { postRequest, deleteRequest } = useFetch();
  const { project_id, team_id } = useParams();
  const { updateTaskMutation, deleteTaskFromStageMutation } =
    useTeamTaskDistribution({
      project_id: project_id!,
      team_id: team_id!,
    });
  const [onEditMode, setOnEditMode] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const [editedTaskState, setEditedTaskState] = useState({
    task_title,
    task_desc,
    task_priority: task_priority.toString(),
    task_time_cap,
  });

  const editTaskOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;
    setEditedTaskState((prev) => ({ ...prev, [name]: value }));
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
      setEditedTaskState((prev) => ({
        ...prev,
        task_priority: selectedPriority,
      }));
  };

  const cancelEditButtonClickHandler = () => {
    setEditedTaskState({
      task_title,
      task_desc,
      task_priority: task_priority.toString(),
      task_time_cap,
    });

    setOnEditMode(false);
  };

  const onSaveHandler = async () => {
    const editedTaskDetails: EditedTaskDetails = {};

    const {
      task_priority: edited_task_priority,
      task_time_cap: edited_task_time_cap,
    } = editedTaskState;

    const edited_task_title = editedTaskState.task_title.trim();
    const edited_task_desc = editedTaskState.task_desc.trim();

    if (task_title !== edited_task_title) {
      editedTaskDetails.task_title = edited_task_title;
    }
    if (task_desc !== edited_task_desc) {
      editedTaskDetails.task_desc = edited_task_desc;
    }
    if (
      task_priority !== +edited_task_priority &&
      !isNaN(+edited_task_priority)
    ) {
      editedTaskDetails.task_priority = edited_task_priority;
    }
    if (edited_task_time_cap && task_time_cap !== edited_task_time_cap) {
      editedTaskDetails.task_time_cap = edited_task_time_cap;
    }

    if (Object.keys(editedTaskDetails).length === 0) {
      setOnEditMode(false);
      return;
    }

    if (stage_id)
      updateTaskMutation.mutate({
        stage_id,
        task_id,
        updated_task_details: editedTaskDetails,
      });
    setOnEditMode(false);
  };

  const timeCapInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (!value || !isNaN(+value)) {
      setEditedTaskState((prev) => ({ ...prev, task_time_cap: value }));
    }
  };

  const commentSendHandler = async () => {
    const comment_text = commentInputRef.current!.value;
    const res = await postRequest(`team-task/${task_id}/comment`, {
      comment_text,
    });
    console.log(task_comments);
    task_comments.push(await res.json());
    console.log(task_comments);
    commentInputRef.current!.value = "";
  };

  const taskDeleteHandler = async () => {
    if (stage_id) {
      const res = await deleteRequest(`team/task/${task_id}`);
      if (res.ok) {
        deleteTaskFromStageMutation.mutate({ stage_id, task_id });
      } else {
        toast.error('OOPS something wrong');
      }
    }
  };

  return (
    <Modal
      className="dark:bg-white/10  ring-1 ring-white/50 bg-light_mode_hard text-light_mode_text dark:text-white"
      size="2xl"
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">
            <h4>{task_title}</h4>
            <div className="relative flex gap-3 items-center">
              <span className="text-sm">Priority level : {task_priority}</span>
              <span className="text-sm">Time Cap : {task_time_cap}h</span>
              <div
                className={`bg-[${
                  PRIORITY_LEVEL_COLORS[task_priority - 1]
                }] rounded-md w-[15px] h-[25px]`}
              ></div>

              {stage_id && (
                <div className="absolute right-1">
                  <DeleteConfirmModal
                    title="Are you sure?"
                    body="Are you really want to delete this task?"
                    confirmButtonHandler={taskDeleteHandler}
                  />
                </div>
              )}
            </div>
          </ModalHeader>
          <ModalBody>
            <p>{task_desc}</p>
            {stage_id && (
              <>
                {!onEditMode ? (
                  <div className="flex justify-end">
                    <Button size="sm"  onClick={() => setOnEditMode(true)} color="glass">
                      Edit
                    </Button>
                  </div>
                ) : (
                  <div className="py-10 flex flex-col gap-2">
                    <Input
                      size="lg"
                      label="Task Title"
                      labelPlacement="outside"
                      name="task_title"
                      color="glass"
                      value={editedTaskState.task_title}
                      onChange={editTaskOnChangeHandler}
                      
                    />

                    <div className="flex gap-2">
                      <Select
                        className="text-black"
                        label="Priority"
                        onChange={taskPrioritySelectorChangeHandler}
                        selectedKeys={[editedTaskState.task_priority]}
                        size="sm"
                        classNames={{
                          label: ["font-[500]", "font-poppins"],
                          trigger: ["bg-white/20", "text-white/80"]
                        }}
                      >
                        <SelectItem key="1" value="1">
                          {"1"}
                        </SelectItem>
                        <SelectItem key="2" value="2">
                          {"2"}
                        </SelectItem>
                        <SelectItem key="3" value="3">
                          {"3"}
                        </SelectItem>
                        <SelectItem key="4" value="4">
                          {"4"}
                        </SelectItem>
                        <SelectItem key="5" value="5">
                          {"5"}
                        </SelectItem>
                      </Select>
                      <Input
                        type="number"
                        size="sm"
                        label="Time Cap ( in hour )"
                        color="glass"
                        value={editedTaskState.task_time_cap}
                        onChange={timeCapInputChangeHandler}
                      />
                    </div>

                    <Textarea
                      label="task description"
                      labelPlacement="outside"
                      onChange={editTaskOnChangeHandler}
                      name="task_desc"
                      classNames={{
                        label: ["dark:text-white", "text-light_mode_text"],
                        inputWrapper: [
                          "dark:bg-white/10",
                          "bg-light_mode_secondary",
                          "dark:data-[hover=true]:bg-hash_two",
                          "data-[hover=true]:bg-light_mode_tertiary",
                          "dark:group-data-[focus=true]:bg-hash_two",
                          "group-data-[focus=true]:bg-light_mode_tertiary",
                        ],
                        innerWrapper: ["focus-within:bg-red-500"],
                        input: ["text-medium", "font-poppins"],
                      }}
                      value={editedTaskState.task_desc}
                    ></Textarea>
                    <div className="flex gap-2">
                      <Button
                        onClick={cancelEditButtonClickHandler}
                        variant="solid"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={onSaveHandler}
                        className="flex-1"
                        color="glass"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            {!stage_id && (
              <div className="border font-poppins rounded-lg border-white w-full px-6 py-4 flex flex-col gap-2">
                <div className="mb-3">
                  <h6 className="text-medium font-semibold">comments</h6>
                </div>
                <div className="flex flex-col gap-2">
                  {task_comments?.map((comment) => (
                    <div className="bg-hash_two p-3 rounded-md">
                      <div className="flex justify-between border-b border-b-light_hash pb-1 mb-2">
                        <span className="text-sm font-medium">
                          {comment.commented_by.user_name}
                        </span>
                        <span className="text-tiny text-gray-300">
                          {moment(comment.commented_at).format("hh.mm A  ")}
                          {moment(comment.commented_at).format("DD-MM-YY")}
                        </span>
                      </div>
                      <span className="text-sm ">
                        {comment.task_comment_text}
                      </span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-2 ">
                    <Input ref={commentInputRef} />
                    <Button onClick={commentSendHandler}>Send</Button>
                  </div>
                </div>
              </div>
            )}
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
};
