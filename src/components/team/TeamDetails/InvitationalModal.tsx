import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { GETgetAllUsersResponseType, useUsers } from "@hooks/useUsers";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { SearchUserCard } from "./SearchUserCard";
import { FiUserPlus } from "react-icons/fi";
import { useInView } from "react-intersection-observer";

interface InvitationModalProps {
  team_member_ids: string[];
  invitations: { team_invitation_id: string; team_invitee_id: string }[];
}

const InvitationModal: FC<InvitationModalProps> = ({
  team_member_ids,
  invitations,
}) => {
  const { ref, inView } = useInView();
  const [isOpen, setIsOpen] = useState(false);
  const {
    usersQuery: { data, isLoading, fetchNextPage, hasNextPage }, setSearch
  } = useUsers();
  const onClose = () => {
    setIsOpen(false);
  };



  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  let time: NodeJS.Timeout;
  const onChangeHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    if (time) clearTimeout(time);
    const searchVal = e.currentTarget.value;
    time = setTimeout(() => {
      setSearch(searchVal);
    }, 1000);
  };


  return (
    <>
      <Button className="w-full mt-5" onPress={() => setIsOpen(true)}>
        Invite <FiUserPlus />
      </Button>
      <Modal
        className="dark:bg-hash_one bg-light_mode_secondary text-light_mode_text dark:text-white"
        size="xs"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-">
            <Input
              onChange={onChangeHandler}
              placeholder="Search here"
              color="hash"
            />
          </ModalHeader>
          <ModalBody className="">
            {isLoading && (
              <div className="flex justify-center">
                <MoonLoader color="white" size={10} />
              </div>
            )}
            {data && (
              <div
                id="scrollableDiv"
                className="max-h-[300px] overflow-y-scroll no-scrollbar"
              >
                <div className="flex flex-col gap-4">
                  {data.pages.map((page: GETgetAllUsersResponseType, i) => (
                    page.map((user, idx) => {
                      const isInvitee = invitations.find(
                        (invitation) =>
                          invitation.team_invitee_id === user.user_id
                      );
                      return (
                        <SearchUserCard
                          key={user.user_name}
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
                          innerRef={
                            i === data.pages.length - 1 && idx === page.length - 1
                              ? ref
                              : null
                          }
                        />
                      );
                    })
                  ))}
                </div>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvitationModal;
