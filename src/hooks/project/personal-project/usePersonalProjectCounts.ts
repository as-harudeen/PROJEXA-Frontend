import { useFetch } from "@hooks/useFetch";
import { useQuery } from "@tanstack/react-query";

export const usePersonalProjectCounts = () => {
  const QUERY_KEY = ["personal", "project", "counts"];
  const {getRequest} = useFetch();

  const personalProjectCountsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const res = await getRequest("project/personal/count");
      return Math.ceil(+(await res.json()) / 3);
    },
  });

  return {
    personalProjectCountsQuery,
  };
};
