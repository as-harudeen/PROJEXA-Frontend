import { useFetch } from "@hooks/useFetch";
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
  isCureentUserLeader: boolean;
};

export const useTeamDetails = (team_id: string) => {
  const queryClient = useQueryClient();
  const { deleteRequest, getRequest, postRequest, patchRequest } = useFetch();
  const QUERY_KEY = ["team", team_id];

  const teamDetailsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest(`team/${team_id}`);
      return (await response.json()) as GETTeamDetailsResponseInterface;
    },
  });

  const teamInviteMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (user_id: string) => {
      const response = await postRequest(`team-invitation/${team_id}`, {
        invitee_id: user_id,
      });

      const { team_invitation_id } = (await response.json()) as {
        team_invitation_id: string;
      };
      return { user_id, team_invitation_id };
    },
    onSuccess: ({ user_id, team_invitation_id }) => {
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
              (invitation) =>
                invitation.team_invitation_id !== team_invitation_id
            ),
          };
        }
      );
    },
  });

  const promotedToAdmin = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (user_id: string) => {
      const res = await patchRequest(
        `team/${team_id}/member/${user_id}/promote`,
        {}
      );
      if (res.ok) {
        queryClient.setQueryData(
          QUERY_KEY,
          (prev: GETTeamDetailsResponseInterface) => {
            const user = prev.team_members.find((user) => user.user_id);
            console.log(user);
            if (!user) return user;
            return {
              ...prev,
              team_members: prev.team_members.filter(
                (member) => member.user_id !== user_id
              ),
              team_admins: [...prev.team_admins, user],
            };
          }
        );
      }
    },
  });


  const demoteToMember = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async (user_id: string) => {
      const res = await patchRequest(
        `team/${team_id}/member/${user_id}/demote`,
        {}
      );
      if (res.ok) {
        queryClient.setQueryData(
          QUERY_KEY,
          (prev: GETTeamDetailsResponseInterface) => {
            const user = prev.team_admins.find((user) => user.user_id === user_id);
            console.log(user);
            if (!user) return user;
            return {
              ...prev,
              team_admins: prev.team_admins.filter(
                (admin) => admin.user_id !== user_id
              ),
              team_members: [...prev.team_members, user],
            };
          }
        );
      }
    },
  });


  return {
    teamDetailsQuery,
    teamInviteMutation,
    cancelTeamInviteMutation,
    promotedToAdmin,
    demoteToMember
  };
};
