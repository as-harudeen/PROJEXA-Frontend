import { useFetch } from "@hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
  const  { getRequest, putRequest }  = useFetch();

  const teamInvitationQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const response = await getRequest(`team-invitation`);
      return (await response.json()) as GETTeamInvitationsResponseInterface;
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
          toast.success("Team invitation accepted successfully");
          return data.filter(
            (invitation) => invitation.team_invitation_id !== team_invitation_id
          );
        }
      );
    },
  });




  const rejectTeamInvitationMutation = useMutation({
    mutationKey: queryKey,
    mutationFn: async (team_invitation_id: string) => {
      await putRequest(`team-invitation/reject/${team_invitation_id}`, {});
      return team_invitation_id;
    },
    onSuccess: (team_invitation_id: string) => {
      queryClient.setQueryData(
        queryKey,
        (data: GETTeamInvitationsResponseInterface) => {
          toast.success("Team invitation rejected successfully");
          return data.filter(
            (invitation) => invitation.team_invitation_id !== team_invitation_id
          );
        }
      );
    },
  });

  return {
    teamInvitationQuery,
    acceptTeamInvitationMutation,
    rejectTeamInvitationMutation
  };
};
