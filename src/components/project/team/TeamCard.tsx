import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { TeamInterface } from "@hooks/team/useTeams";
import { UserCard } from "@pages/user/Connections";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const TeamCard: FC<TeamInterface> = ({
  team_dp,
  team_name,
  team_desc,
  team_id,
  team_lead,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-between h-[400px] max-w-[350px] bg-light_mode_primary shadow-md border border-light_mode_text dark:bg-hash_dark_two p-6 rounded-lg">
      <div>
        <div className="mr-4 float-left border-3 rounded-lg border-white">
          <img
            className="w-[100px] h-[100px] object-cover rounded-lg "
            src={
              team_dp
                ? `${import.meta.env.VITE_BASE_URL}/${team_dp}`
                : noProfileImg
            }
            alt="team profile"
          />
        </div>
        <div>
          <h3 className="font-medium text-large mb-3">{team_name}</h3>
          <p className="max-h-[200px] ">
            {team_desc.length < 100 ? team_desc : team_desc.slice(100) + "...."}
          </p>
        </div>
      </div>
      <div>
        <div className="my-3">
          <h5 className="mb-2 font-semibold">Team lead</h5>
          <UserCard
            user_name={team_lead.user_name}
            user_profile={team_lead.user_profile}
          />
        </div>
        <div>
          <Button
            onClick={() => navigate(`/team/${team_id}`)}
            className="w-full"
          >
            Team Details
          </Button>
        </div>
      </div>
    </div>
  );
};
