import { noProfileImg } from "@/assets";
import { UserCard } from "@pages/user/Connections";
import { FC } from "react";
import { FiUserPlus } from "react-icons/fi";
import { Button } from "@components/custom/Button";
import { useQuery } from "@tanstack/react-query";
import { getRequest } from "@/helper/api.helper";
import { useParams } from "react-router-dom";
import { Loading } from "@components/project/Loading";
import { useUserStore } from "@/store/useUserStore";
import { InvitationModal } from "./InvitationalModal";

interface UserBasicInfoInterface {
  user_id: string;
  user_name: string;
  user_profile: string;
}

export type GETTeamDetailsResponseInterface = {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
  team_lead: UserBasicInfoInterface;
  team_admins: UserBasicInfoInterface[];
  team_members: UserBasicInfoInterface[];
  all_team_member_ids: string[];
  team_invitee_ids: string[];
};


export const TeamDetails: FC = () => {
  const { team_id } = useParams();

  const user_id = useUserStore((state) => state.user?.user_id);

  const { data, isLoading } = useQuery({
    queryKey: ["team", team_id],
    queryFn: async () => {
      const response = await getRequest(`team/${team_id}`);
      return response.data as GETTeamDetailsResponseInterface;
    },
  });

  return (
    <div className="text-white px-16 py-12 font-poppins h-full flex flex-col justify-between">
      <div>
        {isLoading && <Loading />}
        <div className="float-right ms-4 mb-4 rounded-3xl border-3">
          <img
            className="w-[200px] h-[200px] object-cover rounded-3xl"
            src={
              data?.team_dp
                ? `${import.meta.env.VITE_BASE_URL}/${data.team_dp}`
                : noProfileImg
            }
            alt="team profile image"
          />
        </div>
        <div className="mb-6">
          <h3 className="font-medium text-xl">{data?.team_name || ""}</h3>
        </div>
        <div className="min-h-[250px]">
          <p className="text-md leading-6">{data?.team_desc || ""}</p>
        </div>
        <div>
          <div className="mt-10">
            <h4 className="mb-4 font-semibold text-lg">Team Lead</h4>
            {data && (
              <UserCard
                user_name={data.team_lead.user_name}
                user_profile={data.team_lead.user_profile}
              />
            )}
          </div>
          <div className="mt-10">
            <h4 className="font-medium text-lg mb-3">Team Members</h4>
            <div className="grid grid-cols-4 gap-3">
              {data && (
                <>
                  {data.team_admins.map((admin) => (
                    <UserCard
                      user_name={admin.user_name}
                      user_profile={admin.user_profile}
                    />
                  ))}
                  {data.team_members.map((member) => (
                    <UserCard
                      user_name={member.user_name}
                      user_profile={member.user_profile}
                    />
                  ))}
                </>
              )}
            </div>
            {data?.team_admins.find((admin) => admin.user_id === user_id) && (
              <div className="cursor-pointer flex justify-center gap-5 items-center px-6 py-4 bg-hash_two rounded-xl my-10">
                <div>
                  <h4 className="font-medium text-medium">Invite new Member</h4>
                </div>
                <div>
                  <FiUserPlus size="22" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-5 ">
        {data && (
          <InvitationModal
            team_invitee_ids={data.team_invitee_ids}
            team_member_ids={data.all_team_member_ids}
          />
        )}
        <div className="flex-1">
          <Button className="w-full">Team Projects</Button>
        </div>
        <div>
          <Button>Edit Team</Button>
        </div>
      </div>
    </div>
  );
};
