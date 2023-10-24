import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { getRequest } from "@/helper/api.helper";
import { UserCard } from "@pages/user/Connections";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { Loading } from "@components/project/Loading";

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
      <div>
        <h3 className="font-semibold text-2xl">Team-Project-Overview</h3>
      </div>
      <div className="flex flex-wrap gap-2 px-8 py-6 w-full h-[900px] bg-hash_one rounded-md">
        {data &&
          data.map((team) => (
            <div className="flex flex-col justify-between min-h-[400px] bg-hash_dark_two w-auto p-6 rounded-lg">
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
                  <Button className="w-full">Team Details</Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
