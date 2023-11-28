import { ProjectInterface, UpdateProjectInterface } from "@/interfaces/project";
import { useFetch } from "@hooks/useFetch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";



export const usePersonalProjectDetails = (project_id: string) => {
  const QUERY_KEY = ["project", project_id];
  const queryClient = useQueryClient();
  const { getRequest, patchRequest } = useFetch();

  const personalProjectDetailsQuery = useQuery({
    queryKey: QUERY_KEY,
    queryFn: async (): Promise<ProjectInterface> => {
      const res = await getRequest(`project/personal/${project_id}`);
      return (await res.json()) as ProjectInterface;
    },
  });

  const updateStatusMutation = useMutation({
    mutationKey: QUERY_KEY,
    mutationFn: async ({
      new_project_status,
    }: {
      project_id: string;
      new_project_status: string;
    }) => {
      await patchRequest(`project/personal/${project_id}/status`, {
        new_project_status,
      });
      return new_project_status;
    },
    onSuccess(new_project_status) {
      queryClient.setQueryData(QUERY_KEY, (prev: ProjectInterface) => ({
        ...prev,
        project_status: new_project_status,
      }));
    },
  });


  const updateProjectDetails = (updatedDetails: UpdateProjectInterface) => {
    queryClient.setQueryData(QUERY_KEY, (prev: ProjectInterface) => {
      return {...prev, ...updatedDetails}
    })
  }

  return {
    personalProjectDetailsQuery,
    updateStatusMutation,
    updateProjectDetails
  };
};
