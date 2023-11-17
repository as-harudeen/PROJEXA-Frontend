import { FC } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { MdDeleteForever } from "react-icons/md";
import { Button } from "@components/custom/Button";

interface DeleteConfirmModalProps {
  title: string;
  body: string;
  confirmButtonHandler: () => void;
}

export const DeleteConfirmModal: FC<DeleteConfirmModalProps> = ({
  title,
  body,
  confirmButtonHandler,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div className="cursor-pointer" onClick={onOpen}>
        <MdDeleteForever  className="text-red-600" size="25" />
      </div>
      <Modal className="border-1 border-red-600 bg-light_mode_primary dark:bg-hash_two dark:text-white text-light_mode_text" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <h6>{body}</h6>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  cancel
                </Button>
                <Button color="hash" onPress={() => {
                  onClose();
                  confirmButtonHandler();
                }}>
                  confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
