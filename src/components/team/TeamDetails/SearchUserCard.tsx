import { FC } from "react";
import { useParams } from "react-router-dom";
import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { useTeamDetails } from "@hooks/team/useTeamDetails";

interface SearchUserCard {
  user_id: string;
  user_name: string;
  user_profile?: string;
  invite_status: "invited" | "team_member" | "not_invited";
  team_invitation_id?: string;
  innerRef?: React.Ref<HTMLDivElement>;
}

export const SearchUserCard: FC<SearchUserCard> = ({
  user_id,
  user_name,
  user_profile,
  invite_status,
  team_invitation_id,
  innerRef
}) => {
  const { team_id } = useParams();
  const { teamInviteMutation, cancelTeamInviteMutation } = useTeamDetails(
    team_id!
  );

  const inviteButtonOnClickHandler = async (user_id: string) => {
    teamInviteMutation.mutate(user_id);
  };

  const cancelInvitationButtonClickHandler = () => {
    if (team_invitation_id) cancelTeamInviteMutation.mutate(team_invitation_id);
  };

  return (
    <div ref={innerRef} className="flex justify-between">
      <div className="flex gap-2">
        <div className="rounded-full border-l">
          <img
            className="w-[50px] h-[50px] object-cover rounded-full"
            src={
              user_profile
                ? `${import.meta.env.VITE_BASE_URL}/${user_profile}`
                : noProfileImg
            }
          />
        </div>
        <div className="flex items-center">
          <h5 className="font-medium font-poppins">{user_name}</h5>
        </div>
      </div>
      <div>
        {invite_status === "not_invited" ? (
          <Button
            isLoading={teamInviteMutation.isPending}
            onClick={() => inviteButtonOnClickHandler(user_id)}
          >
            Invite
          </Button>
        ) : invite_status === "invited" ? (
          <Button
            isLoading={cancelTeamInviteMutation.isPending}
            color="danger"
            variant="bordered"
            onClick={cancelInvitationButtonClickHandler}
          >
            Cancel
          </Button>
        ) : null}
      </div>
    </div>
  );
};
