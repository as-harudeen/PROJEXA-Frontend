import { ProjectStatusEnum } from "@/interfaces/project";
import { Button } from "@components/custom/Button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { UseMutationResult } from "@tanstack/react-query";
import { FC, useState } from "react";
import { MdModeEdit } from "react-icons/md";

interface UpdateProjectStatusModalProps {
  project_id: string;
  curr_status: ProjectStatusEnum;
  updateStatusMutation: UseMutationResult<
    string,
    Error,
    {
      project_id: string;
      new_project_status: string;
    },
    unknown
  >;
}

export const UpdateProjectStatusModal: FC<UpdateProjectStatusModalProps> = ({
  curr_status,
  updateStatusMutation,
  project_id,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updatedStatus, setUpdatedStatus] =
    useState<ProjectStatusEnum>(curr_status);

  const cancelButtonClickHandler = (onClose: () => void) => {
    setUpdatedStatus(curr_status);
    onClose();
  };

  const saveButtonClickHandler = (onClose: () => void) => {
    updateStatusMutation.mutate({
      project_id,
      new_project_status: updatedStatus,
    });

    onClose();
  };

  return (
    <>
      <span className="cursor-pointer" onClick={onOpen}>
        <MdModeEdit />
      </span>
      <Modal
        className="dark:bg-light_hash dark:text-white"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Project Status
              </ModalHeader>
              <ModalBody>
                <div className=" font-poppins flex flex-col gap-2">
                  <div
                    className={`dark:bg-hash_one px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.pending
                    ? "bg-opacity-70 border-1 border-light_mode_text dark:border-white"
                    : "cursor-pointer"
                }`}
                    onClick={() => setUpdatedStatus(ProjectStatusEnum.pending)}
                  >
                    <h3 className="font-medium">Pending</h3>
                  </div>
                  <div
                    className={`dark:bg-hash_one px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.onprogress
                    ? "bg-opacity-70 border-1 border-light_mode_text dark:border-white"
                    : "cursor-pointer"
                }`}
                    onClick={() =>
                      setUpdatedStatus(ProjectStatusEnum.onprogress)
                    }
                  >
                    <h3 className="font-medium">OnProgress</h3>
                  </div>
                  <div
                    className={`dark:bg-hash_one px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.completed
                    ? "bg-opacity-70 border-1 border-light_mode_text dark:border-white"
                    : "cursor-pointer"
                }`}
                    onClick={() =>
                      setUpdatedStatus(ProjectStatusEnum.completed)
                    }
                  >
                    <h3 className="font-medium">Completed</h3>
                  </div>
                </div>
                <ModalFooter>
                  <Button onClick={() => cancelButtonClickHandler(onClose)}>
                    Cancel
                  </Button>
                  <Button onClick={() => saveButtonClickHandler(onClose)}>
                    Save
                  </Button>
                </ModalFooter>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
