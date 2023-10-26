import { getRequest, putRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type GETTeamInvitationsResponseInterface = {
  team_invitation_id: string;
  team_inviter: {
    user_name: string;
    user_profile: string;
  };
  team: {
    team_name: string;
    team_desc: string;
    team_dp: string;
  };
}[];

export const useTeamInvitation = () => {
  const queryClient = useQueryClient();
  const queryKey = ["team", "invitations"];

  const teamInvitationQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getRequest(`team-invitation`);
      return response.data as GETTeamInvitationsResponseInterface;
    },
  });

  const acceptTeamInvitationMutation = useMutation({
    mutationKey: queryKey,
    mutationFn: async (team_invitation_id: string) => {
      await putRequest(`team-invitation/accept/${team_invitation_id}`, {});
      return team_invitation_id;
    },
    onSuccess: (team_invitation_id: string) => {
      queryClient.setQueryData(
        queryKey,
        (data: GETTeamInvitationsResponseInterface) => {
          return data.filter(
            (invitation) => invitation.team_invitation_id !== team_invitation_id
          );
        }
      );
    },
  });

  return {
    teamInvitationQuery,
    acceptTeamInvitationMutation
  };
};
