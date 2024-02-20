import { noProfileImg } from "@/assets";
import { useTeamInvitation } from "@hooks/team/useTeamInvitation";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { FC, useState } from "react";
import { AiOutlineArrowsAlt } from "react-icons/ai";
import { BsArrowsAngleContract } from "react-icons/bs";
import InboxIcon from "@mui/icons-material/Inbox";

interface TeamInvitationCardProps {
  team_invitation_id: string;
  user_name: string;
  user_profile: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
}

const TeamInvitationCard: FC<TeamInvitationCardProps> = ({
  team_invitation_id,
  user_name,
  user_profile,
  team_name,
  team_desc,
  team_dp,
}) => {
  const [isInvitationDetailsOpen, setIsInvitationalDetailsOpen] =
    useState(false);
  const toggleIsInvitationDetailsOpen = () => {
    setIsInvitationalDetailsOpen((prev) => !prev);
  };
  const { acceptTeamInvitationMutation, rejectTeamInvitationMutation } =
    useTeamInvitation();

  const acceptButtonOnClickHandler = () => {
    acceptTeamInvitationMutation.mutate(team_invitation_id);
  };

  const rejectButtonClickHandler = () => {
    rejectTeamInvitationMutation.mutate(team_invitation_id);
  };

  return (
    <div className="py-6 px-4 bg-light_mode_hard dark:bg-hash_two rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <div>
            <img
              className="w-[50px] h-[50px] object-cover rounded-full"
              src={
                user_profile
                  ? `${import.meta.env.VITE_BASE_URL}/${user_profile}`
                  : noProfileImg
              }
              alt="user profile image"
            />
          </div>
          <div className="flex items-center">
            <h4>{user_name}</h4>
          </div>
        </div>
        <div>
          <div
            className="cursor-pointer"
            onClick={toggleIsInvitationDetailsOpen}
          >
            {isInvitationDetailsOpen ? (
              <BsArrowsAngleContract />
            ) : (
              <AiOutlineArrowsAlt size="26" />
            )}
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between gap-3 pt-4 ${
          isInvitationDetailsOpen ? "" : "hidden"
        }`}
      >
        <div>
          <div className="float-right">
            <img
              className="w-[80px] h-[80px] object-cover rounded-xl"
              src={
                team_dp
                  ? `${import.meta.env.VITE_BASE_URL}/${team_dp}`
                  : noProfileImg
              }
              alt="team profile picture"
            />
          </div>
          <div>
            <h4 className="text-lg font-medium">{team_name}</h4>
            <span className="leading-3 overflow-scroll">{team_desc}</span>
          </div>
        </div>
        <div className="flex gap-2 ">
          <Button
            isLoading={rejectTeamInvitationMutation.isPending}
            onClick={rejectButtonClickHandler}
            color="danger"
            variant="bordered"
          >
            Reject
          </Button>
          <Button
            isLoading={acceptTeamInvitationMutation.isPending}
            onClick={acceptButtonOnClickHandler}
            color="success"
            variant="bordered"
            className="flex-1"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export const InvitationInbox: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => {
    setIsOpen(false);
  };

  const {
    teamInvitationQuery: { data },
  } = useTeamInvitation();

  return (
    <>
      <InboxIcon onClick={() => setIsOpen(true)} />
      <Modal
        className="bg-light_mode_secondary dark:bg-hash_one text-light_mode_text dark:text-white"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Team Invitation's
          </ModalHeader>
          <ModalBody>
            <div>
              {data?.map((invitation) => (
                <TeamInvitationCard
                  key={invitation.team_invitation_id}
                  team_invitation_id={invitation.team_invitation_id}
                  team_name={invitation.team.team_name}
                  team_desc={invitation.team.team_desc}
                  team_dp={invitation.team.team_dp}
                  user_name={invitation.team_inviter.user_name}
                  user_profile={invitation.team_inviter.user_profile}
                />
              ))}
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
