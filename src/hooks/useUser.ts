import { getRequest, patchRequest } from "@/helper/api.helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";


interface UserResponse {
    user_email: string;
    user_name: string;
    user_profile: string;
    summary?: string;
    birthday?: string;
  }

const useUser = () => {
  const queryClient = useQueryClient();

  const getUser = useQuery({
    queryKey: ["user", "profile"],
    queryFn: async () => {
      const res = await getRequest("user");
      return res.data as UserResponse;
    },
  });

  const editUserMutation = useMutation({
    mutationFn: async (updatedData: Partial<UserResponse>) => {
      const res = await patchRequest("user", updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data);
    },
    onError: (err) => {
      let message = "OPPS Something fishy";
      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          message = err.response.data.message;
        }
      }
      toast.error(message);
    },
  });


  const updateUserProfileMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch("http://localhost:3000/user", {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["user", "profile"], data);
    },
  });

  return {
    getUser,

    editUserMutation,
    updateUserProfileMutation
  }
};


export default useUser;