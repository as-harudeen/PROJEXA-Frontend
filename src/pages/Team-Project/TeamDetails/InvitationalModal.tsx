import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { useUsers } from "@hooks/useUsers";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { SearchUserCard } from "./SearchUserCard";

interface InvitationModalProps {
  team_member_ids: string[];
  team_invitee_ids: string[];
}

export const InvitationModal: FC<InvitationModalProps> = ({
  team_member_ids,
  team_invitee_ids,
}) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useUsers(searchValue);
  const onClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    queryClient.fetchQuery({ queryKey: ["users"] });
  }, [searchValue]);

  const searchInputOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setSearchValue(value || "");
  };

  return (
    <>
      <Button onPress={() => setIsOpen(true)}>open</Button>
      <Modal
        className="bg-hash_one text-white"
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-">
            <Input
              value={searchValue}
              onChange={searchInputOnChangeHandler}
              placeholder="Search here"
              classNames={{
                label: ["text-white", "text-lg", "font-bold", "font-nunito"],
                inputWrapper: [
                  "bg-hash_two",
                  "border-hash_two",
                  "data-[hover=true]:bg-transperent",
                  "group-data-[focus=true]:bg-hash_two",
                  "rounded-md",
                ],
                input: ["text-white", "text-md"],
              }}
            />
          </ModalHeader>
          <ModalBody className="">
            {isLoading && (
              <div className="flex justify-center">
                <MoonLoader color="white" size="26" />
              </div>
            )}
            {data && (
              <div className="flex flex-col gap-4">
                {data.map((user) => (
                  <SearchUserCard
                    user_id={user.user_id}
                    invite_status={
                      team_member_ids.includes(user.user_name)
                        ? "team_member"
                        : team_invitee_ids.includes(user.user_id)
                        ? "invited"
                        : "not_invited"
                    }
                    user_name={user.user_name}
                    user_profile={user.user_profile}
                  />
                ))}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
