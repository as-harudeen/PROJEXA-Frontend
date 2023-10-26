import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { getRequest } from "@/helper/api.helper";
import { UserCard } from "@pages/user/Connections";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Loading } from "@components/project/Loading";
import { Link } from "react-router-dom";
import InboxIcon from "@mui/icons-material/Inbox";
import { InvitationInbox } from "@components/team/InvitationInbox";

interface GETTeamResoponseInterface {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
  team_lead: {
    user_name: string;
    user_profile: string;
  };
}

export const TeamProjectOverview: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["project", "team"],
    queryFn: async () => {
      const response = await getRequest("team");
      return response.data as GETTeamResoponseInterface[];
    },
  });

  return (
    <div className="text-white px-16 py-12">
      {isLoading && <Loading />}
      <div className="flex justify-between">
        <h3 className="font-semibold text-2xl mb-5">Team-Project-Overview</h3>
        <div className="pe-5 cursor-pointer">
          <InboxIcon />
          <InvitationInbox />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 px-8 py-6 w-full h-[900px] bg-hash_one rounded-md">
        {data &&
          data.map((team) => (
            <div className="flex flex-col justify-between h-[400px] max-w-[350px] bg-hash_dark_two p-6 rounded-lg">
              <div>
                <div className="mr-4 float-left border-3 rounded-lg border-white">
                  <img
                    className="w-[100px] h-[100px] object-cover rounded-lg "
                    src={
                      team.team_dp
                        ? `${import.meta.env.VITE_BASE_URL}/${team.team_dp}`
                        : noProfileImg
                    }
                    alt="team profile"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-large mb-3">
                    {team.team_name}
                  </h3>
                  <p className="max-h-[200px] ">
                    {team.team_desc.length < 100
                      ? team.team_desc
                      : team.team_desc.slice(100) + "...."}
                  </p>
                </div>
              </div>
              <div>
                <div className="my-3">
                  <h5 className="mb-2 font-semibold">Team lead</h5>
                  <UserCard
                    user_name={team.team_lead.user_name}
                    user_profile={team.team_lead.user_profile}
                  />
                </div>
                <div>
                  <Link to={`/project/team/${team.team_id}`}>
                    <Button className="w-full">Team Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
