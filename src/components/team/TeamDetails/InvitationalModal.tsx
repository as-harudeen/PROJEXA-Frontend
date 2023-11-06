import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { useUsers } from "@hooks/useUsers";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { SearchUserCard } from "./SearchUserCard";
import { FiUserPlus } from "react-icons/fi";

interface InvitationModalProps {
  team_member_ids: string[];
  invitations: { team_invitation_id: string; team_invitee_id: string }[];
}

const InvitationModal: FC<InvitationModalProps> = ({
  team_member_ids,
  invitations,
}) => {
  const queryClient = useQueryClient();
  const [searchValue, setSearchValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading } = useUsers(searchValue);
  const onClose = () => {
    setIsOpen(false);
  };
  let fetchTimer: NodeJS.Timeout;

  useEffect(() => {
    if (fetchTimer) clearTimeout(fetchTimer);
    console.log(
      team_member_ids,
      "TEam member Id from invitationalModal useeffect"
    );
    fetchTimer = setTimeout(() => {
      console.log("fetching user");
      queryClient.fetchQuery({ queryKey: ["users"] });
    }, 1000);
  }, [searchValue]);

  const searchInputOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.currentTarget.value;
    setSearchValue(value || "");
  };

  return (
    <>
      <Button className="w-full mt-5" onPress={() => setIsOpen(true)}>
        Invite <FiUserPlus />
      </Button>
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
                {data.map((user) => {
                  const isInvitee = invitations.find(
                    (invitation) => invitation.team_invitee_id === user.user_id
                  );

                  return (
                    <SearchUserCard
                      user_id={user.user_id}
                      invite_status={
                        isInvitee
                          ? "invited"
                          : team_member_ids.includes(user.user_id)
                          ? "team_member"
                          : "not_invited"
                      }
                      user_name={user.user_name}
                      user_profile={user.user_profile}
                      team_invitation_id={
                        isInvitee ? isInvitee.team_invitation_id : ""
                      }
                    />
                  );
                })}
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvitationModal;
