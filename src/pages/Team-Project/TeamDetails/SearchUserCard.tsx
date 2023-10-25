import { useQueryClient } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { GETTeamDetailsResponseInterface } from "./TeamDetails";
import { noProfileImg } from "@/assets";
import { Button } from "@components/custom/Button";
import { postRequest } from "@/helper/api.helper";

interface SearchUserCard {
    user_id: string;
    user_name: string;
    user_profile?: string;
    invite_status: "invited" | "team_member" | "not_invited";
  }
  
 export const SearchUserCard: FC<SearchUserCard> = ({
    user_id,
    user_name,
    user_profile,
    invite_status,
  }) => {
    const { team_id } = useParams();
    const queryClient = useQueryClient();
  
    const inviteButtonOnClickHandler = async (user_id: string) => {
      console.log(user_id, team_id, "from invitebutton handler");
      const response = await postRequest(`team/invite/${team_id}`, {
        invitee_id: user_id,
      });
      if (response.status === 200) {
        console.log("success");
        queryClient.setQueryData(
          ["team", team_id],
          (prev: GETTeamDetailsResponseInterface) => {
            return {
              ...prev,
              team_invitee_ids: [...prev.team_invitee_ids, user_id],
            };
          }
        );
      }
    };
  
    return (
      <div className="flex justify-between">
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
            <Button onClick={() => inviteButtonOnClickHandler(user_id)}>
              Invite
            </Button>
          ) : invite_status === "invited" ? (
            <Button>Invited</Button>
          ) : null}
        </div>
      </div>
    );
  };