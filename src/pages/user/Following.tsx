import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useParams } from "react-router-dom";
import { UserCard } from "./Connections";

export const Following: FC = () => {
  const { user_name } = useParams();
  const { data } = useQuery({
    queryKey: ["user", "profile", `${user_name}`, "following"],
    queryFn: async () => {
      const response = await getRequest(`user/${user_name}/following-users`);
      return response.data as { user_name: string; user_profile: string }[];
    },
  });

  return (
    <div className="text-white px-8 py-6 font-poppins">
      <div className="mb-10">
        <h2 className="font-semibold text-xl">Following</h2>
      </div>
      <div className="flex gap-3 flex-wrap">
        {data &&
          data.map((user) => (
            <UserCard
              user_name={user.user_name}
              user_profile={user.user_profile}
            />
          ))}
      </div>
    </div>
  );
};
