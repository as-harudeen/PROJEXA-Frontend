import { Button } from "@components/custom/Button";
import { Input } from "@components/custom/Input";
import { useUsers } from "@hooks/useUsers";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { FC, useState } from "react";
import { MoonLoader } from "react-spinners";
import { SearchUserCard } from "./SearchUserCard";
import { FiUserPlus } from "react-icons/fi";
import { useInfiniteScroll } from "@hooks/useInfiniteScroll";
import InfiniteScroll from "react-infinite-scroll-component";

interface InvitationModalProps {
  team_member_ids: string[];
  invitations: { team_invitation_id: string; team_invitee_id: string }[];
}

const InvitationModal: FC<InvitationModalProps> = ({
  team_member_ids,
  invitations,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    usersQery: { data, isLoading },
    fetchMoreDataMutation,
  } = useUsers();
  const onClose = () => {
    setIsOpen(false);
  };

  const { hasMore, searchInputChangeHandler, searchInputRef, increasePage } =
    useInfiniteScroll(["users"], fetchMoreDataMutation);

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
              ref={searchInputRef}
              onChange={searchInputChangeHandler}
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
                <InfiniteScroll
                  dataLength={data.length}
                  next={increasePage}
                  hasMore={hasMore}
                  loader={
                    <div className="flex justify-center py-20 ">
                      <MoonLoader color="white" />
                    </div>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="flex flex-col gap-4">
                    {data.map((user) => {
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
                        />
                      );
                    })}
                  </div>
                </InfiniteScroll>
              </div>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InvitationModal;
