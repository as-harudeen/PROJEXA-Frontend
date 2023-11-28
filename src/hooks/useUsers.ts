import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFetch } from "./useFetch";

type GETgetAllUsersResponseType = {
  user_name: string;
  user_profile: string;
  user_id: string;
}[];

export const useUsers = () => {
  const queryClient = useQueryClient();
  const { getRequest} = useFetch();

  const usersQery = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await getRequest(
        `user/get-all-users?l=${import.meta.env.VITE_FETCH_USERS_LIMIT}`
      );
      return (await response.json()) as GETgetAllUsersResponseType;
    },
  });

  const fetchMoreDataMutation = useMutation({
    mutationKey: ["users"],
    mutationFn: async ({
      currPage,
      searchValue,
    }: {
      currPage: number;
      searchValue: string;
    }) => {
      const res = await getRequest(
        `user/get-all-users?p=${currPage}&l=${
          import.meta.env.VITE_FETCH_USERS_LIMIT
        }&s=${searchValue || ""}`
      );
      return (await res.json()) as GETgetAllUsersResponseType;
    },
    onSuccess(data) {
      if ((data as GETgetAllUsersResponseType).length === 0) {
        return;
      }
      queryClient.setQueryData(
        ["users"],
        (prev: GETgetAllUsersResponseType) => {
          return prev ? [...prev, ...data] : [...data]
        }
      );
    },
  });

  return {
    usersQery,
    fetchMoreDataMutation
  }
};
