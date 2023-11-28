import { useFetch } from "@hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface TeamInterface {
  team_id: string;
  team_name: string;
  team_desc: string;
  team_dp: string;
  team_lead: {
    user_name: string;
    user_profile: string;
  };
}



export const useTeam = () => {
  const QUERY_KEY = ["team"];
  const queryClient = useQueryClient();
  const {getRequest} = useFetch();

  const teamQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const response = await getRequest("team?p=1");
      // return response.data as TeamInterface[];
      return await response.json() as TeamInterface[];
    },
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  const fetchMoreDataMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      currPage,
      searchValue,
    }: {
      currPage: number;
      searchValue: string;
    }) => {
      const res = await getRequest(
        `team?p=${currPage}&l=${import.meta.env.VITE_FETCH_TEAM_LIMIT}&s=${
          searchValue || ""
        }`
      );
      return await res.json() as TeamInterface[];
    },
    onSuccess(data) {
      if ((data as TeamInterface[]).length === 0) {
        return;
      }
      queryClient.setQueryData(
        QUERY_KEY,
        (prev: TeamInterface[]) => {
          return prev ? [...prev, ...data] : [...data];
        }
      );
    },
  });

  return {
    teamQuery,
    fetchMoreDataMutation,
    QUERY_KEY,
  };
};
