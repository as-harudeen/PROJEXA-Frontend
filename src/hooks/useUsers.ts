import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";

type GETgetAllUsersResponseType = {
    user_name: string;
    user_profile: string;
    user_id: string;
  }[];

export const useUsers = (searchValue?: string) => {
    const users = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
          const response = await getRequest<GETgetAllUsersResponseType>(
            `user/get-all-users?s=${searchValue || ""}`
          );
          return response.data;
        },
      });

      return users;
}



