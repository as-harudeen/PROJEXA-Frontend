import { getRequest } from "@/helper/api.helper";
import { useQuery } from "@tanstack/react-query";

interface ProjectInterface {
  project_id: string;
  project_name: string;
  project_desc: string;
  project_start_date: string;
  project_end_date: string;
  project_status: string;
}

export const usePersonalProjects = (
  currPage: number,
  searchValue: string,
  selectedKeys: Set<string>
) => {
  const QUERY_KEY = ["personal", "projects"];

  const personalProjectsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      let url = `/project/personal?p=${currPage}&`;

      if (searchValue) url += `s=${searchValue}&`;

      if (selectedKeys.size > 1) {
        const keys: string[] = [];
        selectedKeys.forEach((item) => {
          if (item) keys.push(item);
        });
        url += `f=${JSON.stringify(keys)}`;
      }

      const response = await getRequest(url);
      return response.data as ProjectInterface[];
    },
  });

  return {
    personalProjectsQuery,
  };
};
