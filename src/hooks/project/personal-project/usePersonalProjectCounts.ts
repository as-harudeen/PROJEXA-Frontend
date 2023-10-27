import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";

export const usePersonalProjectCounts = () => {
  const QUERY_KEY = ["personal", "project", "counts"];

  const personalProjectCountsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await getRequest<number>("/project/personal/count");
      return Math.ceil(+res.data / 3);
    },
  });

  return {
    personalProjectCountsQuery,
  };
};
