import { deleteRequest, getRequest, postRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface UserBasicInfoInterface {
  user_id: string;
  user_name: string;
  user_profile: string;
}

type GETTeamDetailsResponseInterface = {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
  team_lead: UserBasicInfoInterface;
  team_admins: UserBasicInfoInterface[];
  team_members: UserBasicInfoInterface[];
  all_team_member_ids: string[];
  invitations: { team_invitee_id: string; team_invitation_id: string }[];
  isCurrentUserAdmin: boolean;
};

export const useTeamDetails = (team_id: string) => {
  const queryClient = useQueryClient();

  const QUERY_KEY = ["team", team_id];

  const teamDetailsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(`team/${team_id}`);
      return response.data as GETTeamDetailsResponseInterface;
    },
  });

  const teamInviteMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (user_id: string) => {
      const response = await postRequest(`team-invitation/${team_id}`, {
        invitee_id: user_id,
      });

      const { team_invitation_id } = response.data as {
        team_invitation_id: string;
      };
      return { user_id, team_invitation_id };
    },
    onSuccess: ({ user_id, team_invitation_id }) => {
      console.log("on success invitation");
      console.log(team_invitation_id, user_id);
      queryClient.setQueryData(
        ["team", team_id],
        (prev: GETTeamDetailsResponseInterface) => {
          return {
            ...prev,
            invitations: [
              ...prev.invitations,
              { team_invitee_id: user_id, team_invitation_id },
            ],
          };
        }
      );
    },
  });

  const cancelTeamInviteMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (team_invitation_id: string) => {
      await deleteRequest(`team-invitation/cancel/${team_invitation_id}`);
      return team_invitation_id;
    },
    onSuccess: (team_invitation_id: string) => {
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: GETTeamDetailsResponseInterface) => {
          return {
            ...prev,
            invitations: prev.invitations.filter(
              (invitation) => invitation.team_invitee_id !== team_invitation_id
            ),
          };
        }
      );
    },
  });

  return {
    teamDetailsQuery,
    teamInviteMutation,
    cancelTeamInviteMutation
  };
};
