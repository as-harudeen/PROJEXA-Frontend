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
      <span className="cursor-pointer z-10" onClick={onOpen}>
        <MdModeEdit />
      </span>
      <Modal
        className="dark:bg-white/10 ring-1 ring-white/40 backdrop-blur-sm dark:text-white"
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
                    className={`dark:bg-white/10 px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.pending
                    ? " ring-1 ring-white/60"
                    : "cursor-pointer hover:ring-1 ring-white/40 "
                }`}
                    onClick={() => setUpdatedStatus(ProjectStatusEnum.pending)}
                  >
                    <h3 className="font-medium">Pending</h3>
                  </div>
                  <div
                    className={`dark:bg-white/10 px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.onprogress
                    ? "ring-1 ring-white/60"
                    : "cursor-pointer hover:ring-1 ring-white/40"
                }`}
                    onClick={() =>
                      setUpdatedStatus(ProjectStatusEnum.onprogress)
                    }
                  >
                    <h3 className="font-medium">OnProgress</h3>
                  </div>
                  <div
                    className={`dark:bg-white/10 px-6 py-4 rounded-lg bg-light_mode_secondary
                  
                ${
                  updatedStatus === ProjectStatusEnum.completed
                    ? "ring-1 ring-white/60"
                    : "cursor-pointer hover:ring-1 ring-white/40"
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
